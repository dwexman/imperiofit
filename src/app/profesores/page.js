import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

const trainers = [
  {
    name: "Coach Kathy",
    initials: "K",
    image: "/images/kathy.jpeg",
    role: "Musculación y calistenia",
    description:
      "Preparadora física, diplomada en nutrición y suplementación deportiva. Motivadora, exigente y con años de experiencia acompañando procesos de entrenamiento en musculación y calistenia.",
    specialties: ["Musculación", "Calistenia", "Nutrición deportiva"],
    schedule: ["AM 6:00 · 7:00 · 8:00 · 9:00", "PM 17:00 · 18:00 · 19:00"],
    whatsapp:
      "Hola Imperio Fit, quiero consultar por horarios o entrenamiento con Coach Kathy.",
  },
  {
    name: "Coach José",
    initials: "J",
    image: "/images/jose.jpeg",
    role: "Musculación, halterofilia y calistenia",
    description:
      "Personal trainer, quiropráctico y diplomado en nutrición. Cuenta con una larga trayectoria en entrenamiento de musculación, halterofilia y calistenia.",
    specialties: ["Musculación", "Halterofilia", "Calistenia"],
    schedule: ["AM 10:00 · 11:00 · 12:00 · 13:00", "PM 19:00 · 20:00 · 21:00"],
    whatsapp:
      "Hola Imperio Fit, quiero consultar por horarios o entrenamiento con Coach José.",
  },
  {
    name: "Coach Andrés",
    initials: "A",
    image: "/images/andres.jpeg",
    role: "Técnica, fuerza y biomecánica",
    description:
      "Preparador físico con estudios en biomecánica y entrenamiento de la fuerza. Su enfoque destaca la técnica, la precisión y la perfección del movimiento.",
    specialties: ["Fuerza", "Biomecánica", "Técnica"],
    schedule: ["PM 17:00 · 18:00 · 19:00 · 20:00"],
    whatsapp:
      "Hola Imperio Fit, quiero consultar por horarios o entrenamiento con Coach Andrés.",
  },
  {
    name: "Coach David",
    initials: "D",
    image: "/images/david.jpeg",
    role: "Calistenia y personalizados 1 a 1",
    description:
      "Preparador físico y profesor de calistenia. Combina distintas disciplinas, destacando en entrenamiento funcional, deportes colectivos y musculación.",
    specialties: ["Calistenia", "Funcional", "Personalizados 1 a 1"],
    schedule: [
      "Personalizados: horario acordado con el coach",
      "Calistenia: 18:00",
      "Flexible: AM y PM según asignación",
    ],
    whatsapp:
      "Hola Imperio Fit, quiero consultar por horarios o entrenamiento con Coach David.",
  },
];

function getWhatsappLink(message) {
  return `https://wa.me/56973797211?text=${encodeURIComponent(message)}`;
}

