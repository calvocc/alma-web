"""
Genera la vista previa para compartir (1200×630) de cada charla en public/charlas/<slug>-og.jpg.

Uso:  npm run og            (todas las que no tengan vista previa)
      npm run og -- --todas (las regenera todas)

Requiere Python 3 con Pillow y `rsvg-convert` (brew install librsvg). Las fuentes se toman de app/fonts.
Si la charla tiene pintura, va a la derecha fundida con el fondo. Las de MANUALES se hicieron a mano y nunca se regeneran.
"""
import base64, json, os, subprocess, sys, tempfile
from PIL import Image, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(RAIZ, 'app', 'fonts')
SALIDA = os.path.join(RAIZ, 'public', 'charlas')
LOGO = os.path.join(RAIZ, 'public', 'media', 'logo-alma.png')

charlas = json.loads(subprocess.check_output(
    ['node', '--experimental-strip-types', '--no-warnings', '-e',
     "import('./content/charlas.ts').then(m=>console.log(JSON.stringify(m.CHARLAS)))"], cwd=RAIZ))

lemon = ImageFont.truetype(os.path.join(FUENTES, 'LemonMilk-Regular.otf'), 30)
lemon_t = lambda s: ImageFont.truetype(os.path.join(FUENTES, 'LemonMilk-Regular.otf'), s)

def partir(texto, fuente, ancho):
    lineas, actual = [], ''
    for p in texto.split():
        prueba = (actual + ' ' + p).strip()
        if fuente.getlength(prueba) <= ancho:
            actual = prueba
        else:
            lineas.append(actual); actual = p
    lineas.append(actual)
    return lineas

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

logo_b64 = base64.b64encode(open(LOGO, 'rb').read()).decode()
lw, lh = Image.open(LOGO).size
todas = '--todas' in sys.argv
MANUALES = {'en-el-nombre'}

for c in charlas:
    destino = os.path.join(SALIDA, f"{c['slug']}-og.jpg")
    if c['slug'] in MANUALES or (os.path.exists(destino) and not todas):
        continue
    pintura = os.path.join(RAIZ, 'public', c['pintura'].lstrip('/')) if c.get('pintura') else None
    ancho_txt = 600 if pintura else 1040
    titulo = c['titulo'].upper()
    tam = 74
    while tam > 44 and len(partir(titulo, lemon_t(tam), ancho_txt)) > (3 if pintura else 2):
        tam -= 4
    t_lineas = partir(titulo, lemon_t(tam), ancho_txt)
    fra_f = lemon_t(26) if pintura else lemon
    f_lineas = partir(c['frase'].upper(), fra_f, ancho_txt - 40)[:4]
    paso_f = 36 if pintura else 42
    y = 250
    tit = ''.join(f'<tspan x="80" y="{y + i * (tam + 8)}">{esc(l)}</tspan>' for i, l in enumerate(t_lineas))
    y2 = y + (len(t_lineas) - 1) * (tam + 8) + 70
    fra = ''.join(f'<tspan x="104" y="{y2 + i * paso_f}">{esc(l)}</tspan>' for i, l in enumerate(f_lineas))
    alto_frase = (len(f_lineas) - 1) * paso_f + 30
    capa_pintura = ''
    if pintura:
        import io
        im = Image.open(pintura).convert('RGB')
        alto = 630; ancho = round(im.width * alto / im.height)
        im = im.resize((ancho, alto), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, 'JPEG', quality=86)
        b64 = base64.b64encode(buf.getvalue()).decode()
        x = 1200 - ancho + 60
        capa_pintura = (f'<defs><linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#ECE9E2"/>'
                        f'<stop offset=".5" stop-color="#ECE9E2"/><stop offset=".68" stop-color="#ECE9E2" stop-opacity="0"/></linearGradient></defs>'
                        f'<image href="data:image/jpeg;base64,{b64}" x="{x}" y="0" width="{ancho}" height="{alto}"/>'
                        f'<rect width="1200" height="630" fill="url(#f)"/>')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<radialGradient id="a" cx="0.85" cy="0.1" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<radialGradient id="b" cx="0" cy="1" r="0.7"><stop offset="0" stop-color="#C9C3B6" stop-opacity=".55"/><stop offset="1" stop-color="#C9C3B6" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="630" fill="#ECE9E2"/><rect width="1200" height="630" fill="url(#a)"/><rect width="1200" height="630" fill="url(#b)"/>
{capa_pintura}
<image href="data:image/png;base64,{logo_b64}" x="80" y="56" width="{round(lw * 56 / lh)}" height="56"/>
<text x="82" y="170" font-family="Lemon Milk" font-weight="300" font-size="20" letter-spacing="4" fill="#6B665E">CHARLA {c['n']} · ALMA</text>
<text font-family="Lemon Milk" font-size="{tam}" fill="#1B1A19">{tit}</text>
<rect x="80" y="{y2 - 30}" width="3" height="{alto_frase + 12}" fill="#9A6E22"/>
<text font-family="Lemon Milk" font-size="{26 if pintura else 30}" fill="#9A6E22">{fra}</text>
<text x="{80 if pintura else 1120}" y="582" text-anchor="{'start' if pintura else 'end'}" font-family="Lemon Milk" font-weight="300" font-size="18" letter-spacing="3" fill="#1B1A19">ESTOESALMA.CO</text>
</svg>'''
    with tempfile.TemporaryDirectory() as tmp:
        sp, pp = os.path.join(tmp, 'og.svg'), os.path.join(tmp, 'og.png')
        open(sp, 'w').write(svg)
        subprocess.run(['rsvg-convert', sp, '-o', pp], check=True)
        Image.open(pp).convert('RGB').save(destino, quality=88)
    print('✓', destino.replace(RAIZ + '/', ''))
