<script setup lang="ts">
import { ref } from 'vue'
import VerificationCodeInput from './components/VerificationCode.vue'

const verificationCode = ref('')
const codeInputRef = ref<InstanceType<typeof VerificationCodeInput>>()
const message = ref('')

// Handle complete event - auto-submit
const handleComplete = async (code: string) => {
  message.value = '正在验证...'

  // Simulate API validation
  setTimeout(() => {
    // Simulate validation - for demo, codes ending with '6' are valid
    if (code.endsWith('6')) {
      message.value = '验证成功'
      // Trigger success state
      codeInputRef.value?.showSuccess()
    } else {
      message.value = '验证失败'
      // Trigger error state
      codeInputRef.value?.showError()
    }
  }, 1000)
}

// Handle success event - called after success animation
const handleSuccess = () => {
  // Success state reset, ready for next operation
  console.log('Success animation completed')
}

// Handle change event
const handleChange = (code: string) => {
  verificationCode.value = code
  // Clear message when user starts typing again
  if (message.value === '验证成功' || message.value === '验证失败') {
    message.value = ''
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center">
      <!-- Verification Code Input -->
      <VerificationCodeInput
        ref="codeInputRef"
        v-model="verificationCode"
        :length="6"
        :auto-focus="true"
        @complete="handleComplete"
        @change="handleChange"
        @success="handleSuccess"
      />

      <!-- Validation Message -->
      <div v-if="message" class="mt-6">
        <p class="text-base font-medium" :class="{
          'text-green-600': message === '验证成功',
          'text-red-600': message === '验证失败',
          'text-gray-600': message === '正在验证...'
        }">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed */
</style>
