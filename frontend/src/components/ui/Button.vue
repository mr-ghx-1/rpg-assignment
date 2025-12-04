<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()
</script>

<template>
  <button :class="['btn', variant || 'primary']" :type="type || 'button'" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}
.primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.secondary {
  background-color: white;
  border-color: var(--color-border);
  color: var(--color-text);
}
.secondary:hover:not(:disabled) {
  background-color: var(--color-bg);
}

.danger {
  background-color: var(--color-danger);
  color: white;
}
.danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.ghost {
  background-color: transparent;
  color: var(--color-text-muted);
}
.ghost:hover:not(:disabled) {
  background-color: rgba(0,0,0,0.05);
  color: var(--color-text);
}
</style>
