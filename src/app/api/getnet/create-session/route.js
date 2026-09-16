import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLANS = {
  "nuevo-basico": {
    code: "NB",
    amount: 90000,
    description: "Plan Basico con matricula",
  },
  "nuevo-flexible": {
    code: "NF",
    amount: 110000,
    description: "Plan Flexible con matricula",
  },
  "nuevo-vip-6am": {
    code: "NV6",
    amount: 100000,
    description: "Plan VIP 6 AM con matricula",
  },
  "nuevo-calistenia": {
    code: "NC",
    amount: 100000,
    description: "Plan Calistenia y Musculacion con matricula",
  },
  "nuevo-sabados": {
    code: "NS",
    amount: 55000,
    description: "Plan Sabados con matricula",
  },
  "nuevo-personalizado-2": {
    code: "NP2",
    amount: 140000,
    description: "Plan Personalizado 2 veces por semana con matricula",
  },
  "nuevo-personalizado-3": {
    code: "NP3",
    amount: 200000,
    description: "Plan Personalizado 3 veces por semana con matricula",
  },

  "renovacion-basico": {
    code: "RB",
    amount: 70000,
    description: "Renovacion Plan Basico",
  },
  "renovacion-flexible": {
    code: "RF",
    amount: 90000,
    description: "Renovacion Plan Flexible",
  },
  "renovacion-vip-6am": {
    code: "RV6",
    amount: 80000,
    description: "Renovacion Plan VIP 6 AM",
  },
  "renovacion-calistenia": {
    code: "RC",
    amount: 80000,
    description: "Renovacion Plan Calistenia y Musculacion",
  },
  "renovacion-sabados": {
    code: "RS",
    amount: 35000,
    description: "Renovacion Plan Sabados",
  },
  "renovacion-personalizado-2": {
    code: "RP2",
    amount: 120000,
    description: "Renovacion Plan Personalizado 2 veces por semana",
  },
  "renovacion-personalizado-3": {
    code: "RP3",
    amount: 180000,
    description: "Renovacion Plan Personalizado 3 veces por semana",
  },
};

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

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const possibleIp = forwardedFor?.split(",")[0]?.trim();

  const isIpv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(possibleIp || "");

  return isIpv4 ? possibleIp : "127.0.0.1";
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const planId = String(formData.get("planId") || "");

    const selectedPlan = PLANS[planId];

    if (!selectedPlan) {
      return NextResponse.json(
        {
          error: "El plan seleccionado no es válido.",
        },
        {
          status: 400,
        }
      );
    }

    const apiUrl = process.env.GETNET_API_URL;
    const login = process.env.GETNET_LOGIN;
    const secretKey = process.env.GETNET_SECRET_KEY;
    const siteUrl = process.env.GETNET_SITE_URL;

    if (!apiUrl || !login || !secretKey || !siteUrl) {
      console.error("Faltan variables de entorno de Getnet.");

      return NextResponse.json(
        {
          error: "La configuración de pagos todavía no está completa.",
        },
        {
          status: 500,
        }
      );
    }

    const reference = `IF${selectedPlan.code}${Date.now()}`;

    const returnUrl = new URL("/pago/resultado", siteUrl);
    returnUrl.searchParams.set("reference", reference);

    const cancelUrl = new URL("/pago/resultado", siteUrl);
    cancelUrl.searchParams.set("reference", reference);
    cancelUrl.searchParams.set("estado", "cancelado");

    const expiration = new Date(
      Date.now() + 15 * 60 * 1000
    ).toISOString();

    const userAgent = (
      request.headers.get("user-agent") || "Mozilla/5.0"
    ).slice(0, 255);

    const getnetRequest = {
      auth: createGetnetAuth(login, secretKey),
      locale: "es_CL",
      payment: {
        reference,
        description: selectedPlan.description,
        amount: {
          currency: "CLP",
          total: selectedPlan.amount,
        },
        allowPartial: false,
      },
      expiration,
      returnUrl: returnUrl.toString(),
      cancelUrl: cancelUrl.toString(),
      ipAddress: getClientIp(request),
      userAgent,
      skipResult: false,
      noBuyerFill: false,
    };

    const getnetResponse = await fetch(`${apiUrl}/api/session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(getnetRequest),
      cache: "no-store",
    });

    const responseText = await getnetResponse.text();

    let getnetData;

    try {
      getnetData = JSON.parse(responseText);
    } catch {
      console.error("Getnet entregó una respuesta no válida.");

      return NextResponse.json(
        {
          error: "No se pudo interpretar la respuesta de Getnet.",
        },
        {
          status: 502,
        }
      );
    }

    if (!getnetResponse.ok || !getnetData.processUrl) {
      console.error("Error al crear la sesión de Getnet:", {
        status: getnetResponse.status,
        message: getnetData?.status?.message,
        reason: getnetData?.status?.reason,
      });

      return NextResponse.json(
        {
          error:
            getnetData?.status?.message ||
            "No se pudo iniciar el pago con Getnet.",
        },
        {
          status: 502,
        }
      );
    }

    const redirectResponse = NextResponse.redirect(
      getnetData.processUrl,
      303
    );

    redirectResponse.cookies.set(
      "getnet_request_id",
      String(getnetData.requestId),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 60,
        path: "/",
      }
    );

    redirectResponse.cookies.set(
      "getnet_reference",
      reference,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 60,
        path: "/",
      }
    );

    return redirectResponse;
  } catch (error) {
    console.error("Error inesperado al iniciar el pago:", error);

    return NextResponse.json(
      {
        error: "Ocurrió un error inesperado al iniciar el pago.",
      },
      {
        status: 500,
      }
    );
  }
}