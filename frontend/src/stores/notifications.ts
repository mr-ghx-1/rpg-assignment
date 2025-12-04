import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Notification {
    id: number
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: Date
    read: boolean
}

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([])

    const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

    const addNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
        notifications.value.unshift({
            id: Date.now(),
            message,
            type,
            timestamp: new Date(),
            read: false
        })
    }

    const markAllAsRead = () => {
        notifications.value.forEach(n => n.read = true)
    }

    const clearNotifications = () => {
        notifications.value = []
    }

    return {
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotifications
    }
})
