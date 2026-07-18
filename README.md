# 3 Years - Sitio para Beatriz 💛

Landing page multipágina hecha con **Next.js 15** + **Tailwind CSS 3** + **Lucide Icons**,
con navbar inferior estilo app móvil, totalmente responsive y táctil.

## 1. Requisitos

- [Node.js](https://nodejs.org/) versión 18.18 o superior (recomendado: 20 LTS).
- [VS Code](https://code.visualstudio.com/)
- Una cuenta gratuita en [Vercel](https://vercel.com/)
- (Opcional pero recomendado) Cuenta en [GitHub](https://github.com/)

Verifica tu versión de Node abriendo una terminal (CMD, PowerShell o la terminal
integrada de VS Code con `` Ctrl + ` ``) y escribiendo:

```bash
node -v
npm -v
```

## 2. Poner el proyecto a andar en tu PC (Windows)

1. Descomprime la carpeta `3-years` donde prefieras, por ejemplo en
   `C:\Users\TuUsuario\Proyectos\3-years`.
2. Abre esa carpeta en VS Code: `Archivo > Abrir carpeta...`
3. Abre una terminal integrada en VS Code (`` Ctrl + ` ``) y ejecuta:

```bash
npm install
```

Esto instalará Next.js 15, React, Tailwind 3.4 (fijado a esa versión a propósito
para que no se instale Tailwind 4 por error) y Lucide Icons.

4. Levanta el servidor de desarrollo:

```bash
npm run dev
```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

Cada vez que guardes un archivo, la página se recarga sola. Para probar el
diseño responsive, abre las herramientas de desarrollador (`F12`) y activa el
modo de simulación de dispositivo móvil (`Ctrl + Shift + M` en Chrome/Edge).

Para detener el servidor: `Ctrl + C` en la terminal.

## 3. Estructura del proyecto

```
3-years/
├── app/                     → Cada carpeta = una ruta/página
│   ├── page.js              → "/"        Inicio
│   ├── historia/page.js     → "/historia"
│   ├── galeria/page.js      → "/galeria"
│   ├── cartas/page.js       → "/cartas"
│   ├── motivos/page.js      → "/motivos"
│   ├── layout.js            → Layout raíz (fuentes + navbar, aplica a TODAS las páginas)
│   └── globals.css          → Estilos globales y utilidades
├── components/
│   ├── layout/               → Navbar inferior y contenedor de página
│   ├── ui/                   → Botones, tarjetas de vidrio, blobs decorativos
│   └── sections/              → Bloques de contenido de cada página
├── lib/data.js               → TODO el contenido editable (textos, fechas, fotos, cartas, motivos)
└── public/images/            → Aquí van las fotos reales cuando las tengas
```

## 4. Cómo editar el contenido (sin tocar código)

Abre **`lib/data.js`**. Ahí puedes cambiar:

- `couple.anniversaryDate` → la fecha del contador en vivo de Inicio.
- `timeline` → los momentos de "Nuestra Historia".
- `photos` → cuando tengas fotos reales, cámbialas así:
  ```js
  { id: 1, src: '/images/foto1.jpg', caption: 'Nuestra primera foto juntos' }
  ```
  y coloca el archivo `foto1.jpg` dentro de `public/images/`.
- `letters` → el contenido de cada carta (título, adelanto y texto completo).
- `reasons` → la lista de motivos, uno por línea.

## 5. Subir el proyecto a GitHub (recomendado antes de Vercel)

```bash
git init
git add .
git commit -m "Primer commit: sitio 3 years"
```

Luego crea un repositorio vacío en https://github.com/new (puede ser privado)
y sigue las instrucciones que GitHub te muestra para conectarlo, algo como:

```bash
git remote add origin https://github.com/TU_USUARIO/3-years.git
git branch -M main
git push -u origin main
```

## 6. Desplegar en Vercel

**Opción A - Desde la web (más fácil):**

1. Entra a [vercel.com](https://vercel.com/) e inicia sesión con GitHub.
2. Clic en **"Add New" → "Project"**.
3. Selecciona el repositorio `3-years`.
4. Vercel detecta automáticamente que es Next.js - no cambies nada, clic en **Deploy**.
5. En un par de minutos tendrás tu URL pública (algo como `3-years.vercel.app`).

**Opción B - Desde la terminal, sin GitHub:**

```bash
npm install -g vercel
vercel login
vercel
```

Sigue las preguntas en pantalla (usa las opciones por defecto). Al final te dará
una URL de vista previa, y con `vercel --prod` la publicas en producción.

## 7. Notas técnicas importantes

- **Tailwind está fijado a la versión 3.4.4** en `package.json` a propósito. No
  ejecutes `npm install tailwindcss` sin especificar versión, porque instalaría
  Tailwind 4 y romperá los estilos (usa clases y config distintas).
- El **navbar inferior** (`components/layout/BottomNav.jsx`) es fijo en móvil y
  se convierte en una barra flotante centrada en pantallas medianas/grandes
  (`md:` en adelante). El botón de **Inicio** siempre queda al centro y elevado.
- Se respeta el "safe area" de celulares con notch/gestos (`env(safe-area-inset-bottom)`)
  para que el navbar no quede tapado por la barra de gestos del sistema.
- Las fotos de la galería usan **placeholders de gradiente** mientras no subas
  fotos reales - no falta ningún archivo, es intencional.
- Las fuentes (Fraunces y Plus Jakarta Sans) se cargan automáticamente vía
  `next/font/google` la primera vez que compiles con internet disponible
  (tanto en tu PC como en Vercel funcionará sin configuración extra).

## 8. Próximos pasos sugeridos

- Reemplazar las fotos placeholder por fotos reales en `public/images/`.
- Editar los textos de `timeline`, `letters` y `reasons` en `lib/data.js` con
  contenido real de tu relación.
- Si más adelante quieres una página nueva (ej. "Playlist" o "Nuestro lugar
  favorito"), solo hay que crear una carpeta nueva dentro de `app/` con su
  `page.js`, y agregar un ítem en `NAV_ITEMS` dentro de `BottomNav.jsx`.
