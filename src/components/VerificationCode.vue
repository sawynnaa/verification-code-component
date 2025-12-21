<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

// Props interface
interface Props {
  length?: number
  modelValue?: string
  disabled?: boolean
  autoFocus?: boolean
  placeholder?: string
  error?: boolean
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  length: 6,
  modelValue: '',
  disabled: false,
  autoFocus: false,
  placeholder: '',
  error: false
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'complete': [value: string]
  'change': [value: string]
  'success': []
}>()

// Reactive state
const code = ref<string[]>(Array(props.length).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])
const focusedIndex = ref<number>(-1)
const isError = ref(false)
const isSuccess = ref(false)

// Computed properties
const codeString = computed(() => code.value.join(''))
const isComplete = computed(() => code.value.every(digit => digit !== ''))

// Set input ref
const setInputRef = (el: HTMLInputElement | null, index: number) => {
  if (el) inputRefs.value[index] = el
}

// Focus specific input
const focusInput = (index: number) => {
  nextTick(() => {
    if (inputRefs.value[index]) {
      inputRefs.value[index].focus()
      focusedIndex.value = index
    }
  })
}

// Move to next empty input after typing
const moveToNext = (currentIndex: number) => {
  // Find next empty box after current position
  const nextEmptyIndex = code.value.findIndex((digit, idx) => idx > currentIndex && digit === '')

  if (nextEmptyIndex !== -1) {
    // Found next empty box, focus it
    focusInput(nextEmptyIndex)
  } else if (isComplete.value) {
    // All filled, blur current input
    inputRefs.value[currentIndex]?.blur()
    focusedIndex.value = -1
  }
}

// Input handler
const handleInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Extract only digits
  const digit = value.replace(/\D/g, '').slice(0, 1)

  // Update model
  code.value[index] = digit

  // Update native input value to match
  input.value = digit

  if (digit) {
    // Valid digit entered, move to next
    moveToNext(index)
    emit('update:modelValue', codeString.value)
    emit('change', codeString.value)

    // Check if complete
    if (isComplete.value) {
      emit('complete', codeString.value)
    }
  }
}

// Keydown handler - improved delete logic
const handleKeydown = (event: KeyboardEvent, index: number) => {
  const { key, ctrlKey, metaKey } = event

  // Handle Backspace/Delete
  if (key === 'Backspace' || key === 'Delete') {
    event.preventDefault()

    // If current box has content, clear it
    if (code.value[index] !== '') {
      code.value[index] = ''
      emit('update:modelValue', codeString.value)
      emit('change', codeString.value)
      return
    }

    // Current box is empty, check if we can move to previous box
    // We can only move to previous if there's no content in the next box (to the right)
    const hasValueOnRight = index < code.value.length - 1 && code.value[index + 1] !== ''

    // If no value on the right and not at the first input, move focus to the left
    if (!hasValueOnRight && index > 0) {
      focusInput(index - 1)
    }
    return
  }

  // Handle Arrow Keys
  if (key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    focusInput(index - 1)
    return
  }

  if (key === 'ArrowRight' && index < code.value.length - 1) {
    event.preventDefault()
    focusInput(index + 1)
    return
  }

  // Handle Home/End
  if (key === 'Home') {
    event.preventDefault()
    focusInput(0)
    return
  }

  if (key === 'End') {
    event.preventDefault()
    focusInput(code.value.length - 1)
    return
  }

  // Handle Paste
  if ((ctrlKey || metaKey) && key === 'v') {
    // Will be handled by paste event
    return
  }

  // Prevent non-numeric input
  if (!/^[0-9]$/.test(key)) {
    event.preventDefault()
  }
}

// Paste handler
const handlePaste = (event: ClipboardEvent, index: number) => {
  event.preventDefault()

  const pasteData = event.clipboardData?.getData('text') || ''
  const digits = pasteData.replace(/\D/g, '').split('')

  // Fill from current position
  digits.forEach((digit, offset) => {
    const targetIndex = index + offset
    if (targetIndex < code.value.length) {
      code.value[targetIndex] = digit
    }
  })

  // Focus next empty or last
  const nextEmpty = code.value.findIndex((d, i) => i > index && d === '')
  if (nextEmpty !== -1) {
    focusInput(nextEmpty)
  } else {
    // All filled or no more empty, blur
    inputRefs.value[index]?.blur()
    focusedIndex.value = -1
  }

  emit('update:modelValue', codeString.value)
  emit('change', codeString.value)

  if (isComplete.value) {
    emit('complete', codeString.value)
  }
}

// Click handler - focus first empty input or allow editing filled ones
const handleClick = (event: MouseEvent, index: number) => {
  // If the clicked input has content, allow editing it
  if (code.value[index] !== '') {
    return // Let the normal focus happen
  }

  // If clicking an empty input, find the first empty input
  const firstEmptyIndex = code.value.findIndex(digit => digit === '')

  // If there's an empty input before the clicked one, focus it instead
  if (firstEmptyIndex !== -1 && firstEmptyIndex < index) {
    event.preventDefault()
    focusInput(firstEmptyIndex)
  }
  // Otherwise, allow focusing the clicked empty input
}

// Focus handler
const handleFocus = (index: number) => {
  // If the focused input has content, allow editing it
  if (code.value[index] !== '') {
    focusedIndex.value = index
    return
  }

  // Find the first empty input
  const firstEmptyIndex = code.value.findIndex(digit => digit === '')

  // If there's an empty input before the current one, focus it instead
  if (firstEmptyIndex !== -1 && firstEmptyIndex < index) {
    focusInput(firstEmptyIndex)
    return
  }

  // Otherwise, focus the current index
  focusedIndex.value = index
}

