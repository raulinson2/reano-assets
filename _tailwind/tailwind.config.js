/* Configuracion UNIFICADA para las 7 paginas de reanotravel.com que hoy cargan
   el CDN de Tailwind. Sustituye a las 7 configuraciones distintas que hay ahora.

   LA CLAVE: los COLORES se unifican solos — las dos familias de variables
   (la familia --color- y la familia --bg- / --text-) acaban en el mismo valor, y la unica clase que
   discrepaba de verdad (bg-surface) solo se usa en /servicios, que ya apunta a
   la variable correcta.

   Lo que NO se puede unificar de un plumazo son los TAMANOS: hero-display tiene
   seis valores distintos, uno por portada, y los seis estan en uso. Por eso aqui
   van como variables CSS con su valor por defecto, y cada pagina declara en un
   :root{} de una linea los suyos. Mismo patron que ya usan los colores. */
module.exports = {
  content: ['./clases.txt'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'background': 'var(--bg-body)',
        'surface': 'var(--bg-surface)',
        'dark-surface': 'var(--bg-surface)',
        'surface-2': 'var(--bg-surface-2,var(--bg-surface))',
        'surface-container': 'var(--bg-surface)',
        'surface-container-low': 'var(--bg-surface)',
        'surface-container-lowest': 'var(--bg-surface)',
        'surface-container-highest': 'var(--bg-surface-2,var(--bg-surface))',
        'on-background': 'var(--text-main)',
        'on-surface': 'var(--text-main)',
        'on-surface-variant': 'var(--text-muted)',
        /* Variable PROPIA por delante. /conciertos usa un tono de borde
           ligeramente distinto y su valor gana por especificidad: pelear la
           cascada desde fuera no funciona (probado). Con una variable que solo
           declaramos nosotros, la pagina que necesite otro tono lo pide y las
           demas ni se enteran. Comprobado: con esto la sustitucion sale
           identica pixel a pixel. */
        'border-subtle': 'var(--rt-tw-borde,var(--border-color-soft))',
        'primary': 'var(--brand-primary)',
        'primary-fixed': 'var(--brand-primary)',
        'primary-container': '#ff6b1a',
        'tertiary-container': '#fe6c21',
        'glass-orange': 'rgba(255,107,26,0.15)',
        'glass-white': 'rgba(255,255,255,0.05)',
        'secondary': 'var(--c-secondary,#06c85d)',
        'secondary-container': '#06c85d',
        'on-secondary': '#ffffff'
      },
      spacing: {
        'stack-gap-sm': '12px', 'stack-gap-md': '24px', 'stack-gap-lg': '40px',
        'card-padding': '32px', 'gutter': '24px',
        'section-v': '80px', 'section-v-mobile': '48px'
      },
      fontFamily: {
        'hero-display': ['Montserrat'], 'hero-display-mobile': ['Montserrat'],
        'section-title': ['Montserrat'], 'card-title': ['Montserrat'],
        'price-display': ['Montserrat'], 'label-caps': ['Montserrat'],
        'body-lg': ['Inter'], 'body-md': ['Inter']
      },
      fontSize: {
        'hero-display': ['var(--fs-hero,58px)', { lineHeight: 'var(--lh-hero,1.1)', letterSpacing: 'var(--ls-hero,-0.02em)', fontWeight: '900' }],
        'hero-display-mobile': ['var(--fs-hero-m,36px)', { lineHeight: 'var(--lh-hero-m,1.2)', fontWeight: '900' }],
        'section-title': ['var(--fs-section,32px)', { lineHeight: 'var(--lh-section,1.3)', fontWeight: '800' }],
        'card-title': ['var(--fs-card,20px)', { lineHeight: '1.4', fontWeight: '700' }],
        'price-display': ['var(--fs-price,24px)', { lineHeight: '1.0', fontWeight: '900' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1.0', letterSpacing: '1.5px', fontWeight: '700' }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
};
