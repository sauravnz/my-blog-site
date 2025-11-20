/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/**/*.astro',
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.jsx'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        border: 'var(--border)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
      },
      fontSize: {
        'brutalist-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        'brutalist-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        'brutalist-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
      },
      boxShadow: {
        'brutalist': '8px 8px 0 var(--fg)',
        'brutalist-sm': '4px 4px 0 var(--fg)',
        'brutalist-lg': '12px 12px 0 var(--fg)',
        'brutalist-accent': '8px 8px 0 var(--accent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
