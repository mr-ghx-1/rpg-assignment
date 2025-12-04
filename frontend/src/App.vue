<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useNotificationStore } from './stores/notifications'
import { ref } from 'vue'

const notificationStore = useNotificationStore()
const toastMessage = ref('')
const showToast = ref(false)

const BLOG_ADDED_SUBSCRIPTION = gql`
  subscription BlogAdded {
    blogAdded {
      title
      author {
        username
      }
      createdAt
    }
  }
`

const { onResult } = useSubscription(BLOG_ADDED_SUBSCRIPTION)

onResult((result) => {
  if (result.data?.blogAdded) {
    const { title, author, createdAt } = result.data.blogAdded
    const message = `New post: "${title}" by ${author.username}`
    
    // Add to store
    notificationStore.addNotification(message)
    
    // Show toast
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }
})
</script>

<template>
  <RouterView />
  
  <Transition name="toast">
    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </Transition>
</template>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--color-text);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: 1000;
  font-weight: 500;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
