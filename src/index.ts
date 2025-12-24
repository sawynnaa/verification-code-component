import type { App, Plugin } from 'vue'
import VerificationCodeInput from './components/VerificationCode.vue'

// Export the component
export { VerificationCodeInput }

// Export types for TypeScript users
export type {
  VerificationCodeInputProps,
  VerificationCodeInputEmits,
  VerificationCodeInputInstance
} from './types'

// Default export for convenience
export default VerificationCodeInput

// Vue plugin install function for app.use()
export const Vue3VerificationInput: Plugin = {
  install(app: App) {
    app.component('VerificationCodeInput', VerificationCodeInput)
  }
}
