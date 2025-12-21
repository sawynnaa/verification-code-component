好的，这是将原文中文部分翻译为英文后的完整内容：

# Vue Verification Code Input Component

A feature-rich and easy-to-use Vue 3 verification code input component, supporting custom length, auto-focus, paste, success/error state animations, and more.

## Features

- ✅ Full TypeScript support
- ✅ Responsive design, supporting both mobile and desktop
- ✅ Paste support for verification codes
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Success/error state animations
- ✅ Auto-focus and smart input focus management
- ✅ Numeric input only
- ✅ Accessibility support (ARIA attributes)
- ✅ Customizable length
- ✅ Disabled state support

## Tech Stack

- **Framework**: Vue 3.5+ (Composition API)
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.2
- **CSS Framework**: UnoCSS
- **Node Version**: ^20.19.0 or >=22.12.0

## Project Structure

```
src/
├── main.ts                           # Application entry point
├── App.vue                           # Root component - Demonstrates the usage of the component
└── components/
    └── VerificationCode.vue          # The verification code input component
```

## Quick Start

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

## Detailed Features

### 1. Smart Focus Management

- Automatically jumps to the next empty input box.
- Clicking a filled input box allows direct editing.
- Clicking an empty input box automatically focuses the first empty one.
- Automatically blurs (loses focus) when all inputs are filled.

### 2. Keyboard Navigation

- **Number keys**: Input numbers (0-9 only).
- **Backspace/Delete**: Deletes the current input. Moves focus to the previous input if the current one is empty.
- **Left/Right Arrow keys**: Move between input boxes.
- **Home**: Jumps to the first input box.
- **End**: Jumps to the last input box.
- **Ctrl/Cmd + V**: Paste the verification code.

### 3. Paste Support

- Automatically extracts numbers from the pasted content.
- Starts filling from the current input box.
- Ignores non-numeric characters.
- Supports pasting a full or partial verification code.

### 4. State Animations

- **Error State**: Red border + background + shake animation.
- **Success State**: Green border + background.
- **Focus State**: Blue border + shadow + slight scale-up.
- Inputs are automatically cleared 500ms after the state animation.

### 5. Responsive Design

- **Mobile**: 48px × 56px input boxes.
- **Desktop**: 56px × 64px input boxes.
- Adaptive spacing.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- Disable the Vetur extension if you have it installed.

## Recommended Browser Extensions

### Chromium-based Browsers (Chrome, Edge, Brave, etc.)

- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Enable Custom Object Formatter](http://bit.ly/object-formatters)

### Firefox

- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Enable Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## License

MIT

