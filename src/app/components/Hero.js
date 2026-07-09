import Image from "next/image";

export default function Hero() {
    return (
        <section id="inicio" className="overflow-hidden bg-black">
            {/* VIDEO ARRIBA A TODO EL ANCHO */}
            <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-black md:h-auto md:min-h-0">
                <video
                    className="block h-full w-full object-cover object-center md:h-auto md:w-full md:object-contain"
                    src="/videos/imperio1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Degradado inferior suave */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* LOGO + TEXTOS ABAJO */}
            <div className="relative bg-black px-5 pb-24 pt-20 md:pb-28 md:pt-24 lg:px-8">
                <div className="absolute top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#FF5A1F]/15 blur-[140px]" />

                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                    <Image
                        src="/images/imperiotrasparente.png"
                        alt="Imperio Fit"
                        width={430}
                        height={220}
                        priority
                        className="mb-5 h-auto w-[230px] opacity-90 md:w-[320px] lg:w-[370px]"
                    />

                    <p className="font-gothic mb-7 rounded-full border border-[#FF5A1F]/50 bg-black/45 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-[#FF8A00] backdrop-blur md:text-xs">
                        Gimnasio privado personalizado
                    </p>

                    <div className="font-quicksilver max-w-4xl space-y-5">
                        <p className="text-base leading-8 text-zinc-100 md:text-lg lg:text-xl">
                            Imperio Fit es un gimnasio privado y personalizado ubicado en el
                            corazón de Barrio Italia. Nos caracterizamos por ser un espacio
                            seguro, amable, inclusivo y pet friendly, con un ambiente tranquilo
                            y pocas personas transitando en el lugar.
                        </p>

                        <p className="text-base leading-8 text-zinc-300 md:text-lg">
                            Somos especialistas en entrenamiento de musculación. Para asegurar
                            que cada proceso sea confiable, cercano y de calidad, a cada alumno
                            se le asigna un coach según sus objetivos personales, ayudándolo a
                            construir una rutina deportiva desde el comienzo.
                        </p>
                    </div>

                    <p className="fire-title font-gothic mt-8 max-w-5xl text-3xl uppercase leading-tight tracking-[0.1em] md:text-5xl">
                        Ven a conocernos y vive la experiencia Imperio Fit.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <a
                            href="#servicios"
                            className="font-gothic rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(255,90,31,0.45)] transition duration-300 hover:scale-105"
                        >
                            Ver planes
                        </a>

                        <a
                            href="https://wa.me/56973797211"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-gothic rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm uppercase tracking-[0.18em] text-white backdrop-blur transition duration-300 hover:border-[#FF5A1F] hover:text-[#FF8A00]"
                        >
                            Hablar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}