// Blur handler
const handleBlur = () => {
  focusedIndex.value = -1
}

// Prevent IME composition
const handleCompositionStart = (event: CompositionEvent) => {
  event.preventDefault()
}

// Watch for external modelValue changes
watch(() => props.modelValue, (newVal) => {
  if (newVal !== codeString.value) {
    const digits = newVal.replace(/\D/g, '').split('').slice(0, props.length)
    code.value = [...digits, ...Array(props.length - digits.length).fill('')]
  }
}, { immediate: true })

// Watch for length changes
watch(() => props.length, (newLength) => {
  const currentCode = code.value.join('')
  const digits = currentCode.replace(/\D/g, '').split('').slice(0, newLength)
  code.value = [...digits, ...Array(newLength - digits.length).fill('')]
}, { immediate: true })

// Watch for error prop changes
watch(() => props.error, (newVal) => {
  if (newVal) {
    isError.value = true
  }
})

// Clear function
const clear = () => {
  code.value = Array(props.length).fill('')
  focusInput(0)
  emit('update:modelValue', '')
  emit('change', '')
}

// Show error function
const showError = () => {
  isError.value = true

  // Wait 500ms to show red border, then clear inputs
  setTimeout(() => {
    clear()
    // Reset error state
    isError.value = false
  }, 500)
}

// Show success function
const showSuccess = () => {
  isSuccess.value = true

  // Wait 500ms to show green border, then clear inputs
  setTimeout(() => {
    clear()
    // Reset success state
    isSuccess.value = false
    emit('success')
  }, 500)
}

// Focus function
const focus = () => {
  focusInput(0)
}

// Lifecycle
onMounted(() => {
  if (props.autoFocus) {
    focusInput(0)
  }
})

// Expose public methods
defineExpose({
  focus,
  clear,
  showError,
  showSuccess
})
</script>

<template>
  <div
    :class="{ shake: isError }"
    role="group"
    aria-label="Verification code input"
  >

    <!-- Input container -->
    <div class="flex gap-2 md:gap-3">
      <input
        v-for="(digit, index) in code"
        :key="index"
        :ref="(el) => setInputRef(el as HTMLInputElement, index)"
        v-model="code[index]"
        type="text"
        inputmode="numeric"
        class="verification-input"
        :class="{
          'verification-input--normal': !isError && !isSuccess && !disabled && focusedIndex !== index,
          'verification-input--focused': !isError && !isSuccess && !disabled && focusedIndex === index,
          'verification-input--error': isError,
          'verification-input--success': isSuccess,
          'verification-input--disabled': disabled
        }"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-label="`Digit ${index + 1} of ${length}`"
        :aria-describedby="index === 0 ? 'verification-code-description' : undefined"
        aria-required="true"
        :aria-invalid="isError"
        maxlength="1"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        @input="handleInput($event, index)"
        @keydown="handleKeydown($event, index)"
        @paste="handlePaste($event, index)"
        @click="handleClick($event, index)"
        @focus="handleFocus(index)"
        @blur="handleBlur"
        @compositionstart="handleCompositionStart"
      />
    </div>
  </div>
</template>

<style scoped>
/* Base input reset and custom styles */
.verification-input {
  /* Reset browser defaults */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-image: none;
  outline: none;

  /* Custom base styles */
  width: 3rem;
  height: 3.5rem;
  background-color: #ffffff;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;

  /* Text styles */
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  color: #000000;
  caret-color: transparent;

  /* Smooth transitions */
  transition: border-color 0.2s ease-in-out,
              background-color 0.2s ease-in-out,
              box-shadow 0.2s ease-in-out,
              transform 0.2s ease-in-out;
}

/* Medium screen and up */
@media (min-width: 768px) {
  .verification-input {
    width: 3.5rem;
    height: 4rem;
    font-size: 1.875rem;
  }
}

/* State: Normal */
.verification-input--normal {
  border-color: #d1d5db;
}

.verification-input--normal:hover {
  border-color: #9ca3af;
}

/* State: Focused */
.verification-input--focused {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: scale(1.02);
}

/* State: Error */
.verification-input--error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* State: Success */
.verification-input--success {
  border-color: #10b981;
  background-color: #f0fdf4;
}

/* State: Disabled */
.verification-input--disabled {
  background-color: #f3f4f6;
  border-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

/* Placeholder styling */
.verification-input::placeholder {
  color: #d1d5db;
  opacity: 1;
}

.verification-input--disabled::placeholder {
  color: #e5e7eb;
}

/* Remove autofill styles */
.verification-input:-webkit-autofill,
.verification-input:-webkit-autofill:hover,
.verification-input:-webkit-autofill:focus,
.verification-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: black !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Remove clear button in IE/Edge */
.verification-input::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

/* Remove spin buttons in Chrome/Safari */
.verification-input::-webkit-inner-spin-button,
.verification-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Remove default focus ring in Firefox */
.verification-input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/* Remove search decorations in Safari */
.verification-input::-webkit-search-cancel-button,
.verification-input::-webkit-search-decoration {
  -webkit-appearance: none;
}

/* Shake animation for error state */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.shake {
  animation: shake 0.5s;
}
</style>
