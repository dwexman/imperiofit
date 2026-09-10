import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import Link from "next/link";

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

async function getPaymentInformation(requestId) {
    const apiUrl = process.env.GETNET_API_URL;
    const login = process.env.GETNET_LOGIN;
    const secretKey = process.env.GETNET_SECRET_KEY;

    if (!apiUrl || !login || !secretKey) {
        throw new Error("Faltan variables de entorno de Getnet.");
    }

    const response = await fetch(
        `${apiUrl}/api/session/${encodeURIComponent(requestId)}`,
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

    const responseText = await response.text();

    let data;

    try {
        data = JSON.parse(responseText);
    } catch {
        throw new Error("Getnet entregó una respuesta no válida.");
    }

    if (!response.ok) {
        throw new Error(
            data?.status?.message || "No se pudo consultar el pago."
        );
    }

    return data;
}

function formatPrice(value) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return null;
    }

    return `$${numericValue.toLocaleString("es-CL")}`;
}

const STATUS_CONTENT = {
    APPROVED: {
        icon: "✓",
        title: "Pago aprobado",
        message:
            "Tu pago fue procesado correctamente. Ya puedes comunicarte con Imperio Fit para coordinar el inicio de tus entrenamientos.",
        color: "text-emerald-400",
        border: "border-emerald-500/40",
        background: "from-emerald-500/20",
    },
    REJECTED: {
        icon: "×",
        title: "Pago rechazado",
        message:
            "El pago no pudo ser procesado. Puedes intentarlo nuevamente o utilizar otra tarjeta.",
        color: "text-red-400",
        border: "border-red-500/40",
        background: "from-red-500/20",
    },
    PENDING: {
        icon: "…",
        title: "Pago pendiente",
        message:
            "Getnet todavía está procesando el resultado. Espera unos segundos y vuelve a consultar.",
        color: "text-amber-400",
        border: "border-amber-500/40",
        background: "from-amber-500/20",
    },
    FAILED: {
        icon: "!",
        title: "No pudimos verificar el pago",
        message:
            "Ocurrió un problema al procesar la solicitud. No vuelvas a pagar hasta confirmar el estado con Imperio Fit.",
        color: "text-red-400",
        border: "border-red-500/40",
        background: "from-red-500/20",
    },
    REFUNDED: {
        icon: "↺",
        title: "Pago reembolsado",
        message:
            "Este pago figura como reembolsado en Getnet.",
        color: "text-violet-400",
        border: "border-violet-500/40",
        background: "from-violet-500/20",
    },
    CANCELLED: {
        icon: "×",
        title: "Pago cancelado",
        message:
            "Cancelaste el proceso antes de completar el pago. No se realizó ningún cobro.",
        color: "text-zinc-300",
        border: "border-white/20",
        background: "from-white/10",
    },
    UNKNOWN: {
        icon: "?",
        title: "Estado no disponible",
        message:
            "No pudimos confirmar el resultado del pago. Comunícate con Imperio Fit antes de volver a intentarlo.",
        color: "text-zinc-300",
        border: "border-white/20",
        background: "from-white/10",
    },
};

export default async function PaymentResultPage({ searchParams }) {
    const params = await searchParams;
    const cookieStore = await cookies();

    const queryReference = Array.isArray(params.reference)
        ? params.reference[0]
        : params.reference;

    const cancelled =
        (Array.isArray(params.estado)
            ? params.estado[0]
            : params.estado) === "cancelado";

    const requestId = cookieStore.get("getnet_request_id")?.value;
    const savedReference = cookieStore.get("getnet_reference")?.value;

    let status = cancelled ? "CANCELLED" : "UNKNOWN";
    let paymentData = null;

    const validSession =
        requestId &&
        savedReference &&
        queryReference &&
        savedReference === queryReference;

    if (!cancelled && validSession) {
        try {
            paymentData = await getPaymentInformation(requestId);
            status = paymentData?.status?.status || "UNKNOWN";
        } catch (error) {
            console.error("Error consultando el pago en Getnet:", error);
            status = "FAILED";
        }
    }

    const content = STATUS_CONTENT[status] || STATUS_CONTENT.UNKNOWN;

    const description = paymentData?.request?.payment?.description;
    const amount = formatPrice(
        paymentData?.request?.payment?.amount?.total
    );

    return (
        <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-black px-5 pb-16 pt-36 text-white md:pt-40">      <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#E11919]/20 blur-[150px]" />
            <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#FF8A00]/15 blur-[150px]" />

            <section
                className={`relative z-10 w-full max-w-xl rounded-[2rem] border ${content.border} bg-gradient-to-b ${content.background} via-[#111111] to-black p-8 text-center shadow-2xl md:p-12`}
            >
                <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${content.border} bg-black/50 text-4xl ${content.color}`}
                >
                    {content.icon}
                </div>

                <p className="font-gothic mt-8 text-xs uppercase tracking-[0.3em] text-[#FF8A00]">
                    Web Checkout Getnet
                </p>

                <h1
                    className={`font-gothic mt-4 text-4xl uppercase tracking-[0.08em] ${content.color}`}
                >
                    {content.title}
                </h1>

                <p className="font-quicksilver mx-auto mt-5 max-w-md text-base leading-7 text-zinc-300">
                    {content.message}
                </p>

                {(description || amount) && (
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                        {description && (
                            <p className="font-gothic text-sm uppercase tracking-[0.12em] text-white">
                                {description}
                            </p>
                        )}

                        {amount && (
                            <p className="font-gothic mt-2 text-3xl text-[#FF8A00]">
                                {amount}
                            </p>
                        )}
                    </div>
                )}

                {queryReference && (
                    <p className="font-quicksilver mt-5 break-all text-xs text-zinc-500">
                        Referencia: {queryReference}
                    </p>
                )}

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    {status === "PENDING" && (
                        <a
                            href={`/pago/resultado?reference=${encodeURIComponent(
                                queryReference || ""
                            )}`}
                            className="font-gothic rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-6 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:scale-[1.03]"
                        >
                            Volver a consultar
                        </a>
                    )}

                    {(status === "REJECTED" ||
                        status === "CANCELLED" ||
                        status === "FAILED") && (
                            <Link
                                href="/#servicios"
                                className="font-gothic rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-6 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:scale-[1.03]"
                            >
                                Intentar nuevamente
                            </Link>
                        )}

                    <Link
                        href="/"
                        className="font-gothic rounded-full border border-white/15 bg-white/10 px-6 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:border-[#FF5A1F]"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </section>
        </main>
    );
}