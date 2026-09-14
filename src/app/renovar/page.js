import Image from "next/image";
import Link from "next/link";

const renewalPlans = [
  {
    name: "Plan Básico",
    tag: "AM o PM",
    price: "$70.000",
    paymentId: "renovacion-basico",
    description:
      "Renueva tu Plan Básico mensual y continúa entrenando tres veces por semana con tu coach asignado.",
    features: [
      "3 veces por semana",
      "Coach asignado",
      "Horario AM o PM",
      "Sin pago de matrícula",
    ],
  },
  {
    name: "Plan Flexible",
    tag: "AM y PM",
    price: "$90.000",
    paymentId: "renovacion-flexible",
    description:
      "Renueva tu Plan Flexible y mantén la posibilidad de alternar tus entrenamientos entre horarios AM y PM.",
    features: [
      "3 veces por semana",
      "Horarios AM y PM",
      "Mayor flexibilidad",
      "Sin pago de matrícula",
    ],
    featured: true,
  },
  {
    name: "Calistenia + Musculación",
    tag: "18:00 hrs",
    price: "$80.000",
    paymentId: "renovacion-calistenia",
    description:
      "Renueva tu plan combinado de calistenia y musculación para continuar desarrollando fuerza, técnica y control corporal.",
    features: [
      "3 veces por semana",
      "Calistenia + musculación",
      "Horario fijo 18:00 hrs",
      "Sin pago de matrícula",
    ],
  },
  {
    name: "Plan Sábados",
    tag: "Solo sábado",
    price: "$35.000",
    paymentId: "renovacion-sabados",
    description:
      "Renueva tu plan mensual para seguir entrenando los sábados en bloques reducidos y con coach asignado.",
    features: [
      "Entrenamiento los sábados",
      "Coach asignado",
      "Bloques de 10:00 a 12:00",
      "Sin pago de matrícula",
    ],
  },
  {
    name: "Personalizado 2 veces por semana",
    tag: "1 a 1",
    price: "$120.000",
    paymentId: "renovacion-personalizado-2",
    description:
      "Entrenamiento personalizado 1 a 1 con flexibilidad horaria. Se trabaja en tu objetivo personal, con seguimiento, planificación y corrección de ejercicios.",
    features: [
      "2 veces por semana",
      "Entrenamiento personalizado 1 a 1",
      "Flexibilidad horaria",
      "Planificación según tu objetivo",
      "Seguimiento y corrección de ejercicios",
      "Sin pago de matrícula",
    ],
  },
  {
    name: "Personalizado 3 veces por semana",
    tag: "1 a 1",
    price: "$180.000",
    paymentId: "renovacion-personalizado-3",
    description:
      "Entrenamiento personalizado 1 a 1 con flexibilidad horaria. Se trabaja en tu objetivo personal, con seguimiento, planificación y corrección de ejercicios.",
    features: [
      "3 veces por semana",
      "Entrenamiento personalizado 1 a 1",
      "Flexibilidad horaria",
      "Planificación según tu objetivo",
      "Seguimiento y corrección de ejercicios",
      "Sin pago de matrícula",
    ],
  },
];

export default function RenewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 pb-20 pt-36 text-white md:pt-40 lg:px-8">
      <div className="absolute left-0 top-24 h-[420px] w-[420px] rounded-full bg-[#E11919]/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-[#FF8A00]/15 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="font-gothic text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
            Alumnos Imperio Fit
          </p>

          <h1 className="font-gothic mt-5 text-4xl uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
            Renueva tu{" "}
            <span className="bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] bg-clip-text text-transparent">
              plan
            </span>
          </h1>

          <p className="font-quicksilver mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            Selecciona tu plan actual y realiza el pago de tu mensualidad. Esta
            sección es exclusiva para alumnos que ya pagaron su matrícula.
          </p>

          <div className="mt-7 inline-flex rounded-full border border-[#FF5A1F]/30 bg-[#FF5A1F]/10 px-5 py-3">
            <span className="font-gothic text-xs uppercase tracking-[0.16em] text-[#FF8A00]">
              Renovación sin matrícula
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {renewalPlans.map((plan) => (
            <article
              key={plan.paymentId}
              className={`relative flex min-h-[470px] flex-col overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-2 ${
                plan.featured
                  ? "border-[#FF5A1F]/70 bg-gradient-to-b from-[#2A0D07] via-[#111111] to-black shadow-[0_0_45px_rgba(255,90,31,0.22)]"
                  : "border-white/10 bg-white/[0.04] hover:border-[#FF5A1F]/60"
              }`}
            >
              {plan.featured && (
                <span className="font-gothic absolute right-5 top-5 rounded-full bg-gradient-to-r from-[#E11919] to-[#FF8A00] px-4 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
                  Popular
                </span>
              )}

              <span className="font-gothic mb-5 inline-flex w-fit rounded-full border border-[#FF5A1F]/40 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#FF8A00]">
                {plan.tag}
              </span>

              <h2 className="font-gothic min-h-[78px] text-2xl uppercase leading-tight tracking-[0.08em] text-white">
                {plan.name}
              </h2>

              <div className="mt-5 flex flex-wrap items-end gap-2">
                <span className="font-gothic bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] bg-clip-text text-5xl text-transparent">
                  {plan.price}
                </span>

                <span className="font-quicksilver pb-2 text-sm text-zinc-400">
                  / mensual
                </span>
              </div>

              <p className="font-quicksilver mt-5 min-h-[112px] text-sm leading-7 text-zinc-300">
                {plan.description}
              </p>

              <ul className="font-quicksilver mb-8 mt-5 space-y-3 text-sm text-zinc-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF5A1F] shadow-[0_0_12px_rgba(255,90,31,0.8)]" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <form
                action="/api/getnet/create-session"
                method="POST"
                className="mt-auto"
              >
                <input
                  type="hidden"
                  name="planId"
                  value={plan.paymentId}
                />

                <button
                  type="submit"
                  aria-label={`Renovar ${plan.name} con tarjeta`}
                  className="font-gothic w-full rounded-full border border-white/15 bg-white/10 px-4 py-4 text-center text-[10px] uppercase leading-5 tracking-[0.12em] text-white transition duration-300 hover:border-[#FF5A1F] hover:bg-gradient-to-r hover:from-[#E11919] hover:via-[#FF5A1F] hover:to-[#FF8A00]"
                >
                  Tarjeta de crédito, débito o prepago
                </button>
              </form>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center">
          <div className="rounded-2xl bg-white px-6 py-4">
            <Image
              src="/images/getnet-web-checkout.svg"
              alt="Web Checkout Getnet"
              width={230}
              height={90}
              className="h-auto w-[180px] md:w-[220px]"
            />
          </div>

          <p className="font-quicksilver mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-300">
            Paga seguro todo lo que necesitas con Getnet utilizando tus tarjetas
            de crédito, débito y prepago, de todos los emisores nacionales e
            internacionales.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/#servicios"
            className="font-gothic inline-flex rounded-full border border-white/15 bg-white/10 px-6 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:border-[#FF5A1F]"
          >
            Ver planes para alumnos nuevos
          </Link>
        </div>
      </div>
    </main>
  );
}