<template>
  <div class="newsletter-signup">
    <div class="newsletter-header">
      <img src="/img/icons/info-icon.webp" alt="Newsletter" class="newsletter-icon" />
      <span class="newsletter-text">{{ $t('newsletter.title') }}</span>
    </div>

    <div class="newsletter-content">
      <p class="newsletter-description">{{ $t('newsletter.description') }}</p>

      <form @submit.prevent="handleSubmit" class="newsletter-form">
        <div class="form-group">
          <label for="email" class="form-label">{{ $t('newsletter.emailLabel') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            :placeholder="$t('newsletter.emailPlaceholder')"
            class="form-input"
            :class="{ 'error': emailError }"
            required
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              v-model="agreed"
              type="checkbox"
              class="form-checkbox"
              required
            />
            <span class="checkbox-text">{{ $t('newsletter.agreement') }}</span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting || !agreed"
          class="submit-button"
          :class="{ 'disabled': isSubmitting || !agreed }"
        >
          <span v-if="isSubmitting" class="loading-spinner">⟳</span>
          <span v-else>{{ submitText }}</span>
        </button>
      </form>

      <div v-if="message" class="message" :class="{ 'success': isSuccess, 'error': !isSuccess }">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/config/emailjs'

const { t } = useI18n()

const email = ref('')
const agreed = ref(false)
const isSubmitting = ref(false)
const message = ref('')
const isSuccess = ref(false)
const emailError = ref('')

const submitText = computed(() => {
  return isSubmitting.value ? t('newsletter.submitting') : t('newsletter.subscribe')
})

// EmailJS configuration - You'll need to replace these with your actual values
const SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID
const TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID
const PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubmit = async () => {
  if (!validateEmail(email.value)) {
    emailError.value = t('newsletter.invalidEmail')
    return
  }

  emailError.value = ''
  isSubmitting.value = true
  message.value = ''

  // Check if EmailJS is configured
  if (SERVICE_ID === 'your_service_id' || TEMPLATE_ID === 'your_template_id' || PUBLIC_KEY === 'your_public_key') {
    message.value = 'EmailJS not configured. Please check EMAILJS_SETUP.md for setup instructions.'
    isSuccess.value = false
    isSubmitting.value = false
    return
  }

  try {
    const templateParams = {
      user_email: email.value,
      to_name: 'Alexis',
      from_name: email.value,
      message: `New newsletter subscription from: ${email.value}`,
      reply_to: email.value
    }

    console.log('Sending newsletter subscription with params:', templateParams)

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

    message.value = t('newsletter.successMessage')
    isSuccess.value = true
    email.value = ''
    agreed.value = false

  } catch (error) {
    console.error('EmailJS error:', error)
    message.value = `Error: ${error.text || error.message || 'Unknown error occurred'}`
    isSuccess.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.newsletter-signup {
  margin: 2rem 0;
  padding: 1rem;
  background: #f0f0f0;
  border: 2px inset #c0c0c0;
  border-radius: 0;
}

.newsletter-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #808080;
}

.newsletter-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.newsletter-text {
  font-family: 'Tahoma', sans-serif;
  font-size: 11px;
  font-weight: bold;
  color: #000;
}

.newsletter-description {
  font-family: 'Tahoma', sans-serif;
  font-size: 10px;
  color: #000;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-label {
  font-family: 'Tahoma', sans-serif;
  font-size: 10px;
  font-weight: bold;
  color: #000;
}

.form-input {
  padding: 0.25rem 0.5rem;
  border: 2px inset #c0c0c0;
  border-radius: 0;
  background: #fff;
  font-family: 'Tahoma', sans-serif;
  font-size: 10px;
  color: #000;
  outline: none;
}

.form-input:focus {
  border: 2px inset #808080;
}

.form-input.error {
  border: 2px inset #ff0000;
  background: #fff5f5;
}

.error-message {
  font-family: 'Tahoma', sans-serif;
  font-size: 9px;
  color: #ff0000;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}

.form-checkbox {
  margin-top: 0.125rem;
  width: 12px;
  height: 12px;
  accent-color: #000;
}

.checkbox-text {
  font-family: 'Tahoma', sans-serif;
  font-size: 9px;
  color: #000;
  line-height: 1.3;
}

.submit-button {
  padding: 0.25rem 1rem;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  border-radius: 0;
  font-family: 'Tahoma', sans-serif;
  font-size: 10px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  transition: all 0.1s ease;
  align-self: flex-start;
  min-height: 20px;
}

.submit-button:hover:not(.disabled) {
  background: #d0d0d0;
  border: 2px inset #c0c0c0;
}

.submit-button:active:not(.disabled) {
  background: #a0a0a0;
  border: 2px inset #808080;
  transform: translate(1px, 1px);
}

.submit-button.disabled {
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  color: #808080;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.message {
  margin-top: 1rem;
  padding: 0.5rem;
  font-family: 'Tahoma', sans-serif;
  font-size: 10px;
  border-radius: 0;
}

.message.success {
  background: #e0ffe0;
  border: 1px solid #00aa00;
  color: #008000;
}

.message.error {
  background: #ffe0e0;
  border: 1px solid #aa0000;
  color: #800000;
}

@media (max-width: 768px) {
  .newsletter-signup {
    margin: 1rem 0;
    padding: 0.75rem;
  }

  .submit-button {
    align-self: stretch;
    text-align: center;
  }
}
</style>
