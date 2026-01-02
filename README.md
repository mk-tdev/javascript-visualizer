# JavaScript Visualizers

Interactive visualizations for understanding algorithms and data structures.

🌐 **Live Demo**: [https://mk-tdev.github.io/javascript-visualizer/](https://mk-tdev.github.io/javascript-visualizer/)

## 🎯 Available Visualizers

### Algorithm Visualizer
Watch sorting algorithms come to life with step-by-step execution visualization.

**Features:**
- 5 sorting algorithms (Bubble, Selection, Insertion, Merge, Quick)
- Real-time code execution highlighting
- Adjustable speed and array size controls
- Performance statistics (comparisons & swaps)
- Fully responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-tdev/javascript-visualizer.git
cd javascript-visualizer

# Install dependencies (Note: If you encounter npm cache permission issues, see Troubleshooting below)
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Open your browser to http://localhost:5173
```

The development server includes hot module replacement for instant updates as you code.

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 📂 Project Structure

```
javascript-visualizer/
├── src/
│   ├── visualizers/
│   │   └── algorithm-visualizer/
│   │       ├── index.html        # HTML structure
│   │       ├── styles.css        # Visualizer styles
│   │       ├── main.js           # Application logic
│   │       └── algorithms.js     # Algorithm implementations
│   ├── shared/
│   │   ├── styles/              # Shared CSS
│   │   └── utils/               # Shared utilities
│   ├── assets/                  # Static assets
│   └── index.html               # Landing page
├── public/                      # Public assets
├── dist/                        # Build output (generated)
├── vite.config.js              # Vite configuration
└── package.json
```

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Languages**: HTML, CSS, JavaScript (ES6+)
- **Deployment**: GitHub Pages

## 🌟 Features

- **Modern Architecture**: Modular ES6+ JavaScript with proper separation of concerns
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Optimized Build**: Vite provides lightning-fast HMR and optimized production builds
- **Scalable**: Easy to add new visualizers with the existing structure

## 📦 Deployment

### GitHub Pages (Automatic)

After pushing to the `main` branch, GitHub Pages will automatically build and deploy the site.

###Manual Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

> **Note**: Make sure you have `gh-pages` installed: `npm install -D gh-pages`

## 🐛 Troubleshooting

### npm Cache Permission Issues

If you encounter permission errors related to npm cache (EACCES errors), run:

```bash
sudo chown -R $(whoami) ~/.npm
```

Then retry the `npm install` command.

### Module Resolution Issues

If you get module resolution errors in development, ensure:
1. Your `package.json` has `"type": "module"`
2. Your imports use proper file extensions (`.js`)
3. Paths are relative and start with `./` or `../`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new visualizers
- Improve existing visualizations
- Fix bugs
- Improve documentation

## 📄 License

MIT License - feel free to use this project for learning and personal projects.

## 🎓 Learning Resources

This project demonstrates:
- Modern JavaScript module system (ES6+)
- Vite build tool configuration
- Multi-page application structure
- Responsive CSS design
- Algorithm visualization techniques
- GitHub Pages deployment

---

Built with ❤️ for learning and visualization
