# TypeScript Setup Guide

The project has been converted from JavaScript to TypeScript!

## ⚠️ Important: Build Step Required

**TypeScript requires compilation** before it can run in the browser. This is different from the previous JavaScript setup.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs TypeScript as a dev dependency.

### 2. Build the Project

```bash
npm run build
```

This compiles all TypeScript files (`.ts`) in `src/js/` to JavaScript (`.js`) in the same directory.

### 3. Run the Project

```bash
npm run dev
```

Or for a one-time build and serve:

```bash
npm start
```

## Development Workflow

### Option 1: Watch Mode (Recommended for Development)

The `dev` script includes watch mode, but you can also run TypeScript compiler in watch mode separately:

```bash
# Terminal 1: Watch TypeScript files
tsc --watch

# Terminal 2: Serve the site
npx serve . -p 3000
```

### Option 2: Build Then Serve

```bash
npm run build  # Compile TypeScript
npm run dev    # Serve the site
```

## Project Structure

```
src/js/
├── config.ts      # Configuration (TypeScript source)
├── donation.ts    # Donation handler (TypeScript source)
└── main.ts        # Entry point (TypeScript source)

After compilation:
src/js/
├── config.js      # Compiled JavaScript
├── donation.js    # Compiled JavaScript
└── main.js        # Compiled JavaScript
```

## TypeScript Features

- ✅ **Type Safety**: Full type checking
- ✅ **Interfaces**: Type definitions for config
- ✅ **Strict Mode**: Enabled for better code quality
- ✅ **ES Modules**: Modern JavaScript modules
- ✅ **Source Maps**: For debugging

## Configuration

TypeScript settings are in `tsconfig.json`:
- **Target**: ES2020 (modern browsers)
- **Module**: ES2020 (ES modules)
- **Strict**: Enabled (full type checking)
- **Source Maps**: Enabled (for debugging)

## Deployment

### Before Deploying:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Verify compiled files exist:**
   - Check that `src/js/*.js` files are present
   - These are the files the browser will use

3. **Deploy as usual:**
   - The compiled `.js` files will be used
   - HTML already references `src/js/main.js` (compiled output)

### Deploy to:

- **Vercel**: Will auto-detect TypeScript and build (or run `npm run build`)
- **Netlify**: Add build command: `npm run build`
- **GitHub Pages**: Build locally, commit `.js` files, then deploy

## Notes

- The HTML file references `src/js/main.js` (compiled output)
- TypeScript source files (`.ts`) are compiled to JavaScript (`.js`)
- You can ignore the `.js` files in your editor, but they're needed for the browser
- Source maps (`.js.map`) are generated for debugging

## Troubleshooting

### "Cannot find module" errors

- Make sure you ran `npm run build` first
- Check that compiled `.js` files exist in `src/js/`

### Type errors

- Check `tsconfig.json` settings
- Make sure all imports use correct paths
- Verify type definitions match your code

### Build fails

- Ensure TypeScript is installed: `npm install`
- Check `tsconfig.json` syntax
- Verify all `.ts` files have valid syntax

## Differences from JavaScript Version

1. **Build step required**: Must compile TypeScript before running
2. **Type safety**: Catch errors at compile time
3. **Better IDE support**: Autocomplete and type hints
4. **Interfaces**: Type definitions for configuration

## Need Help?

- TypeScript docs: https://www.typescriptlang.org/docs/
- Project uses ES modules (import/export)
- All files use strict type checking