export default function ProfesoresPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section
        id="inicio"
        className="relative overflow-hidden bg-black px-5 pb-20 pt-36 lg:px-8 lg:pt-40"
      >
        <div className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full bg-[#E11919]/20 blur-[150px]" />
        <div className="absolute right-0 top-72 h-[460px] w-[460px] rounded-full bg-[#FF8A00]/15 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-gothic mb-5 text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
              Profesores Imperio Fit
            </p>

            <h1 className="font-gothic text-4xl uppercase leading-tight tracking-[0.08em] text-white md:text-6xl lg:text-7xl">
              No entrenas solo.{" "}
              <span className="fire-title block">Entrenas con equipo.</span>
            </h1>

            <p className="font-quicksilver mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
              En Imperio Fit cada alumno cuenta con acompañamiento real.
              Nuestros coaches guían tu proceso según tus objetivos, tu nivel y
              tu ritmo, para que entrenes con seguridad, técnica y constancia
              desde el primer día.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/56973797211?text=Hola%20Imperio%20Fit%2C%20quiero%20saber%20qu%C3%A9%20coach%20o%20plan%20se%20ajusta%20mejor%20a%20mis%20objetivos."
                target="_blank"
                rel="noopener noreferrer"
                className="font-gothic rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(255,90,31,0.4)] transition duration-300 hover:scale-105"
              >
                Encontrar mi coach
              </a>

              <Link
                href="/#servicios"
                className="font-gothic rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm uppercase tracking-[0.18em] text-white backdrop-blur transition duration-300 hover:border-[#FF5A1F] hover:text-[#FF8A00]"
              >
                Ver planes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070707] px-5 py-24 lg:px-8">
        <div className="absolute right-0 top-20 h-[380px] w-[380px] rounded-full bg-[#E11919]/15 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-[#FF8A00]/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="font-gothic mb-5 text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
              El equipo
            </p>

            <h2 className="font-gothic text-3xl uppercase leading-tight tracking-[0.08em] text-white md:text-5xl">
              Coaches que acompañan tu proceso
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trainers.map((trainer) => (
              <article
                key={trainer.name}
                className="group relative flex min-h-[620px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#FF5A1F]/60 hover:bg-white/[0.06]"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FF5A1F]/20 blur-[70px] transition duration-500 group-hover:bg-[#FF5A1F]/35" />

                <div className="relative mb-7 h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#1a1a1a] via-black to-[#3a0d07]">
                  {trainer.image ? (
                    <>
                      <Image
                        src={trainer.image}
                        alt={`Foto de ${trainer.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover object-center transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.08),transparent_55%)]" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.22),transparent_48%)]" />

                      <div className="flex h-full items-center justify-center">
                        <span className="font-gothic relative bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-white bg-clip-text text-8xl uppercase text-transparent">
                          {trainer.initials}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-center backdrop-blur">
                    <p className="font-gothic text-[10px] uppercase tracking-[0.24em] text-[#FF8A00]">
                      Coach Imperio Fit
                    </p>
                  </div>
                </div>

                <h3 className="font-gothic text-2xl uppercase leading-tight tracking-[0.08em] text-white">
                  {trainer.name}
                </h3>

                <p className="font-gothic mt-2 text-xs uppercase tracking-[0.18em] text-[#FF8A00]">
                  {trainer.role}
                </p>

                <p className="font-quicksilver mt-5 min-h-[120px] text-sm leading-7 text-zinc-300">
                  {trainer.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="font-gothic rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-zinc-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="font-gothic mb-4 text-xs uppercase tracking-[0.22em] text-white">
                    Horarios
                  </p>

                  <div className="space-y-3">
                    {trainer.schedule.map((item) => (
                      <p
                        key={item}
                        className="font-quicksilver rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-zinc-300"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <a
                  href={getWhatsappLink(trainer.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-gothic mt-auto rounded-full border border-white/15 bg-white/10 px-5 py-4 text-center text-xs uppercase tracking-[0.18em] text-white transition duration-300 hover:border-[#FF5A1F] hover:bg-gradient-to-r hover:from-[#E11919] hover:via-[#FF5A1F] hover:to-[#FF8A00]"
                >
                  Consultar coach
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-black px-5 py-24 text-center lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#FF5A1F]/30 bg-gradient-to-r from-[#E11919]/15 via-[#FF5A1F]/10 to-white/5 p-8 md:p-12">
          <p className="font-gothic text-sm uppercase tracking-[0.3em] text-[#FF8A00]">
            ¿No sabes por dónde partir?
          </p>

          <h2 className="font-gothic mt-5 text-3xl uppercase leading-tight tracking-[0.08em] text-white md:text-5xl">
            Te ayudamos a encontrar el plan y coach ideal para ti.
          </h2>

          <p className="font-quicksilver mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            Escríbenos por WhatsApp y cuéntanos tus horarios, objetivos y nivel
            actual. El equipo Imperio Fit te orientará para empezar de la mejor
            forma.
          </p>

          <a
            href="https://wa.me/56973797211?text=Hola%20Imperio%20Fit%2C%20quiero%20orientaci%C3%B3n%20para%20elegir%20mi%20plan%20y%20coach."
            target="_blank"
            rel="noopener noreferrer"
            className="font-gothic mt-8 inline-flex rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(255,90,31,0.35)] transition duration-300 hover:scale-105"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}