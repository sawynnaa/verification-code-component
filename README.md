# @moonstone1258/vue3-verification-input

[![npm version](https://img.shields.io/npm/v/@moonstone1258/vue3-verification-input.svg)](https://www.npmjs.com/package/@moonstone1258/vue3-verification-input)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A feature-rich and easy-to-use Vue 3 verification code input component with TypeScript support.

## Features

- ✅ Full TypeScript support
- ✅ Responsive design (mobile & desktop)
- ✅ Paste support for verification codes
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Success/error state animations
- ✅ Auto-focus and smart input management
- ✅ Numeric input only
- ✅ Accessibility (ARIA attributes)
- ✅ Customizable length
- ✅ Disabled state support
- ✅ Zero dependencies (only Vue 3 peer dependency)

## Installation

```bash
npm install @moonstone1258/vue3-verification-input
```

or

```bash
yarn add @moonstone1258/vue3-verification-input
```

or

```bash
pnpm add @moonstone1258/vue3-verification-input
```

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VerificationCodeInput } from '@moonstone1258/vue3-verification-input'
import '@moonstone1258/vue3-verification-input/style.css'

const code = ref('')

const handleComplete = (value: string) => {
  console.log('Code completed:', value)
}
</script>

<template>
  <VerificationCodeInput
    v-model="code"
    :length="6"
    @complete="handleComplete"
  />
</template>
```

### Global Registration

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { Vue3VerificationInput } from '@moonstone1258/vue3-verification-input'
import '@moonstone1258/vue3-verification-input/dist/style.css'

const app = createApp(App)
app.use(Vue3VerificationInput)
app.mount('#app')
```

Then use in any component:

```vue
<template>
  <VerificationCodeInput v-model="code" />
</template>
```

### Advanced Usage with Ref

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  VerificationCodeInput,
  type VerificationCodeInputInstance
} from '@moonstone1258/vue3-verification-input'
import '@moonstone1258/vue3-verification-input/dist/style.css'

const code = ref('')
const inputRef = ref<VerificationCodeInputInstance>()

const handleComplete = async (value: string) => {
  // Simulate API validation
  const isValid = await validateCode(value)

  if (isValid) {
    inputRef.value?.showSuccess()
  } else {
    inputRef.value?.showError()
  }
}

const resetCode = () => {
  inputRef.value?.clear()
}
</script>

<template>
  <VerificationCodeInput
    ref="inputRef"
    v-model="code"
    :length="6"
    :auto-focus="true"
    @complete="handleComplete"
  />

  <button @click="resetCode">Reset</button>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | The v-model value (current code) |
| `length` | `number` | `6` | Number of verification code digits |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `autoFocus` | `boolean` | `false` | Auto-focus the first input on mount |
| `placeholder` | `string` | `''` | Placeholder text for empty inputs |
| `error` | `boolean` | `false` | Show error state |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `(value: string)` | Emitted when the value changes |
| `complete` | `(value: string)` | Emitted when all inputs are filled |
| `change` | `(value: string)` | Emitted when any input changes |
| `success` | `()` | Emitted after success animation completes |

### Methods (Exposed via ref)

| Method | Parameters | Description |
|--------|------------|-------------|
| `focus()` | - | Focus the first input |
| `clear()` | - | Clear all inputs and focus the first one |
| `showError()` | - | Show error state with shake animation, then clear |
| `showSuccess()` | - | Show success state with animation, then clear |

### TypeScript Support

```typescript
import type {
  VerificationCodeInputProps,
  VerificationCodeInputEmits,
  VerificationCodeInputInstance
} from '@moonstone1258/vue3-verification-input'
```

## Development

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Build Library

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

## Detailed Features

### Smart Focus Management

- Automatically jumps to the next empty input box
- Clicking a filled input box allows direct editing
- Clicking an empty input box automatically focuses the first empty one
- Automatically blurs when all inputs are filled

### Keyboard Navigation

- **Number keys**: Input numbers (0-9 only)
- **Backspace/Delete**: Deletes the current input. Moves focus to the previous input if current is empty
- **Left/Right Arrow keys**: Move between input boxes
- **Home**: Jumps to the first input box
- **End**: Jumps to the last input box
- **Ctrl/Cmd + V**: Paste verification code

### Paste Support

- Automatically extracts numbers from pasted content
- Starts filling from the current input box
- Ignores non-numeric characters
- Supports pasting full or partial verification code

### State Animations

- **Error State**: Red border + background + shake animation
- **Success State**: Green border + background
- **Focus State**: Blue border + shadow + slight scale-up
- Inputs automatically cleared 500ms after state animation

### Responsive Design

- **Mobile**: 48px × 56px input boxes
- **Desktop**: 56px × 64px input boxes
- Adaptive spacing

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT © moonstone1258

## Repository

[https://github.com/moonstone1258/vue3-verification-input](https://github.com/moonstone1258/vue3-verification-input)
