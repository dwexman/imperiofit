"use client";

import { useEffect } from "react";

export default function GoogleAnalyticsEvents() {
  useEffect(() => {
    const trackExternalLink = (event) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      let destination;

      try {
        destination = new URL(href, window.location.origin);
      } catch {
        return;
      }

      const hostname = destination.hostname.toLowerCase();
      const isStoreLink = hostname === "tienda.imperiofit.cl";

      const isWhatsAppLink =
        hostname === "wa.me" ||
        hostname === "api.whatsapp.com" ||
        hostname === "web.whatsapp.com" ||
        href.startsWith("whatsapp:");

      if (typeof window.gtag !== "function") return;

      if (isStoreLink) {
        window.gtag("event", "click_tienda", {
          link_url: destination.href,
          button_text: link.innerText?.trim() || "Enlace a tienda",
          page_path: window.location.pathname,
          transport_type: "beacon",
        });
      }

      if (isWhatsAppLink) {
        window.gtag("event", "click_whatsapp", {
          link_url: destination.href,
          button_text: link.innerText?.trim() || "Enlace a WhatsApp",
          page_path: window.location.pathname,
          transport_type: "beacon",
        });
      }
    };

    document.addEventListener("click", trackExternalLink);

    return () => {
      document.removeEventListener("click", trackExternalLink);
    };
  }, []);

  return null;
}