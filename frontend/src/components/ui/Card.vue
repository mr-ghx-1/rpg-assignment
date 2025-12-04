<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-md);
}
</style>
