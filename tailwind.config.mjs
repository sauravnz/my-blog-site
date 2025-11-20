/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-light': 'var(--accent-light)',
        'accent-soft': 'var(--accent-soft)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-light': 'var(--border-light)',
        'border-medium': 'var(--border-medium)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'prose': '65ch',
      },
      fontSize: {
        'elegant-xl': ['4rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'elegant-lg': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'elegant-md': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      boxShadow: {
        'elegant': '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04)',
        'elegant-lg': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'elegant-sm': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'elegant': '1rem',
        'elegant-lg': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
