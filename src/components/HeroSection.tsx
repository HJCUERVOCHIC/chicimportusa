import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

const MENSAJE_HERO = "Hola! Quiero saber más sobre sus productos importados.";

export default function HeroSection() {
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(MENSAJE_HERO)}`;

  return (
    <section className="relative w-full overflow-hidden bg-[#111]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/img/herotenis.jpg"
          alt="Tenis importados desde EE.UU."
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-16 text-center md:py-24">
        {/* Badge */}
        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 font-body text-xs uppercase tracking-widest text-white/80">
          Importado directo desde EE.UU.
        </span>

        {/* Headline */}
        <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-white md:text-7xl">
          Tenis, perfumes
          <br />
          <span className="text-[#D90429]">y más</span>
        </h1>

        {/* Subtítulo */}
        <p className="font-body mt-4 max-w-xl text-base text-white/70 md:text-lg">
          Productos originales de marcas americanas, enviados a toda Colombia.
          Pedidos por WhatsApp — rápido, seguro y sin complicaciones.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#D90429] px-8 py-3 font-body font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="white"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.648 4.878 1.88 6.988L2 30l7.236-1.857A13.944 13.944 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.6a11.55 11.55 0 0 1-5.894-1.614l-.422-.252-4.295 1.103 1.133-4.17-.276-.44A11.534 11.534 0 0 1 4.4 16.003C4.4 9.603 9.603 4.4 16.003 4.4c6.4 0 11.597 5.203 11.597 11.603 0 6.4-5.197 11.597-11.597 11.597zm6.37-8.677c-.348-.174-2.062-1.018-2.382-1.134-.32-.116-.553-.174-.786.174-.232.348-.9 1.134-1.104 1.366-.203.232-.406.26-.754.087-.348-.174-1.47-.542-2.8-1.727-1.034-.924-1.733-2.063-1.936-2.411-.204-.348-.022-.537.153-.71.157-.156.348-.406.522-.61.174-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.174-.785-1.893-1.075-2.593-.284-.682-.571-.59-.786-.6l-.668-.012c-.232 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.908s1.25 3.372 1.424 3.604c.174.232 2.46 3.757 5.96 5.268.834.36 1.484.574 1.99.736.836.265 1.597.228 2.198.138.67-.1 2.062-.843 2.354-1.658.29-.815.29-1.513.203-1.659-.087-.145-.32-.232-.668-.406z" />
            </svg>
            Escríbenos por WhatsApp
          </a>

          <Link
            href="#catalogo"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 font-body font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver catálogo
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/50">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Productos 100% originales
          </span>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Envío a toda Colombia
          </span>
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Pago seguro por WhatsApp
          </span>
        </div>
      </div>
    </section>
  );
}
