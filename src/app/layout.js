import "./globals.css";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export const metadata = {
  title: "Imperio Fit | Gimnasio en Barrio Italia",
  description:
    "Imperio Fit es un gimnasio privado y personalizado en Barrio Italia. Entrenamiento de musculación, coaches asignados, espacio seguro, inclusivo y pet friendly.",
  icons: {
    icon: "/images/imperiotrasparente.png",
    shortcut: "/images/imperiotrasparente.png",
    apple: "/images/imperiotrasparente.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />

        {children}

        <Footer />
        <FloatingWhatsApp />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M8LW2RC57C"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'G-M8LW2RC57C');
          `}
        </Script>
      </body>
    </html>
  );
}