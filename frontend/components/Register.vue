<template>
  <form @submit.prevent="register">
    <input v-model="username" type="text" placeholder="Username" required>
    <input v-model="email" type="email" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Register</button>
  </form>
</template>

<script setup>

const username = ref('')
const email = ref('')
const password = ref('')
const config = useRuntimeConfig()

const register = async () => {
  try {
    const body = { username: username.value, email: email.value, password: password.value }

    const res = await fetch(`${config.public.apiBase}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 400) {
      throw error
    }
    useRouter().push('/login')
  } catch (err) {
    console.error('Registration failed:', err)
  }
}
</script>