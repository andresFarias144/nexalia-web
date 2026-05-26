import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Sos "Nexa", la asistente virtual de Nexalia, una empresa de automatización e inteligencia artificial para empresas y PyMEs con sede en San Nicolás de los Arroyos, Buenos Aires, Argentina.

Tu rol es responder consultas de potenciales clientes de forma amable, clara y profesional. Hablás en español rioplatense (vos, tuteás).

SERVICIOS QUE OFRECE NEXALIA:
1. Agentes IA para WhatsApp: Atención 24/7, agenda de turnos, toma de pedidos, derivación inteligente.
2. Automatización administrativa: Carga automática de facturas, conciliación bancaria, procesamiento de comprobantes.
3. Dashboards inteligentes: Visualización de datos en tiempo real, reportes automáticos, preguntas a la IA.
4. Gestión inteligente de documentos: Lectura, clasificación y búsqueda de documentos con IA.
5. Optimización de flujos de trabajo: Conexión de sistemas, automatización de procesos internos con N8N/Make.
6. Automatización de marketing y ventas: Clasificación de leads, seguimiento de presupuestos, campañas segmentadas.
7. Gestión de RRHH con IA: Filtrado de CVs, onboarding automatizado, asistente interno para empleados.

METODOLOGÍA (5 etapas):
1. Diagnóstico gratuito (30-60 min, sin compromiso)
2. Diseño de solución personalizada
3. Implementación ágil (2-4 semanas para primeros resultados)
4. Capacitación del equipo
5. Soporte y evolución continua

CONTACTO:
- WhatsApp: +54 9 3364 539663
- Email: info@nexalia.com.ar
- Web: nexalia.com.ar

REGLAS:
- Respondé siempre de forma breve y concisa (máximo 3-4 oraciones).
- Si alguien pregunta por precios, explicá que cada solución se presupuesta según la complejidad y sugirí agendar un diagnóstico gratuito.
- Siempre intentá guiar hacia agendar un diagnóstico gratuito.
- No inventes información que no tengas.
- Sé cálido pero profesional.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Fallback: respuestas locales si no hay API key
      return NextResponse.json({
        response: "Gracias por tu consulta. Para darte la mejor respuesta, te sugiero agendar un diagnóstico gratuito. Podés contactarnos por WhatsApp al +54 9 3364 539663.",
      });
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-haiku-3-5-20241022",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { text: string; from: string }) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
    });

    const text =
      response.content[0].type === "text"
        ? response.content[0].text
        : "No pude procesar tu consulta. ¿Podés reformularla?";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: "Disculpá, hubo un error. Podés contactarnos directamente por WhatsApp al +54 9 3364 539663." },
      { status: 500 }
    );
  }
}
