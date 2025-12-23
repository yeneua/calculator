# Engineering Calculator

[![Deploy to GitHub Pages](https://github.com/<username>/calculator/actions/workflows/deploy.yml/badge.svg)](https://github.com/<username>/calculator/actions/workflows/deploy.yml)

Modern engineering calculator with scientific functions, unit conversion, and calculation history.

🔗 **Live Demo**: [https://\<username\>.github.io/calculator/](https://<username>.github.io/calculator/)

## ✨ Features

- 🧮 **Standard Calculator**: Basic arithmetic operations with a clean interface
- 🔬 **Scientific Functions**: Trigonometric, logarithmic, and exponential functions
- 📊 **Calculation History**: Automatic saving and searching of calculations
- 🔄 **Unit Converter**: Convert between length, mass, temperature, time, and volume
- 🌙 **Dark Mode**: Beautiful dark theme by default
- 📱 **Responsive Design**: Optimized for mobile devices
- ⚡ **Fast & Lightweight**: Built with Vite and optimized for performance

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<username>/calculator.git
cd calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🎨 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Math Engine**: Math.js
- **Icons**: Material Symbols
- **Testing**: Vitest + React Testing Library
- **Deployment**: GitHub Pages + GitHub Actions

## 📁 Project Structure

```
calculator/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── store/          # Zustand stores
│   ├── lib/            # Business logic
│   ├── pages/          # Page components
│   └── types/          # TypeScript types
├── public/             # Static assets
├── docs/               # Documentation
└── tests/              # Test files
```

## 📖 Documentation

- [Product Requirements Document (PRD)](./docs/prd.md)
- [Technical Specification](./docs/tech-spec.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern calculator apps
- Icons by [Material Symbols](https://fonts.google.com/icons)
- Fonts by [Google Fonts](https://fonts.google.com)

---

Made with ❤️ by [Your Name]
