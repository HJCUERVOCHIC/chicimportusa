"use client";

import { usePathname } from "next/navigation";
import { WHATSAPP_PHONE } from "@/lib/constants";

const MENSAJE_GENERICO = "Hola! Me interesa conocer más sobre sus productos.";

export default function WhatsAppFAB() {
  const pathname = usePathname();

  // Ocultar en páginas de producto individual (el botón "PEDIR ESTE PRODUCTO" cumple esa función)
  if (pathname.startsWith("/producto/")) return null;

  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(MENSAJE_GENERICO)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.648 4.878 1.88 6.988L2 30l7.236-1.857A13.944 13.944 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.6a11.55 11.55 0 0 1-5.894-1.614l-.422-.252-4.295 1.103 1.133-4.17-.276-.44A11.534 11.534 0 0 1 4.4 16.003C4.4 9.603 9.603 4.4 16.003 4.4c6.4 0 11.597 5.203 11.597 11.603 0 6.4-5.197 11.597-11.597 11.597zm6.37-8.677c-.348-.174-2.062-1.018-2.382-1.134-.32-.116-.553-.174-.786.174-.232.348-.9 1.134-1.104 1.366-.203.232-.406.26-.754.087-.348-.174-1.47-.542-2.8-1.727-1.034-.924-1.733-2.063-1.936-2.411-.204-.348-.022-.537.153-.71.157-.156.348-.406.522-.61.174-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.174-.785-1.893-1.075-2.593-.284-.682-.571-.59-.786-.6l-.668-.012c-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.908s1.25 3.372 1.424 3.604c.174.232 2.46 3.757 5.96 5.268.834.36 1.484.574 1.99.736.836.265 1.597.228 2.198.138.67-.1 2.062-.843 2.354-1.658.29-.815.29-1.513.203-1.659-.087-.145-.32-.232-.668-.406z" />
      </svg>
    </a>
  );
}
