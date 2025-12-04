<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'
import Card from './ui/Card.vue'

const title = ref('')
const content = ref('')

const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog($title: String!, $content: String!) {
    createBlog(title: $title, content: $content) {
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

const { mutate: createBlog, onDone } = useMutation(CREATE_BLOG_MUTATION)

const handleSubmit = () => {
  if (!title.value.trim() || !content.value.trim()) return
  createBlog({ title: title.value, content: content.value })
}

onDone(() => {
  title.value = ''
  content.value = ''
})
</script>

<template>
  <Card>
    <div class="create-blog">
      <h3>Create New Post</h3>
      <form @submit.prevent="handleSubmit" class="form">
        <Input v-model="title" placeholder="Enter post title..." required />
        <Input v-model="content" placeholder="What's on your mind?" multiline required />
        <div class="actions">
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  </Card>
</template>

<style scoped>
.create-blog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
