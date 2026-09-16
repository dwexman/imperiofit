import Image from "next/image";
import Link from "next/link";

const plans = [
  {
    name: "Plan Básico",
    tag: "AM o PM",
    price: "$70.000",
    firstPayment: "$90.000",
    paymentId: "nuevo-basico",
    period: "mensual",
    description:
      "Plan con coach asignado según horario o bloque. Entrena 3 veces por semana de lunes a viernes, eligiendo tus días semanalmente.",
    features: [
      "3 veces por semana",
      "Coach asignado",
      "Horario AM o PM",
      "Días elegibles semanalmente",
    ],
  },
  {
    name: "Plan Flexible",
    tag: "AM y PM",
    price: "$90.000",
    firstPayment: "$110.000",
    paymentId: "nuevo-flexible",
    period: "mensual",
    description:
      "Pensado para personas que varían sus horarios. Permite alternar entrenamientos en la mañana y en la tarde según disponibilidad.",
    features: [
      "3 veces por semana",
      "Horarios AM y PM",
      "Mayor flexibilidad",
      "Horario asignado diariamente por el coach",
    ],
    featured: true,
  },
  {
    name: "Plan VIP 6 AM",
    tag: "06:00 hrs",
    price: "$80.000",
    firstPayment: "$100.000",
    paymentId: "nuevo-vip-6am",
    period: "mensual",
    description:
      "¡Para quienes disfrutan madrugar para entrenar! Comienza tu día entrenando con un grupo reducido de personas en todo el gimnasio, acompañado por la profesora Kathy.",
    features: [
      "Entrenamiento a las 06:00 AM",
      "Grupo reducido en todo el gimnasio",
      "Coach a cargo: profesora Kathy",
    ],
  },
  {
    name: "Calistenia + Musculación",
    tag: "18:00 hrs",
    price: "$80.000",
    firstPayment: "$100.000",
    paymentId: "nuevo-calistenia",
    period: "mensual",
    description:
      "Plan que combina entrenamiento de calistenia y musculación, ideal para quienes quieren fuerza, técnica y control corporal.",
    features: [
      "3 veces por semana",
      "Calistenia + musculación",
      "Horario fijo 18:00 hrs",
      "Días elegibles semanalmente",
    ],
  },
  {
    name: "Plan Sábados",
    tag: "Solo sábado",
    price: "$35.000",
    firstPayment: "$55.000",
    paymentId: "nuevo-sabados",
    period: "mensual",
    description:
      "Plan mensual para quienes prefieren entrenar los días sábados, con coach asignado y bloques reducidos.",
    features: [
      "Entrenamiento los sábados",
      "Coach asignado",
      "Bloques 10:00 a 11:00",
      "Bloques 11:00 a 12:00",
    ],
  },
  {
    name: "Personalizado 2 veces por semana",
    tag: "1 a 1",
    price: "$120.000",
    firstPayment: "$140.000",
    paymentId: "nuevo-personalizado-2",
    period: "mensual",
    description:
      "Entrenamiento personalizado 1 a 1 con flexibilidad horaria. Se trabaja en tu objetivo personal, con seguimiento, planificación y corrección de ejercicios.",
    features: [
      "2 veces por semana",
      "Entrenamiento personalizado 1 a 1",
      "Flexibilidad horaria",
      "Planificación según tu objetivo",
      "Seguimiento y corrección de ejercicios",
    ],
  },
  {
    name: "Personalizado 3 veces por semana",
    tag: "1 a 1",
    price: "$180.000",
    firstPayment: "$200.000",
    paymentId: "nuevo-personalizado-3",
    period: "mensual",
    description:
      "Entrenamiento personalizado 1 a 1 con flexibilidad horaria. Se trabaja en tu objetivo personal, con seguimiento, planificación y corrección de ejercicios.",
    features: [
      "3 veces por semana",
      "Entrenamiento personalizado 1 a 1",
      "Flexibilidad horaria",
      "Planificación según tu objetivo",
      "Seguimiento y corrección de ejercicios",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-black px-5 py-24 lg:px-8"
    >
      <div className="absolute left-0 top-20 h-[360px] w-[360px] rounded-full bg-[#E11919]/20 blur-[130px]" />
      <div className="absolute bottom-10 right-0 h-[420px] w-[420px] rounded-full bg-[#FF8A00]/15 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-5xl text-center">
          <p className="font-gothic mb-5 text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
            Planes Imperio Fit
          </p>

          <h2 className="font-gothic text-4xl uppercase leading-tight tracking-[0.08em] text-white md:text-6xl lg:text-7xl">
            Tu ritmo. <span className="text-zinc-400">Tu coach.</span>{" "}
            <span className="fire-title">Tu imperio.</span>
          </h2>

          <p className="font-quicksilver mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
            Entrena según tu rutina, tus horarios y tus objetivos. En Imperio
            Fit no llegas a perderte entre máquinas: llegas a un espacio
            privado, personalizado y acompañado por un coach que guía tu proceso
            desde el primer día.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "AM",
              "PM",
              "Flexible",
              "VIP 6 AM",
              "Calistenia",
              "Sábados",
              "Personalizado 1 a 1",
            ].map((item) => (
              <span
                key={item}
                className="font-gothic rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.paymentId}
              className={`group relative flex min-h-[590px] flex-col overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-2 ${
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

              <div className="mb-8">
                <span className="font-gothic mb-5 inline-flex rounded-full border border-[#FF5A1F]/40 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#FF8A00]">
                  {plan.tag}
                </span>

                <h3 className="font-gothic min-h-[78px] text-2xl uppercase leading-tight tracking-[0.08em] text-white">
                  {plan.name}
                </h3>

                <div className="mt-6 flex flex-wrap items-end gap-2">
                  <span className="font-gothic bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] bg-clip-text text-5xl uppercase text-transparent">
                    {plan.price}
                  </span>

                  <span className="font-quicksilver pb-2 text-sm text-zinc-400">
                    / {plan.period}
                  </span>
                </div>

                <p className="font-quicksilver mt-6 min-h-[112px] text-sm leading-7 text-zinc-300">
                  {plan.description}
                </p>
              </div>

              <ul className="font-quicksilver mb-8 space-y-3 text-sm text-zinc-300">
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
                  aria-label={`Comprar ${plan.name} con tarjeta`}
                  className="font-gothic w-full rounded-full border border-white/15 bg-white/10 px-4 py-4 text-center text-[10px] uppercase leading-5 tracking-[0.12em] text-white transition duration-300 hover:border-[#FF5A1F] hover:bg-gradient-to-r hover:from-[#E11919] hover:via-[#FF5A1F] hover:to-[#FF8A00]"
                >
                  Tarjeta de crédito, débito o prepago
                </button>

                <p className="font-quicksilver mt-3 text-center text-xs text-zinc-400">
                  Primer pago:{" "}
                  <span className="font-semibold text-white">
                    {plan.firstPayment}
                  </span>{" "}
                  con matrícula
                </p>
              </form>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-7 text-center">
          <Image
            src="/images/getnet-web-checkout.svg"
            alt="Web Checkout Getnet"
            width={230}
            height={90}
            className="h-auto w-[180px] md:w-[220px]"
          />

          <p className="font-quicksilver mt-5 max-w-2xl text-sm leading-7 text-zinc-300">
            Paga seguro todo lo que necesitas con Getnet utilizando tus tarjetas
            de crédito, débito y prepago, de todos los emisores nacionales e
            internacionales.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#FF5A1F]/30 bg-gradient-to-r from-[#E11919]/15 via-[#FF5A1F]/10 to-white/5 p-6 text-center">
          <p className="font-gothic text-lg uppercase tracking-[0.16em] text-white">
            Matrícula única:{" "}
            <span className="bg-gradient-to-r from-[#FF5A1F] to-white bg-clip-text text-transparent">
              $20.000
            </span>
          </p>

          <p className="font-quicksilver mt-2 text-sm text-zinc-400">
            Se cancela solo una vez al ingresar.
          </p>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 text-center">
          <p className="font-gothic text-lg uppercase tracking-[0.16em] text-white">
            ¿Ya eres alumno de Imperio Fit?
          </p>

          <p className="font-quicksilver mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Renueva tu mensualidad seleccionando tu plan actual, sin volver a
            pagar la matrícula.
          </p>

          <Link
            href="/renovar"
            className="font-gothic mt-6 inline-flex rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-7 py-4 text-xs uppercase tracking-[0.18em] text-white transition duration-300 hover:scale-[1.03]"
          >
            Renovar mi plan
          </Link>
        </div>
      </div>
    </section>
  );
}