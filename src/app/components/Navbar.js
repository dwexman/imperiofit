"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Profesores", href: "/profesores" },
  { label: "Gimnasio", href: "/gimnasio" },
  {
    label: "Tienda",
    href: "https://tienda.imperiofit.cl",
    external: true,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <nav className="relative flex w-full items-center justify-between px-4 py-2 lg:px-6">
        {/* Logo */}
        <Link
          href="/#inicio"
          onClick={closeMenu}
          className="flex items-center"
        >
          <Image
            src="/images/imperioblanco.jpg"
            alt="Imperio Fit"
            width={190}
            height={70}
            priority
            className="h-auto w-[115px] md:w-[145px]"
          />
        </Link>

        {/* Navegación desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-gothic text-sm uppercase tracking-[0.22em] text-zinc-300 transition duration-300 hover:text-[#FF5A1F] lg:text-[15px]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="font-gothic text-sm uppercase tracking-[0.22em] text-zinc-300 transition duration-300 hover:text-[#FF5A1F] lg:text-[15px]"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Botón desktop */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/56973797211"
            target="_blank"
            rel="noopener noreferrer"
            className="font-gothic rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(255,90,31,0.35)] transition duration-300 hover:scale-105 md:px-5 md:text-sm"
          >
            Inscríbete
          </a>
        </div>

        {/* Botón menú mobile */}
        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 md:hidden"
        >
          <span className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-1 h-[2px] w-5 rounded-full bg-white transition duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-white transition duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute bottom-1 left-0 h-[2px] w-5 rounded-full bg-white transition duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        {/* Menú mobile */}
        {isOpen && (
          <div className="absolute left-4 right-4 top-[calc(100%+12px)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/95 shadow-[0_20px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden">
            <div className="flex flex-col p-4">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="font-gothic rounded-2xl px-4 py-4 text-sm uppercase tracking-[0.22em] text-zinc-200 transition hover:bg-white/10 hover:text-[#FF8A00]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="font-gothic rounded-2xl px-4 py-4 text-sm uppercase tracking-[0.22em] text-zinc-200 transition hover:bg-white/10 hover:text-[#FF8A00]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <a
                href="https://wa.me/56973797211"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="font-gothic mt-3 rounded-full bg-gradient-to-r from-[#E11919] via-[#FF5A1F] to-[#FF8A00] px-5 py-4 text-center text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_25px_rgba(255,90,31,0.35)]"
              >
                Inscríbete
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}