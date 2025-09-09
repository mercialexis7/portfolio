<template>
  <div class="blog-post">
    <div class="blog-header">
      <h1 class="blog-title">{{ $t('windows.documents.goAllIn.title') }}</h1>
      <div class="blog-meta">
        <span class="blog-date">September 9, 2025</span>
        <span class="blog-author">by A</span>
      </div>
    </div>

    <div class="blog-content">
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextFirstParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextSecondParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextThirdParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextFourthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextFifthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextSixthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextSeventhParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextEighthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextNinthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.goAllIn.contextFinalParagraph') }}</p>
    </div>

    <ShareButtons
      :title="$t('windows.documents.goAllIn.title')"
      :url="currentUrl"
    />

    <NewsletterSignup />
  </div>
</template>

<script>
import ShareButtons from '@/components/ShareButtons.vue'
import NewsletterSignup from '@/components/NewsletterSignup.vue'

export default {
  name: 'GoAllIn',
  components: {
    ShareButtons,
    NewsletterSignup
  },
  computed: {
    currentUrl() {
      return window.location.href
    }
  }
}
</script>

<style scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1rem;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.blog-content {
  line-height: 1.8;
  color: #333;
}

.blog-paragraph {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.blog-paragraph:last-child {
  margin-bottom: 0;
}
</style>
