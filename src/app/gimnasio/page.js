"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const gymImages = [
  {
    src: "/images/gym1.png",
    title: "Espacio privado",
  },
  {
    src: "/images/gym2.png",
    title: "Máquinas modernas",
  },
  {
    src: "/images/gym3.png",
    title: "Equipamiento cuidado",
  },
  {
    src: "/images/gym4.png",
    title: "Entrenamiento seguro",
  },
];

const trainingImages = [
  {
    src: "/images/gym6.png",
    title: "Acompañamiento real",
  },
  {
    src: "/images/gym7.png",
    title: "Grupos reducidos",
  },
  {
    src: "/images/gym8.png",
    title: "Corrección técnica",
  },
  {
    src: "/images/gym9.png",
    title: "Entrenamiento personalizado",
  },
  {
    src: "/images/gym10.png",
    title: "Ambiente cercano",
  },
  {
    src: "/images/gym11.png",
    title: "Proceso guiado",
  },
];

const highlights = [
  "Máquinas modernas",
  "Equipamiento en buen estado",
  "Espacio cuidado",
  "Ambiente privado",
  "Renovación constante",
  "Experiencia segura",
];

const trainingHighlights = [
  "Grupos reducidos",
  "Coach asignado",
  "Atención personalizada",
  "Ambiente seguro",
  "Corrección técnica",
  "Proceso acompañado",
];

