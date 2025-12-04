<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'
import { useRouter } from 'vue-router'
import Button from './ui/Button.vue'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const router = useRouter()
const showNotifications = ref(false)
const notificationWrapper = ref<HTMLElement | null>(null)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    notificationStore.markAllAsRead()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (notificationWrapper.value && !notificationWrapper.value.contains(event.target as Node)) {
    showNotifications.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <h1>rePurpose Blog</h1>
      </div>

      <div class="actions">
        <div class="notification-wrapper" ref="notificationWrapper">
          <button class="icon-btn" @click="toggleNotifications">
            <!-- Bell Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span v-if="notificationStore.unreadCount > 0" class="badge"></span>
          </button>

          <div v-if="showNotifications" class="notification-dropdown">
            <div class="dropdown-header">
              <h3>Notifications</h3>
              <button class="text-btn" @click="notificationStore.clearNotifications">Clear all</button>
            </div>
            <div class="notification-list">
              <div v-if="notificationStore.notifications.length === 0" class="empty-state">
                No notifications
              </div>
              <div v-for="notification in notificationStore.notifications" :key="notification.id" class="notification-item" :class="{ unread: !notification.read }">
                <p class="message">{{ notification.message }}</p>
                <span class="time">{{ new Date(notification.timestamp).toLocaleTimeString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="user-info">
          <span class="username">{{ authStore.user?.username }}</span>
          <Button variant="secondary" @click="logout">Logout</Button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: white;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.notification-wrapper {
  position: relative;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  color: var(--color-text-muted);
  transition: all 0.2s;
  position: relative;
}

.icon-btn:hover {
  background-color: var(--color-bg);
  color: var(--color-text);
}

.badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background-color: var(--color-danger);
  border-radius: 50%;
  border: 2px solid white;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: -80px; /* Adjust to align better */
  margin-top: 0.5rem;
  width: 320px;
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-header h3 {
  font-size: 1rem;
}

.text-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  cursor: pointer;
}
.text-btn:hover {
  color: var(--color-primary);
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: var(--color-bg);
}

.notification-item.unread {
  background-color: rgba(99, 102, 241, 0.05); /* Light Indigo */
}

.message {
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-weight: 500;
}
</style>
