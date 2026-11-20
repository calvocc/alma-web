import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SITE } from '@/lib/site';
import './globals.css';

const lemon = localFont({
  src: [
    { path: './fonts/LemonMilk-Light.otf', weight: '300', style: 'normal' },
    { path: './fonts/LemonMilk-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/LemonMilk-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-lemon',
  display: 'swap',
});

const eathoma = localFont({
  src: './fonts/EathomaScript.otf',
  variable: '--font-eathoma',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Alma · Iglesia en casas en Funza, Madrid y Mosquera',
    template: '%s · Alma',
  },
  description:
    '¿Buscas una iglesia en Funza, Madrid o Mosquera? Alma no es una iglesia tradicional: somos personas que nos reunimos los domingos en casas para acercarnos a Dios, sin religión y sin protocolo.',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Alma',
    images: [{ url: '/og-alma.jpg', width: 1200, height: 630, alt: 'Ese aliento que no se detiene es lo que nos hace Alma' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#ECE9E2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${lemon.variable} ${eathoma.variable}`}>
      <body>{children}</body>
    </html>
  );
}
