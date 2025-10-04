# Personal Website

![Personal Website Screenshot](/public/Preview-Image.webp 'Preview Screenshot')

## 📖 Overview

This is a modern personal portfolio website showcasing skills, projects, and professional experience. Built with Svelte
5 and TypeScript, the site features a contemporary design with smooth animations, responsive layouts, and interactive
components. Optimized for performance with Vite and deployed automatically via GitHub Actions.

## ✨ Features

- 🎨 **Modern Design:** Clean, responsive interface with smooth animations
- ⚡ **High Performance:** Svelte 5 with TypeScript for optimal bundle size and type safety
- 📱 **Mobile-First:** Fully responsive design that works on all devices
- 🌙 **Custom Theming:** Professional dark theme with CSS custom properties
- 📧 **Contact Integration:** Working contact form with EmailJS integration
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
- **Frontend:** SCSS with modular component styles

### Development Tools

- **Type Safety:** TypeScript with strict configuration
- **Code Quality:** ESLint + Prettier + Stylelint
- **Git Hooks:** Husky + lint-staged for pre-commit validation
- **Testing:** Automated CI/CD with GitHub Actions

### External Services

- **Email:** EmailJS for contact form functionality
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
git clone https://github.com/DoubledDoge/personal-website.git
cd personal-website
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment setup:**
   Create `.env` file for EmailJS integration:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
```

4. **Start development server:**

```bash
npm run dev
```

5. **Build for production:**

```bash
npm run build:production
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev                 # Start dev server with host access
npm run preview            # Preview production build

# Building
npm run build              # Standard build
npm run build:production   # Optimized production build
npm run clean              # Clean build artifacts

# Code Quality
npm run format             # Format all code with Prettier
npm run lint               # Run ESLint and Stylelint
npm run lint:js           # ESLint only
npm run lint:css          # Stylelint only
npm run lint:fix          # Auto-fix all linting issues
npm run lint:staged       # Lint staged files (used by Husky)

# Security
npm run security-audit     # Audit dependencies for vulnerabilities
```

## 🚀 Deployment & CI/CD

### Automated Deployment

- **GitHub Actions:** Automatic build and deploy on push to main
- **GitHub Pages:** Static hosting with custom domain support
- **Performance:** Build optimization and compression

### Continuous Integration

- **Code Quality:** Automated linting and formatting checks
- **Security:** Weekly CodeQL analysis and dependency audits
- **Dependencies:** Automated updates via Dependabot

### Build Process

1. TypeScript compilation and type checking
2. Svelte component compilation
3. SCSS processing and optimization
4. Asset bundling and compression
5. Performance optimization (tree-shaking, code splitting)
6. Security header configuration

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Ensure all linting passes: `npm run lint`
4. Test thoroughly in development: `npm run dev`
5. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
6. Push and create a Pull Request

### Development Standards

- **TypeScript:** Use strict typing throughout
- **Components:** Follow existing Svelte 5 patterns
- **Styling:** Use modular SCSS with design tokens
- **Accessibility:** Maintain WCAG compliance
- **Performance:** Consider bundle size and loading performance

## 🏆 Acknowledgments

Special thanks to the following resources and inspirations:

- **[Svelte](https://svelte.dev/)** - Revolutionary frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tooling
- **[EmailJS](https://www.emailjs.com/)** - Client-side email functionality
- **Original Design Inspiration:** ["Portfolio Website Using Vue JS 3"](https://youtu.be/U10h8rrPe6g) by OualiCode

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📋 Version History

- **v2.1.0** - Complete TypeScript migration with enhanced type safety
- **v2.0.0** - Svelte 5 migration with modern architecture
- **v1.x.x** - Original Vue.js implementation

---
_Last Updated: 2025_
