<template>
  <div class="blog-post">
    <div class="blog-header">
      <h1 class="blog-title">{{ $t('windows.documents.000: origin memory.title') }}</h1>
      <div class="blog-meta">
        <span class="blog-date">August 20, 2025</span>
        <span class="blog-author">by A</span>
      </div>
    </div>

    <div class="blog-content">
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextFirstParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextSecondParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextThirdParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextFourthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextFifthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextSixthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextSeventhParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextEighthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextNinthParagraph') }}</p>
      <p class="blog-paragraph">{{ $t('windows.documents.000: origin memory.contextTenthParagraph') }}</p>

      <div class="blog-signature">
        <p>{{ $t('windows.documents.000: origin memory.secondTitle') }}</p>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue'

export default {
  name: 'OriginMemory',
  components: {
    BackToTop
  }
}
</script>

<style scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Times New Roman', serif;
  line-height: 1.5;
  color: #333;
}

@media (min-width: 768px) {
  .blog-post {
    padding: 2rem;
  }
}

.blog-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .blog-header {
    margin-bottom: 2rem;
  }
}

.blog-title {
  font-size: 1.25rem;
  font-weight: normal;
  margin: 0 0 0.75rem 0;
  color: #000;
  text-align: center;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .blog-title {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
  }
}

.blog-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (min-width: 768px) {
  .blog-meta {
    gap: 2rem;
    font-size: 0.9rem;
  }
}

.blog-content {
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .blog-content {
    font-size: 0.95rem;
  }
}

.blog-paragraph {
  margin-bottom: 1rem;
  text-align: justify;
}

@media (min-width: 768px) {
  .blog-paragraph {
    margin-bottom: 1.25rem;
  }
}

.blog-paragraph:first-letter {
  font-size: 1rem;
  float: none;
  margin-right: 0;
  margin-top: 0;
  line-height: inherit;
  color: inherit;
}

.blog-signature {
  margin-top: 2rem;
  text-align: right;
  font-style: italic;
  color: #666;
}

@media (min-width: 768px) {
  .blog-signature {
    margin-top: 3rem;
  }
}
</style>
