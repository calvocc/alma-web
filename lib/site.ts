export const SITE = {
  name: 'Alma',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://estoesalma.co',
  whatsapp: '573214777790',
  instagram: 'https://www.instagram.com/esto.es.alma/',
  tiktok: 'https://www.tiktok.com/@esto.es.alma',
  handle: '@esto.es.alma',
};

export function whatsappLink(texto = 'Hola, vi Alma y quiero ir. ¿Dónde es este domingo?') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).toString();
}
