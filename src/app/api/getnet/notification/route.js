import { createHash, randomBytes, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function createGetnetAuth(login, secretKey) {
  const rawNonce = randomBytes(16);
  const seed = new Date().toISOString();

  return {
    login,
    tranKey: createHash("sha256")
      .update(
        Buffer.concat([
          rawNonce,
          Buffer.from(seed, "utf8"),
          Buffer.from(secretKey, "utf8"),
        ])
      )
      .digest("base64"),
    nonce: rawNonce.toString("base64"),
    seed,
  };
}

function validateNotificationSignature(payload, secretKey) {
  const requestId = String(payload?.requestId ?? "");
  const status = String(payload?.status?.status ?? "");
  const date = String(payload?.status?.date ?? "");

  const received =
    typeof payload?.signature === "string"
      ? payload.signature.replace(/^sha256:/i, "").trim().toLowerCase()
      : "";

  if (
    !requestId ||
    !status ||
    !date ||
    !/^[a-f0-9]{64}$/.test(received)
  ) {
    return false;
  }

  const expected = createHash("sha256")
    .update(`${requestId}${status}${date}${secretKey}`, "utf8")
    .digest("hex");

  return timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(received, "hex")
  );
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]
  );
}

function display(value) {
  return String(value ?? "").trim() || "No informado";
}

function formatAmount(amount) {
  if (
    amount?.total == null ||
    !Number.isFinite(Number(amount.total))
  ) {
    return "No informado";
  }

  const currency = String(amount.currency ?? "");

  try {
    return (
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency,
      }).format(Number(amount.total)) + ` ${currency}`
    );
  } catch {
    return `${amount.total} ${currency}`.trim();
  }
}

async function sendPaymentEmail(session, requestId, login, apiUrl) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.PAYMENT_EMAIL_FROM?.trim();
  const to = process.env.PAYMENT_EMAIL_TO?.trim();

  if (!apiKey || !from || !to) {
    throw new Error(
      "Faltan RESEND_API_KEY, PAYMENT_EMAIL_FROM o PAYMENT_EMAIL_TO"
    );
  }

  const originalRequest = session.request ?? {};
  const payment = originalRequest.payment;
  const person =
    originalRequest.buyer ?? originalRequest.payer ?? {};

  const name = [person.name, person.surname]
    .filter(Boolean)
    .join(" ");

  // Los datos originales mantienen estable el correo en los reintentos.
  const rows = [
    ["Alumno / comprador", display(name)],
    ["Correo", display(person.email)],
    ["Plan", display(payment.description)],
    ["Monto de la sesión aprobada", formatAmount(payment.amount)],
    ["Referencia", display(payment.reference)],
    ["ID de sesión Getnet", String(requestId)],
    ["Estado", "APROBADO"],
  ];

  const text = [
    "Imperio Fit — Pago aprobado",
    "Getnet confirmó la aprobación de esta sesión de pago.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Aviso interno de la web. No reemplaza el comprobante de Getnet.",
  ].join("\n");

  const html = `
    <!doctype html>
    <html lang="es">
      <body
        style="
          margin: 0;
          padding: 24px;
          background: #f4f4f5;
          font-family: Arial, sans-serif;
          color: #18181b;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
          "
        >
          <div
            style="
              padding: 28px;
              background: #18181b;
              color: #ffffff;
            "
          >
            <p style="margin: 0 0 12px; font-size: 14px;">
              IMPERIO FIT
            </p>

            <h1 style="margin: 0; font-size: 26px;">
              Pago aprobado
            </h1>
          </div>

          <div style="padding: 28px;">
            <p>
              Getnet confirmó la aprobación de esta sesión de pago.
            </p>

            <table style="width: 100%; border-collapse: collapse;">
              ${rows
                .map(
                  ([label, value]) => `
                    <tr>
                      <th
                        style="
                          padding: 12px 8px 12px 0;
                          text-align: left;
                          vertical-align: top;
                          border-bottom: 1px solid #eeeeee;
                          font-size: 14px;
                        "
                      >
                        ${escapeHtml(label)}
                      </th>

                      <td
                        style="
                          padding: 12px 0;
                          border-bottom: 1px solid #eeeeee;
                          font-size: 14px;
                          overflow-wrap: anywhere;
                        "
                      >
                        ${escapeHtml(value)}
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </table>

            <p
              style="
                margin-top: 24px;
                font-size: 12px;
                color: #71717a;
              "
            >
              Aviso interno de la web.
              No reemplaza el comprobante de Getnet.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Resend conserva esta clave durante 24 horas.
  // Separa las sesiones de distintos comercios y entornos.
  const key = createHash("sha256")
    .update(
      JSON.stringify([
        apiUrl,
        login,
        String(requestId),
        "approved",
      ])
    )
    .digest("hex");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `getnet-payment/${key}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Imperio Fit | Pago aprobado | Sesión ${requestId}`,
      text,
      html,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.id) {
    throw new Error(
      `Resend HTTP ${response.status}: ${
        result.name ?? "respuesta sin ID"
      }`
    );
  }

  console.info("GETNET_PAYMENT_EMAIL_ACCEPTED", {
    requestId,
    emailId: result.id,
  });
}

