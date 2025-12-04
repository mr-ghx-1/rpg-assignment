<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const SIGNUP_MUTATION = gql`
  mutation Signup($authInput: AuthInput!) {
    signup(authInput: $authInput) {
      accessToken
      user {
        id
        username
      }
    }
  }
`

const { mutate: signup, onDone, onError } = useMutation(SIGNUP_MUTATION)

const handleSignup = () => {
  signup({
    authInput: {
      username: username.value,
      password: password.value,
    },
  })
}

onDone((result) => {
  const { accessToken, user } = result.data.signup
  authStore.setAuth(accessToken, user)
  router.push('/')
})

onError((error) => {
  alert(error.message)
})
</script>

<template>
  <div class="page-container">
    <div class="auth-container">
      <h1 class="app-title">rePurpose Blog</h1>
      <h2>Signup</h2>
      <form @submit.prevent="handleSignup">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <router-link to="/login" class="login-link">Login</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.app-title {
  margin-bottom: 2rem;
  color: #2c3e50;
  font-size: 2.5rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #42b883;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3aa876;
}

.login-link {
  color: #42b883;
  text-decoration: underline;
  font-weight: bold;
}

.login-link:hover {
  color: #3aa876;
}
</style>
