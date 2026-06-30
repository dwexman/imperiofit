import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-10 lg:px-8">
      <div className="absolute left-1/2 top-0 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#FF5A1F]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <Link href="/#inicio" className="inline-flex">
          <Image
            src="/images/imperiotrasparente.png"
            alt="Imperio Fit"
            width={220}
            height={120}
            className="h-auto w-[150px] opacity-90 md:w-[180px]"
          />
        </Link>

        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Emilio%20Vaisse%20670%2C%20Barrio%20Italia"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-zinc-300 transition hover:text-[#FF8A00]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition group-hover:border-[#FF5A1F]/60">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="font-gothic text-sm uppercase tracking-[0.16em]">
              Emilio Vaisse 670
            </span>
          </a>

          <a
            href="https://www.instagram.com/imperio_fit_barrio_italia/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-zinc-300 transition hover:text-[#FF8A00]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition group-hover:border-[#FF5A1F]/60">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </span>

            <span className="font-gothic text-sm uppercase tracking-[0.16em]">
              @imperio_fit_barrio_italia
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-center">
        <p className="font-quicksilver text-xs text-zinc-500">
          © {new Date().getFullYear()} Imperio Fit
        </p>
      </div>
    </footer>
  );
}