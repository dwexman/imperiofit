const plans = [
  {
    name: "Plan Básico",
    tag: "AM o PM",
    price: "$70.000",
    period: "mensual",
    description:
      "Plan con coach asignado según horario o bloque. Entrena 3 veces por semana de lunes a viernes, eligiendo tus días semanalmente.",
    features: [
      "3 veces por semana",
      "Coach asignado",
      "Horario AM o PM",
      "Días elegibles semanalmente",
    ],
    whatsapp: "Hola Imperio Fit, quiero más información sobre el Plan Básico.",
  },
  {
    name: "Plan Flexible",
    tag: "AM y PM",
    price: "$90.000",
    period: "mensual",
    description:
      "Pensado para personas que varían sus horarios. Permite alternar entrenamientos en la mañana y en la tarde según disponibilidad.",
    features: [
      "3 veces por semana",
      "Horarios AM y PM",
      "Mayor flexibilidad",
      "Horario asignado diariamente por el coach",
    ],
    whatsapp:
      "Hola Imperio Fit, quiero más información sobre el Plan Flexible.",
    featured: true,
  },
  {
    name: "Calistenia + Musculación",
    tag: "18:00 hrs",
    price: "$80.000",
    period: "mensual",
    description:
      "Plan que combina entrenamiento de calistenia y musculación, ideal para quienes quieren fuerza, técnica y control corporal.",
    features: [
      "3 veces por semana",
      "Calistenia + musculación",
      "Horario fijo 18:00 hrs",
      "Días elegibles semanalmente",
    ],
    whatsapp:
      "Hola Imperio Fit, quiero más información sobre el Plan de Calistenia y Musculación.",
  },
  {
    name: "Plan Sábados",
    tag: "Solo sábado",
    price: "$35.000",
    period: "mensual",
    description:
      "Plan mensual para quienes prefieren entrenar los días sábados, con coach asignado y bloques reducidos.",
    features: [
      "Entrenamiento los sábados",
      "Coach asignado",
      "Bloques 10:00 a 11:00",
      "Bloques 11:00 a 12:00",
    ],
    whatsapp:
      "Hola Imperio Fit, quiero más información sobre el Plan Sábados.",
  },
];

function getWhatsappLink(message) {
  return `https://wa.me/56973797211?text=${encodeURIComponent(message)}`;
}

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
            Tu ritmo.{" "}
            <span className="text-zinc-400">Tu coach.</span>{" "}
            <span className="fire-title">Tu imperio.</span>
          </h2>

          <p className="font-quicksilver mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
            Entrena según tu rutina, tus horarios y tus objetivos. En Imperio
            Fit no llegas a perderte entre máquinas: llegas a un espacio
            privado, personalizado y acompañado por un coach que guía tu proceso
            desde el primer día.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["AM", "PM", "Flexible", "Calistenia", "Sábados"].map((item) => (
              <span
                key={item}
                className="font-gothic rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`group relative flex min-h-[560px] flex-col overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-2 ${
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

                <div className="mt-6 flex items-end gap-2">
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

              <a
                href={getWhatsappLink(plan.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-gothic mt-auto rounded-full border border-white/15 bg-white/10 px-5 py-4 text-center text-xs uppercase tracking-[0.18em] text-white transition duration-300 hover:border-[#FF5A1F] hover:bg-gradient-to-r hover:from-[#E11919] hover:via-[#FF5A1F] hover:to-[#FF8A00]"
              >
                Consultar plan
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#FF5A1F]/30 bg-gradient-to-r from-[#E11919]/15 via-[#FF5A1F]/10 to-white/5 p-6 text-center">
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
      </div>
    </section>
  );
}