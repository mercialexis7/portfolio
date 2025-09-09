<template>
  <component :is="tag" v-if="tag" :content="content" :property="property" :name="name" :rel="rel" :href="href" />
</template>

<script>
export default {
  name: 'MetaTag',
  props: {
    tag: {
      type: String,
      required: true,
      validator: (value) => ['meta', 'link'].includes(value)
    },
    content: {
      type: String,
      default: ''
    },
    property: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    rel: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  }
}
</script>
