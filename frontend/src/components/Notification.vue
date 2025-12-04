<script setup lang="ts">
import { useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'

const message = ref('')
const visible = ref(false)

const BLOG_ADDED_SUBSCRIPTION = gql`
  subscription BlogAdded {
    blogAdded {
      author {
        username
      }
    }
  }
`

const { onResult } = useSubscription(BLOG_ADDED_SUBSCRIPTION)

onResult((result) => {
  if (result.data?.blogAdded) {
    message.value = `New post by ${result.data.blogAdded.author.username}`
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 3000)
  }
})
</script>

<template>
  <div v-if="visible" class="notification">
    {{ message }}
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
