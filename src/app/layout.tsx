import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ChicImportUSA | Drops de moda original desde USA',
  description: 'Drops periódicos de moda original desde USA. Tenis, ropa y accesorios de marcas reconocidas. Solo productos publicados en cada drop.',
  keywords: ['drops', 'moda', 'USA', 'tenis', 'sneakers', 'ropa', 'importación', 'Colombia'],
  openGraph: {
    title: 'ChicImportUSA | Drops de moda original desde USA',
    description: 'Drops periódicos de moda original desde USA por WhatsApp',
    url: 'https://chicimportusa.com',
    siteName: 'ChicImportUSA',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-bg text-text">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
