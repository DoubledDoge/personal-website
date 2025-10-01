# Personal Website

![Personal Website Screenshot](/public/Preview-Image.webp 'Preview Screenshot')

## 📖 Overview

This is a personal portfolio website showcasing skills, projects, and contact information. The site features a modern design with smooth animations, responsive layouts, and interactive components. Built with Svelte for optimal performance and simplicity.

## ✨ Features

- 🎨 Modern and responsive design
- ⚡ Optimized performance with Svelte's compiled approach
- 📱 Mobile-friendly navigation
- 🌙 Dark theme with custom styling
- 📧 Contact form with EmailJS integration
- 🎯 Smooth scroll navigation
- 📊 Skills visualization
- 💼 Project portfolio with filtering
- 🗜️ Automatic build compression for faster loading
- 🔒 Enhanced security headers and CSP
- 📈 SEO optimized with structured data

## 🛠️ Technologies Used

- **Frontend Framework:** Svelte 5
- **Styling:** TailwindCSS 4
- **Build Tool:** Vite 7
- **Email Integration:** EmailJS
- **Code Quality:** ESLint + Prettier
- **Security:** CodeQL analysis
- **Deployment:** GitHub Pages with automated CI/CD

## 🚀 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/DoubledDoge/personal-website.git
```

2. Navigate to the directory:

```bash
cd personal-website
```

3. Install dependencies:

```bash
npm install
```

4. Create `.env` file based on `.env.example`:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
```

5. Run development server:

```bash
npm run dev
```

6. Build for production:

```bash
npm run build
```

## 🛠️ Development

Available scripts in the project:

```bash
npm run dev             # Start development server with host access
npm run build           # Build for production with compression
npm run preview         # Preview production build
npm run format          # Format code with Prettier
npm run lint            # Run ESLint
npm run lint:check      # Check linting with codeframe format
npm run lint:fix        # Auto-fix linting issues
npm run security-audit  # Audit dependencies for vulnerabilities
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Svelte components
│   ├── assets/        # Images and static assets
│   ├── lib/           # Utility functions and shared code
|   ├── App.svelte     # Main application component
|   ├── globals.css    # Global styles (And TailwindCSS)
│   └── main.js        # Application entry point
├── public/            # Static files
├── .github/
│   └── workflows/     # CI/CD automation
├── dist/              # Production build output
└── package.json       # Project configuration
```

## 🚀 Deployment

The project uses automated GitHub Actions for:

- **Continuous Integration:** Code quality checks, linting, and security audits
- **Automated Deployment:** Builds and deploys to GitHub Pages on every push to main
- **Security Scanning:** Weekly CodeQL analysis for vulnerability detection
- **Dependency Management:** Automated dependency updates via Dependabot

## ⚡ Performance Features

- **Build Compression:** Automatic gzip and brotli compression
- **Code Splitting:** Optimized chunks for faster loading
- **Asset Optimization:** Efficient handling of images and fonts
- **Modern Build Target:** ESNext for smaller bundle sizes
- **Critical CSS:** Inline styles for immediate rendering
- **Preload Hints:** Strategic resource preloading

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (enforced by Prettier and ESLint)
- Ensure all CI checks pass
- Write meaningful commit messages
- Test your changes thoroughly

## 🏆 Special Thanks

Thanks to the following resources that inspired and helped with this project:

1. ["How To Make A Portfolio Website Using Vue JS 3 , Vite , Tailwind CSS"](https://youtu.be/U10h8rrPe6g?si=FprBplIGIb9CdQrr) by OualiCode (Original design inspiration)
2. [Svelte Documentation](https://svelte.dev/) - Excellent framework documentation
3. [TailwindCSS Documentation](https://tailwindcss.com/) - Comprehensive styling guide
4. [Vite Documentation](https://vitejs.dev/) - Modern build tooling

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📌 Notes

- **Node.js 20+** required for development
- **EmailJS credentials** needed for contact form functionality
- **Development server** runs on `http://localhost:5000` (Vite default)
- **Production builds** include automatic compression and optimization
- **Security headers** configured for GitHub Pages deployment
- **Automated updates** managed through Dependabot

## 📋 Version History

- **v2.x.x** - Complete migration to Svelte with a complete overhaul of the internal design and structure
- **v1.x.x** - Original Vue.js implementation

---

_Last Updated: 2025_
