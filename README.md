# Personal Website

![Personal Website Screenshot](/src/lib/assets/Preview-Image.webp "Preview Screenshot")

## 📖 Overview

This is a modern personal portfolio website showcasing skills, projects, and professional experience.

## ✨ Features

- 🎨 **Modern Design:** Clean, responsive interface with smooth animations
- ⚡ **High Performance:** Svelte 5 with TypeScript for optimal bundle size and type safety
- 📱 **Mobile-First:** Fully responsive design that works on all devices
- 🌙 **Custom Theming:** Professional dark theme with CSS custom properties
- 🎯 **Smooth Navigation:** Scroll-based navigation with back-to-top functionality
- 📊 **Interactive Skills:** Animated progress bars and skill visualization
- 💼 **Project Portfolio:** Filterable project showcase with live demos
- 🗜️ **Build Optimization:** Automatic compression, code splitting, and asset optimization
- 🔒 **Security Ready:** Enhanced security headers and Content Security Policy
- 📈 **SEO Optimized:** Structured data, meta tags, and performance optimization
- ♿ **Accessibility:** WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Technology Stack

### Core Framework

- **Framework:** Svelte 5
- **Backend:** TypeScript
- **Build Tool:** Vite 7

### Development Tools

- **Type Safety:** TypeScript with strict configuration
- **Code Quality:** ESLint + Prettier + Stylelint
- **Git Hooks:** Husky + lint-staged for pre-commit validation
- **Testing:** Automated CI/CD with GitHub Actions

### External Services

- **Fonts:** Inter Variable via Fontsource
- **Deployment:** GitHub Pages with automated workflows

### Performance Features

- **Compression:** Gzip and Brotli compression
- **Code Splitting:** Intelligent chunking and lazy loading
- **Asset Optimization:** Image preloading and optimization
- **Modern Output:** ESNext target for smaller bundles

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Git for version control

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/DoubledDoge/personal-website
cd personal-website
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
bun run dev
```

4. **Build for production:**

```bash
bun run build:production
```

## 🛠️ Development Scripts

```bash
# Development
bun run dev                 # Start dev server with host access
bun run preview            # Preview production build

# Building
bun run build              # Standard build
bun run build:production   # Optimized production build
bun run clean              # Clean build artifacts

# Code Quality
bun run format             # Format all code with Prettier
bun run lint               # Run ESLint and Stylelint
bun run lint:fix          # Auto-fix all linting issues
bun run lint:staged       # Lint staged files (used by Husky)

# Security
buns run security-audit     # Audit dependencies for vulnerabilities
```

## 🚀 Deployment & CI/CD

### Automated Deployment

- **GitHub Actions:** Automatic build and deploy on push to main
- **GitHub Pages:** Static hosting with custom domain support
- **Performance:** Build optimization and compression

### Continuous Integration

- **Code Quality:** Automated linting and formatting checks via oxc
- **Security:** Weekly CodeQL analysis
- **Dependencies:** Automated updates via Dependabot

### Build Process

1. TypeScript compilation and type checking
2. Svelte component compilation
3. Asset bundling and compression
4. Performance optimization (tree-shaking, code splitting)
5. Security header configuration

## 🤝 Contributing

Contributions are welcome! Please follow these preferred guidelines:

### Getting Started

1. Fork the repository
2. Install bun globally (Preferred package manager): `npm install -g bun`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Ensure all linting passes: `bun run lint`
5. Test thoroughly in development: `bun run dev`
6. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
7. Push and create a Pull Request

### Development Standards

- **TypeScript:** Use strict typing throughout
- **Components:** Follow existing Svelte 5 patterns
- **Styling:** Use the latest supported styling options
- **Accessibility:** Maintain WCAG compliance
- **Performance:** Consider bundle size and loading performance

## 🏆 Acknowledgments

Special thanks to the following resources:
- **[Svelte](https://svelte.dev/)** - Revolutionary frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tooling
- **[MDN](https://developer.mozilla.org/en-US/)** - Web Documentation

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📋 Version History

- **v2.1.0** - Complete TypeScript migration with enhanced type safety
- **v2.0.0** - Svelte 5 migration with modern architecture
- **v1.x.x** - Original Vue.js implementation

---

_Last Updated: 2026_
