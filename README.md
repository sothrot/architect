# React Native Web Prototype

A React Native Web boilerplate project using Node.js and pnpm.

## Features

- React Native Web for cross-platform development
- Webpack for bundling
- Babel for transpilation
- Development server with hot reload

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm start
```

The app will open automatically in your browser at `http://localhost:3000`.

### Build

Create a production build:

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Project Structure

```
prototype/
├── public/
│   └── index.html      # HTML template
├── src/
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── .babelrc            # Babel configuration
├── webpack.config.js   # Webpack configuration
└── package.json        # Project dependencies
```

## Technologies

- React 19.2.0
- React Native Web 0.21.2
- Webpack 5
- Babel 7
- pnpm package manager
