'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { whatsappLink } from '@/lib/site';

type Props = { variant?: 'fixed' | 'sticky'; active?: 'inicio' | 'charlas' };

export default function Header({ variant = 'sticky', active }: Props) {
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    if (variant === 'fixed') return;
    const revisar = () => setConFondo(window.scrollY > 12);
    revisar();
    window.addEventListener('scroll', revisar, { passive: true });
    return () => window.removeEventListener('scroll', revisar);
  }, [variant]);

  return (
    <header className={`header ${variant === 'fixed' ? 'header-fixed' : `header-sticky${conFondo ? ' con-fondo' : ''}`}`}>
      <Link href="/" className="header-logo" aria-label="Alma, inicio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo-alma.png" alt="Alma" width={50} height={52} />
      </Link>
      <nav className="nav" aria-label="Principal">
        <Link href="/" className="nav-link-inicio" aria-current={active === 'inicio' ? 'page' : undefined}>INICIO</Link>
        <Link href="/charlas/" aria-current={active === 'charlas' ? 'page' : undefined}>CHARLAS</Link>
        <a className="btn btn-primary" href={whatsappLink()}>QUIERO IR</a>
      </nav>
    </header>
  );
}
