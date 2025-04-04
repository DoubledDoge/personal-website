# Personal Website 🌐
A modern, responsive personal portfolio website built with Vue.js and TailwindCSS.

## Table of Contents 📑
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Notes](#notes)

## Overview 📖
This is a personal portfolio website showcasing skills, projects, and contact information. The site features a modern design with smooth animations, responsive layouts, and interactive components.

## Features ✨
- 🎨 Modern and responsive design
- ⚡ Lazy loading images for better performance
- 📱 Mobile-friendly navigation
- 🌙 Dark theme with custom styling
- 📧 Contact form with EmailJS integration
- 🎯 Smooth scroll navigation
- 📊 Skills visualization
- 💼 Project portfolio with filtering
- 🔄 Animated components using AOS

## Technologies Used 🛠️
- Vue.js 3 with Composition API
- TypeScript
- TailwindCSS
- EmailJS for contact form
- AOS (Animate On Scroll)
- Vite as build tool

## Setup Instructions 🚀
1. Clone the repository:
```bash
git clone https://github.com/DoubledDoge/personal-website.git
```

2. Navigate to the directory of your cloned files:
```bash
cd personal-website
```

3. Install dependencies
```bash
npm install
```

4. Create .env file based on .env.example
```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
```

5. Run development server:
```bash
npm run dev
```

6. Build for production (Optional):
```bash
npm run build
```

## Development 🛠️
Available scripts in the project:

```bash
npm run dev         # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run test       # Run unit tests
npm run lint       # Lint and fix files
```

## Contributing 🤝
I would personally always welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License 📜
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Notes 📌
- Ensure Node.js version 16 or higher is installed
- For email functionality, valid EmailJS credentials are required
- The development server runs on `http://localhost:3000` by default
- All pull requests must pass automated tests and lint checks
- Project follows semantic versionin

---
*Last Updated: 2025