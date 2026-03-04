// ============================================================
// Proxy para la API del catálogo
// Evita problemas de CORS en los fetch del cliente.
// Los Client Components llaman a /api/catalogo/[...path]
// y este route handler reenvía a admin.chicimportusa.com
// ============================================================

import { NextRequest, NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_CATALOG_API_URL ||
  'https://admin.chicimportusa.com/api/catalogo';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${API_BASE}/${endpoint}${searchParams ? `?${searchParams}` : ''}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: true, mensaje: `API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error(`[API Proxy] Error fetching ${endpoint}:`, error);
    return NextResponse.json(
      { error: true, mensaje: 'Error de conexión con la API' },
      { status: 502 }
    );
  }
}
