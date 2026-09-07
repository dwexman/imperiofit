import {
  createHash,
  randomBytes,
  timingSafeEqual,
} from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createGetnetAuth(login, secretKey) {
  const rawNonce = randomBytes(16);
  const nonce = rawNonce.toString("base64");
  const seed = new Date().toISOString();

  const tranKey = createHash("sha256")
    .update(
      Buffer.concat([
        rawNonce,
        Buffer.from(seed, "utf8"),
        Buffer.from(secretKey, "utf8"),
      ])
    )
    .digest("base64");

  return {
    login,
    tranKey,
    nonce,
    seed,
  };
}

function validateNotificationSignature(payload, secretKey) {
  const requestId = String(payload?.requestId ?? "");
  const status = String(payload?.status?.status ?? "");
  const date = String(payload?.status?.date ?? "");

  const receivedSignature =
    typeof payload?.signature === "string"
      ? payload.signature.replace(/^sha256:/i, "").trim().toLowerCase()
      : "";

  if (
    !requestId ||
    !status ||
    !date ||
    !/^[a-f0-9]{64}$/i.test(receivedSignature)
  ) {
    return false;
  }

  const expectedSignature = createHash("sha256")
    .update(`${requestId}${status}${date}${secretKey}`, "utf8")
    .digest("hex");

  return timingSafeEqual(
    Buffer.from(expectedSignature, "hex"),
    Buffer.from(receivedSignature, "hex")
  );
}

/*
 * Permite comprobar desde el navegador que la ruta existe.
 * Getnet utilizará el método POST.
 */
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
      {
        status: 500,
      }
    );
  }

  try {
    const payload = await request.json();

    const requestId = payload?.requestId;
    const reference = payload?.reference;
    const notifiedStatus = payload?.status?.status;

    if (!requestId || !reference || !notifiedStatus) {
      return Response.json(
        {
          received: false,
          error: "Notificación incompleta",
        },
        {
          status: 400,
        }
      );
    }

    const validSignature = validateNotificationSignature(
      payload,
      secretKey
    );

    if (!validSignature) {
      console.error("Firma inválida en notificación Getnet.");

      return Response.json(
        {
          received: false,
          error: "Firma inválida",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Segunda validación:
     * consultamos directamente a Getnet para confirmar que el
     * estado recibido en la notificación sea verdadero.
     */
    const normalizedApiUrl = apiUrl.replace(/\/$/, "");

    const getnetResponse = await fetch(
      `${normalizedApiUrl}/api/session/${encodeURIComponent(requestId)}`,
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
      }
    );

    if (!getnetResponse.ok) {
      console.error(
        `No fue posible confirmar la notificación con Getnet. HTTP ${getnetResponse.status}`
      );

      return Response.json(
        {
          received: false,
          error: "No fue posible confirmar el pago",
        },
        {
          status: 502,
        }
      );
    }

    const confirmedPayment = await getnetResponse.json();
    const confirmedStatus = confirmedPayment?.status?.status;

    if (confirmedStatus !== notifiedStatus) {
      console.error("El estado notificado no coincide con Getnet.", {
        requestId,
        notifiedStatus,
        confirmedStatus,
      });

      return Response.json(
        {
          received: false,
          error: "El estado de la transacción no coincide",
        },
        {
          status: 409,
        }
      );
    }

    console.info("GETNET_NOTIFICATION_CONFIRMED", {
      requestId,
      reference,
      status: confirmedStatus,
    });

    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error("Error procesando notificación Getnet:", error);

    return Response.json(
      {
        received: false,
        error: "Error procesando la notificación",
      },
      {
        status: 500,
      }
    );
  }
}