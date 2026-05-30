import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SLOT_MINUTES = 30;
const availableTimes = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
const defaultNotificationEmails = ["info@multipixel.com.ar", "info@wicrea.com"];

type BookingPayload = {
  dateKey?: string;
  time?: string;
  name?: string;
  lastname?: string;
  company?: string;
  phone?: string;
  address?: string;
};

function getEnv() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!calendarId || !clientEmail || !privateKey) return null;
  return { calendarId, clientEmail, privateKey };
}

function getNotificationEmails() {
  const configuredEmails = (process.env.BOOKING_NOTIFICATION_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return configuredEmails.length > 0 ? configuredEmails : defaultNotificationEmails;
}

function getCalendarClient() {
  const env = getEnv();
  if (!env) return null;

  const auth = new google.auth.JWT({
    email: env.clientEmail,
    key: env.privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return {
    calendarId: env.calendarId,
    calendar: google.calendar({ version: "v3", auth }),
  };
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function fromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isWeekday(date: Date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function isValidSlot(dateKey: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !availableTimes.includes(time)) return false;
  const date = fromKey(dateKey);
  const minDate = startOfDay(addDays(new Date(), 4));
  return startOfDay(date) >= minDate && isWeekday(date);
}

function toLocalDateTime(dateKey: string, time: string) {
  return dateKey + "T" + time + ":00-03:00";
}

function addMinutesIso(iso: string, minutes: number) {
  return new Date(new Date(iso).getTime() + minutes * 60 * 1000).toISOString();
}

function hasRequiredFields(payload: BookingPayload) {
  return [payload.dateKey, payload.time, payload.name, payload.lastname, payload.company, payload.phone, payload.address].every(
    (value) => typeof value === "string" && value.trim().length > 0,
  );
}

async function listBusy(calendar: ReturnType<typeof google.calendar>, calendarId: string, timeMin: string, timeMax: string) {
  const response = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 250,
  });

  return (response.data.items ?? []).map((event) => ({
    id: event.id,
    summary: event.summary,
    start: event.start?.dateTime ?? event.start?.date ?? null,
    end: event.end?.dateTime ?? event.end?.date ?? null,
  }));
}

function overlaps(startA: string, endA: string, startB: string, endB: string) {
  const aStart = new Date(startA).getTime();
  const aEnd = new Date(endA).getTime();
  const bStart = new Date(startB).getTime();
  const bEnd = new Date(endB).getTime();
  return aStart < bEnd && aEnd > bStart;
}

export async function GET(req: NextRequest) {
  try {
    const client = getCalendarClient();
    if (!client) return NextResponse.json({ configured: false, busy: [] });

    const searchParams = req.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json({ error: "Missing date range" }, { status: 400 });
    }

    const busy = await listBusy(client.calendar, client.calendarId, from + "T00:00:00-03:00", to + "T23:59:59-03:00");
    return NextResponse.json({ configured: true, busy });
  } catch (error) {
    console.error("Calendar availability error:", error);
    return NextResponse.json({ error: "Could not load availability" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as BookingPayload;
    if (!hasRequiredFields(payload)) {
      return NextResponse.json({ error: "Missing booking data" }, { status: 400 });
    }

    const client = getCalendarClient();
    if (!client) {
      return NextResponse.json({ error: "Google Calendar is not configured" }, { status: 503 });
    }

    const dateKey = payload.dateKey!;
    const time = payload.time!;

    if (!isValidSlot(dateKey, time)) {
      return NextResponse.json({ error: "Slot not available" }, { status: 400 });
    }
    const startDateTime = toLocalDateTime(dateKey, time);
    const endDateTime = addMinutesIso(startDateTime, SLOT_MINUTES);
    const busy = await listBusy(client.calendar, client.calendarId, startDateTime, endDateTime);
    const slotTaken = busy.some((event) => event.start && event.end && overlaps(startDateTime, endDateTime, event.start, event.end));

    if (slotTaken) {
      return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
    }

    const fullName = payload.name!.trim() + " " + payload.lastname!.trim();
    const notificationEmails = getNotificationEmails();
    const baseEvent = {
      summary: "Diagnostico Nexalia - " + payload.company!.trim(),
      description: [
        "Reserva desde nexalia.com.ar",
        "Nombre: " + fullName,
        "Empresa: " + payload.company!.trim(),
        "Telefono: " + payload.phone!.trim(),
        "Direccion: " + payload.address!.trim(),
      ].join("\n"),
      start: { dateTime: startDateTime, timeZone: TIME_ZONE },
      end: { dateTime: endDateTime, timeZone: TIME_ZONE },
      extendedProperties: {
        private: {
          source: "nexalia-web",
          phone: payload.phone!.trim(),
        },
      },
    };

    try {
      const response = await client.calendar.events.insert({
        calendarId: client.calendarId,
        sendUpdates: notificationEmails.length > 0 ? "all" : "none",
        requestBody: {
          ...baseEvent,
          attendees: notificationEmails.map((email) => ({ email })),
          guestsCanInviteOthers: false,
          guestsCanModify: false,
        },
      });

      return NextResponse.json({ ok: true, eventId: response.data.id, notified: notificationEmails.length > 0 });
    } catch (notificationError) {
      console.error("Calendar attendee notification error:", notificationError);
      const response = await client.calendar.events.insert({
        calendarId: client.calendarId,
        sendUpdates: "none",
        requestBody: baseEvent,
      });

      return NextResponse.json({ ok: true, eventId: response.data.id, notified: false });
    }
  } catch (error) {
    console.error("Calendar booking error:", error);
    return NextResponse.json({ error: "Could not create booking" }, { status: 500 });
  }
}
