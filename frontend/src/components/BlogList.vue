<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import Card from './ui/Card.vue'

const GET_BLOGS_QUERY = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      createdAt
      author {
        username
      }
    }
  }
`

const BLOG_ADDED_SUBSCRIPTION = gql`
  subscription BlogAdded {
    blogAdded {
      id
      title
      content
      createdAt
      author {
        username
      }
    }
  }
`

const { result, subscribeToMore } = useQuery(GET_BLOGS_QUERY)
const blogs = computed(() => result.value?.blogs ?? [])

subscribeToMore({
  document: BLOG_ADDED_SUBSCRIPTION,
  updateQuery: (previousResult, { subscriptionData }) => {
    if (!subscriptionData.data) return previousResult
    const newBlog = subscriptionData.data.blogAdded
    if (previousResult.blogs.find((b: any) => b.id === newBlog.id)) return previousResult
    return {
      blogs: [newBlog, ...previousResult.blogs],
    }
  },
})
</script>

<template>
  <div class="blog-list">
    <Card v-for="blog in blogs" :key="blog.id" class="blog-item">
      <div class="blog-header">
        <h2 class="blog-title">{{ blog.title }}</h2>
        <div class="blog-meta">
          <span class="author">By {{ blog.author.username }}</span>
          <span class="separator">•</span>
          <span class="date">{{ new Date(blog.createdAt).toLocaleString() }}</span>
        </div>
      </div>
      <div class="blog-content">
        <p>{{ blog.content }}</p>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-header {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.blog-title {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.blog-meta {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-content {
  color: var(--color-text);
  line-height: 1.6;
}
</style>
