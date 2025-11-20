# Personal Notes Blog

A clean, elegant, Markdown-first personal blog/journal built with Astro, Tailwind CSS, and modern web technologies. Designed for Obsidian compatibility with contextual sidecards and wikilink support.

## ✨ Features

- **Markdown-first**: Write in Markdown/MDX with full Obsidian compatibility
- **Clean Design**: Elegant typography with Inter and Spectral fonts
- **Dark/Light Mode**: System-aware theme switching
- **Search**: Client-side search powered by Fuse.js
- **Backlinks**: Automatic wikilink resolution and backlink display
- **SEO Optimized**: Sitemap, robots.txt, OpenGraph cards, structured data
- **RSS Feed**: Subscribe to updates via RSS
- **Static Generation**: Pure static output for fast loading and great SEO

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build search index**
   ```bash
   npm run build:search
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Content Management

### Adding Notes

1. Create new notes in `src/content/notes/` with `.md` extension
2. Use the front-matter schema:

```yaml
---
title: "Your Note Title"
description: "Brief description of your note"
pubDate: "2024-01-15"
tags: ["tag1", "tag2", "tag3"]
context: "Optional context paragraph shown in sidebar"
stage: "published" # or "draft", "idea"
confidence: "high" # or "med", "low"
mood: "curious" # or "excited", "focused", "neutral"
featured: false # set to true for featured notes
noindex: false # set to true to exclude from search engines
---
```

### MDX Shortcodes

Use these shortcodes in your Markdown content:

```markdown
<Context />

<Callout type="note">
This is a note callout.
</Callout>

<Callout type="tip">
This is a tip callout.
</Callout>

<Callout type="warn">
This is a warning callout.
</Callout>

<Cite href="https://example.com" author="Author Name" title="Article Title">
This is a citation.
</Cite>
```

### Wikilinks

Use Obsidian-style wikilinks to reference other notes:

```markdown
This connects to [[Another Note Title]] for automatic backlinks.
```

## 🎨 Customization

### Theme Colors

Update theme colors in `src/styles/theme.css`:

```css
:root {
  --bg: #ffffff;      /* Background */
  --fg: #0f172a;      /* Foreground */
  --muted: #e2e8f0;   /* Muted elements */
  --accent: #6366f1;  /* Accent color */
}

.dark {
  --bg: #0b1220;
  --fg: #e5e7eb;
  --muted: #1f2937;
  --accent: #818cf8;
}
```

### Site Configuration

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.tld', // Your actual domain
  // ... other config
});
```

## 🚀 Deployment

### GitHub Pages

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages → Source → GitHub Actions

2. **Configure Custom Domain** (optional)
   - Update `public/CNAME` with your domain
   - Add your domain in repository settings
   - Configure DNS records:
     ```
     CNAME yourdomain.tld → yourusername.github.io
     ```

3. **Deploy**
   - Push to main branch
   - GitHub Actions will automatically build and deploy

### Other Platforms

This static site can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Build Time**: < 30 seconds
- **Bundle Size**: Optimized static assets
- **SEO**: Complete meta tags, structured data, sitemap

## 🛠 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run build:search # Generate search index and backlinks
npm run lint       # Check code with Astro
npm run clean      # Clean build artifacts
```

### Project Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/          # Routes and pages
├── styles/         # CSS and theme files
└── content/        # Markdown content
    └── notes/      # Blog posts and notes

public/             # Static assets
dist/               # Build output
```

## 🔧 Technical Details

### Stack
- **Framework**: Astro 5
- **Styling**: Tailwind CSS 3
- **Content**: MDX with custom shortcodes
- **Search**: Fuse.js for client-side search
- **Typography**: Inter (body) + Spectral (headings)
- **Icons**: Heroicons
- **Math**: KaTeX for mathematical expressions

### Features
- Content collections with Zod validation
- Automatic sitemap generation
- RSS feed with custom styling
- Progressive enhancement
- Accessibility-first design
- Mobile-responsive layout

## 📈 SEO & Performance

- Semantic HTML structure
- OpenGraph and Twitter cards
- Structured data (JSON-LD)
- Optimized images and fonts
- Core Web Vitals optimization
- robots.txt configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Heroicons](https://heroicons.com)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Spectral](https://fonts.google.com/specimen/Spectral)

---

**Made with ❤️ for sharing knowledge and ideas.**