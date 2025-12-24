/**
 * Props interface for VerificationCodeInput component
 */
export interface VerificationCodeInputProps {
  /**
   * Number of verification code digits
   * @default 6
   */
  length?: number

  /**
   * The v-model value (current code)
   * @default ''
   */
  modelValue?: string

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Auto-focus the first input on mount
   * @default false
   */
  autoFocus?: boolean

  /**
   * Placeholder text for empty inputs
   * @default ''
   */
  placeholder?: string

  /**
   * Show error state
   * @default false
   */
  error?: boolean
}

/**
 * Events emitted by VerificationCodeInput component
 */
export interface VerificationCodeInputEmits {
  /**
   * Emitted when the value changes (v-model update)
   */
  'update:modelValue': (value: string) => void

  /**
   * Emitted when all inputs are filled
   */
  'complete': (value: string) => void

  /**
   * Emitted when any input changes
   */
  'change': (value: string) => void

  /**
   * Emitted after success animation completes
   */
  'success': () => void
}

/**
 * Instance methods exposed by VerificationCodeInput component
 */
export interface VerificationCodeInputInstance {
  /**
   * Focus the first input
   */
  focus: () => void

  /**
   * Clear all inputs and focus the first one
   */
  clear: () => void

  /**
   * Show error state with shake animation, then clear inputs
   */
  showError: () => void

  /**
   * Show success state with animation, then clear inputs
   */
  showSuccess: () => void
}
