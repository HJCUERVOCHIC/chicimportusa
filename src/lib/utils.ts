// ============================================================
// ChicImportUSA — Utilidades
// ============================================================

import { WHATSAPP_URL } from './constants';

/**
 * Genera la URL de WhatsApp con un mensaje pre-llenado.
 * Si no se pasa mensaje, usa la URL del grupo directamente.
 */
export function buildWhatsAppUrl(mensaje?: string): string {
  if (!mensaje) return WHATSAPP_URL;
  return WHATSAPP_URL;
  // Nota: chat.whatsapp.com/... es un link de grupo y no soporta
  // parámetros ?text=. Si en el futuro se usa un número directo
  // (wa.me/57XXXXXXXXXX), descomentar lo siguiente:
  // return `https://wa.me/57XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Formatea un precio numérico al formato colombiano.
 * @example formatPrice(472420) → "$ 472.420"
 */
export function formatPrice(precio: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
}

/**
 * Combina clases CSS condicionalmente (mini clsx).
 * @example cn('base', isActive && 'active', className)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
