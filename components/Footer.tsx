import { SITE } from '@/lib/site';
import { IconInstagram, IconTikTok } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p className="lemon" style={{ margin: 0, fontWeight: 700, fontSize: 40, letterSpacing: '.04em' }}>ESTO ES ALMA.</p>
          <p className="footer-cita">“Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma.” — 3 Juan 1:2</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
          <div className="footer-redes">
            <a href={SITE.instagram} aria-label="Instagram de Alma, @esto.es.alma"><IconInstagram /></a>
            <a href={SITE.tiktok} aria-label="TikTok de Alma, @esto.es.alma"><IconTikTok /></a>
            <span className="lemon" style={{ fontWeight: 300, fontSize: 13, letterSpacing: '.12em', color: '#CFCAC0' }}>@ESTO.ES.ALMA</span>
          </div>
          <span className="lemon" style={{ fontWeight: 300, fontSize: 13, letterSpacing: '.14em', color: '#A8A39A' }}>MADRID · MOSQUERA · FUNZA</span>
        </div>
      </div>
    </footer>
  );
}
