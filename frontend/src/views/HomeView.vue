<script setup lang="ts">
import Header from '../components/Header.vue'
import CreateBlog from '../components/CreateBlog.vue'
import BlogList from '../components/BlogList.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <div class="content-wrapper">
        <CreateBlog />
        <BlogList />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: var(--color-bg);
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