export default function GimnasioPage() {
  const [activeTrainingImage, setActiveTrainingImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrainingImage((prev) => (prev + 1) % trainingImages.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const currentTrainingImage = trainingImages[activeTrainingImage];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden bg-black px-5 pb-20 pt-36 lg:px-8 lg:pt-40">
        <div className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full bg-[#E11919]/20 blur-[150px]" />
        <div className="absolute right-0 top-72 h-[460px] w-[460px] rounded-full bg-[#FF8A00]/15 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="pointer-events-none absolute -left-10 top-6 hidden opacity-[0.08] md:block">
                <Image
                  src="/images/imperiotrasparente.png"
                  alt=""
                  width={520}
                  height={300}
                  className="h-auto w-[430px]"
                />
              </div>

              <div className="pointer-events-none absolute -left-8 top-0 hidden h-[300px] w-[300px] rounded-full bg-[#FF5A1F]/10 blur-[100px] md:block" />

              <div className="relative z-10">
                <p className="font-gothic mb-5 text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
                  Nuestro gimnasio
                </p>

                <h1 className="font-gothic text-4xl uppercase leading-tight tracking-[0.08em] text-white md:text-6xl lg:text-7xl">
                  Un espacio hecho para{" "}
                  <span className="fire-title">entrenar mejor.</span>
                </h1>

                <div className="mt-8 h-px w-full max-w-md bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-transparent" />

                <p className="font-quicksilver mt-7 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                  En Imperio Fit nos preocupamos de mantener nuestras máquinas,
                  equipos y espacios en excelente estado. Estamos siempre
                  renovando y mejorando para entregar una experiencia de
                  entrenamiento moderna, segura y cómoda para cada alumno.
                </p>

                <p className="font-quicksilver mt-5 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
                  Queremos que cada sesión se sienta cuidada: desde el ambiente
                  y la organización del gimnasio, hasta la calidad del
                  equipamiento que usas para avanzar en tus objetivos.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="font-gothic rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/56973797211?text=Hola%20Imperio%20Fit%2C%20quiero%20conocer%20el%20gimnasio%20y%20sus%20planes."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-gothic rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-8 py-4 text-center text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(255,90,31,0.4)] transition duration-300 hover:scale-105"
                  >
                    Conocer Imperio Fit
                  </a>

                  <Link
                    href="/#servicios"
                    className="font-gothic rounded-full border border-white/20 bg-white/10 px-8 py-4 text-center text-sm uppercase tracking-[0.18em] text-white backdrop-blur transition duration-300 hover:border-[#FF5A1F] hover:text-[#FF8A00]"
                  >
                    Ver planes
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-r from-[#E11919]/40 via-[#FF5A1F]/25 to-white/10 blur-2xl" />

              <div className="relative h-[460px] overflow-hidden rounded-[2.3rem] border border-white/10 bg-[#111] shadow-2xl md:h-[620px]">
                {gymImages.map((image, index) => (
                  <div
                    key={image.src}
                    className="gym-hero-slide absolute inset-0"
                    style={{ animationDelay: `${index * 4}s` }}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                    <div className="absolute bottom-6 left-6 right-6 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-center backdrop-blur">
                      <span className="font-gothic text-xs uppercase tracking-[0.22em] text-white">
                        {image.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-24">
            <div className="mb-10 text-center">
              <p className="font-gothic mb-5 text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
                Galería
              </p>

              <h2 className="font-gothic text-3xl uppercase leading-tight tracking-[0.08em] text-white md:text-5xl">
                Detalles del espacio
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {gymImages.map((image) => (
                <div
                  key={image.src}
                  className="group relative h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-gothic text-xs uppercase tracking-[0.22em] text-white">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-28">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative">
                <div className="pointer-events-none absolute -left-10 -top-10 h-[360px] w-[360px] rounded-full bg-[#FF5A1F]/10 blur-[130px]" />

                <div className="relative z-10">
                  <p className="font-gothic mb-5 text-sm uppercase tracking-[0.35em] text-[#FF5A1F]">
                    Entrenamiento acompañado
                  </p>

                  <h2 className="font-gothic text-4xl uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
                    Grupos reducidos.{" "}
                    <span className="fire-title">Atención real.</span>
                  </h2>

                  <div className="mt-8 h-px w-full max-w-md bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-transparent" />

                  <p className="font-quicksilver mt-7 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                    En Imperio Fit nos preocupamos de que cada alumno se sienta
                    acompañado durante su proceso. Por eso trabajamos con grupos
                    reducidos, en un ambiente cercano y ordenado, donde el coach
                    puede observar, corregir y guiar de forma mucho más
                    personalizada.
                  </p>

                  <p className="font-quicksilver mt-5 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
                    Nuestro objetivo es que cada entrenamiento tenga intención:
                    que aprendas a moverte mejor, avances con seguridad y
                    construyas una rutina que se adapte a tus objetivos,
                    horarios y nivel.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {trainingHighlights.map((item) => (
                      <span
                        key={item}
                        className="font-gothic rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 rounded-[2rem] border border-[#FF5A1F]/25 bg-gradient-to-r from-[#E11919]/15 via-[#FF5A1F]/10 to-white/5 p-6">
                    <p className="font-gothic text-xl uppercase leading-tight tracking-[0.08em] text-white md:text-3xl">
                      Entrenar mejor también es sentirse cómodo, cuidado y
                      acompañado.
                    </p>

                    <a
                      href="https://tienda.imperiofit.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-gothic mt-6 inline-flex rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-7 py-4 text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(255,90,31,0.35)] transition duration-300 hover:scale-105"
                    >
                      Quiero entrenar así
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.8rem] bg-gradient-to-r from-[#E11919]/35 via-[#FF5A1F]/25 to-white/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur">
                  <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-black md:h-[680px]">
                    <Image
                      key={`blur-${currentTrainingImage.src}`}
                      src={currentTrainingImage.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="scale-110 object-cover opacity-35 blur-xl transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />

                    <Image
                      key={currentTrainingImage.src}
                      src={currentTrainingImage.src}
                      alt={currentTrainingImage.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-3 transition duration-700 md:p-6"
                    />

                    <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/55 p-5 text-center backdrop-blur">
                      <p className="font-gothic text-xs uppercase tracking-[0.26em] text-[#FF8A00]">
                        {currentTrainingImage.title}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center gap-3">
                    {trainingImages.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        aria-label={`Ver foto ${index + 1}`}
                        onClick={() => setActiveTrainingImage(index)}
                        className={`h-2.5 rounded-full transition duration-300 ${activeTrainingImage === index
                            ? "w-10 bg-gradient-to-r from-[#E11919] to-[#FF8A00]"
                            : "w-2.5 bg-white/25 hover:bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}