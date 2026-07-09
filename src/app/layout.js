import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BackgroundMusic from "./components/BackgroundMusic";

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
        <BackgroundMusic />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}