export async function GET() {
  return Response.json({
    ok: true,
    service: "Getnet notification endpoint",
  });
}

export async function POST(request) {
  const apiUrl = process.env.GETNET_API_URL;
  const login = process.env.GETNET_LOGIN;
  const secretKey = process.env.GETNET_SECRET_KEY;

  if (!apiUrl || !login || !secretKey) {
    console.error("Faltan variables de entorno de Getnet.");

    return Response.json(
      {
        received: false,
        error: "Configuración de Getnet incompleta",
      },
      { status: 500 }
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      {
        received: false,
        error: "JSON inválido",
      },
      { status: 400 }
    );
  }

  const requestId = String(payload?.requestId ?? "");
  const reference = String(payload?.reference ?? "");
  const notifiedStatus = payload?.status?.status;

  if (
    !/^\d+$/.test(requestId) ||
    requestId.length > 30 ||
    !reference ||
    !notifiedStatus
  ) {
    return Response.json(
      {
        received: false,
        error: "Notificación incompleta o inválida",
      },
      { status: 400 }
    );
  }

  if (!validateNotificationSignature(payload, secretKey)) {
    console.error("Firma inválida en notificación Getnet.");

    return Response.json(
      {
        received: false,
        error: "Firma inválida",
      },
      { status: 401 }
    );
  }

  try {
    const normalizedApiUrl = apiUrl.replace(/\/+$/, "");

    const response = await fetch(
      `${normalizedApiUrl}/api/session/${encodeURIComponent(
        requestId
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          auth: createGetnetAuth(login, secretKey),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!response.ok) {
      console.error("Error consultando Getnet", {
        requestId,
        httpStatus: response.status,
      });

      return Response.json(
        {
          received: false,
          error: "No fue posible confirmar el pago",
        },
        { status: 502 }
      );
    }

    const session = await response.json();
    const confirmedStatus = session?.status?.status;

    if (confirmedStatus !== notifiedStatus) {
      console.error(
        "El estado notificado no coincide con Getnet",
        {
          requestId,
          notifiedStatus,
          confirmedStatus,
        }
      );

      return Response.json(
        {
          received: false,
          error: "El estado de la transacción no coincide",
        },
        { status: 409 }
      );
    }

    if (
      session.requestId != null &&
      String(session.requestId) !== requestId
    ) {
      return Response.json(
        {
          received: false,
          error: "La sesión no coincide",
        },
        { status: 409 }
      );
    }

    console.info("GETNET_NOTIFICATION_CONFIRMED", {
      requestId,
      reference,
      status: confirmedStatus,
    });

    if (confirmedStatus === "APPROVED") {
      if (
        !session?.request?.payment ||
        String(session.request.payment.reference ?? "") !==
          reference
      ) {
        console.error("Referencia de pago no coincide", {
          requestId,
        });

        return Response.json(
          {
            received: false,
            error: "La referencia del pago no coincide",
          },
          { status: 409 }
        );
      }

      try {
        await sendPaymentEmail(
          session,
          requestId,
          login,
          normalizedApiUrl
        );
      } catch (error) {
        console.error("GETNET_PAYMENT_EMAIL_FAILED", {
          requestId,
          error: error.message,
        });

        // Un fallo del correo no cancela ni vuelve a cobrar el pago.
        return Response.json(
          {
            received: false,
            error:
              "Pago confirmado, pero falló el envío del aviso",
          },
          { status: 502 }
        );
      }
    }

    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error("Error procesando notificación Getnet", {
      requestId,
      error: error.message,
    });

    return Response.json(
      {
        received: false,
        error: "Error procesando la notificación",
      },
      { status: 500 }
    );
  }
}