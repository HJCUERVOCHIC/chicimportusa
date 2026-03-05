"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, WHATSAPP_LINK } from "@/types";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function buildWhatsAppHref(product: Product): string {
  const url = `https://chicimportusa.com/producto/${product.id}`;
  const msg = encodeURIComponent(`Hola! Estoy interesado en: *${product.name}*\n${url}`);
  return `${WHATSAPP_LINK}?text=${msg}`;
}

function ShareButton({ product }: { product: Product }) {
  const [copied, setCopied] = useState(false);
  async function handleShare() {
    const url = `https://chicimportusa.com/producto/${product.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); return; } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={handleShare} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs tracking-wide transition-colors duration-200">
      <ShareIcon />
      {copied ? "¡Enlace copiado!" : "Compartir"}
    </button>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const isAvailable = product.status === 'available';
  const src = imgError ? "/img/placeholder-product.jpg" : product.image;

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200"><ArrowLeftIcon /></span>
          Volver al catálogo
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* Imagen */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-2xl border border-gray-100">
            <Image src={src} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover" priority onError={() => setImgError(true)} />
            {!isAvailable && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <span className="text-gray-400 text-sm tracking-[0.3em] uppercase border border-gray-200 px-6 py-2 rounded-lg">Agotado</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 md:pt-2">
            <div className="flex items-center gap-3">
              {product.category && <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400">{product.category}</span>}
              {product.category && product.brand && <span className="text-gray-300 text-xs">·</span>}
              {product.brand && <span className="text-[10px] tracking-[0.25em] uppercase text-[#D90429]">{product.brand}</span>}
            </div>

            <h1 className="text-4xl md:text-5xl text-gray-900 leading-none"
              style={{ fontFamily: "var(--font-bebas-neue, cursive)", letterSpacing: "0.02em" }}>
              {product.name}
            </h1>

            <div className="border-t border-b border-gray-100 py-4">
              <span className="text-3xl font-semibold text-gray-900">{product.price_ref}</span>
            </div>

            {isAvailable ? (
              <a href={buildWhatsAppHref(product)} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#D90429] hover:bg-[#b8031f] text-white font-bold text-base tracking-widest uppercase transition-all duration-200 active:scale-[0.98] mt-2 rounded-xl shadow-[0_4px_16px_rgba(217,4,41,0.25)]">
                <WhatsAppIcon size={20} />
                Consultar por WhatsApp
              </a>
            ) : (
              <div className="flex items-center justify-center w-full py-4 bg-gray-50 text-gray-400 font-semibold text-sm tracking-widest uppercase border border-gray-100 mt-2 rounded-xl">
                Producto agotado
              </div>
            )}

            <div className="flex items-center justify-end pt-1">
              <ShareButton product={product} />
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 mt-auto">
              {["✦  Productos originales importados de USA", "✦  Pedidos via WhatsApp — rápido y seguro", "✦  Envíos a todo Colombia"].map((line) => (
                <p key={line} className="text-[11px] text-gray-400 tracking-wide">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
