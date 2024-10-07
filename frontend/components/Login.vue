<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="username" type="text" placeholder="Username" required class="input-field">
      <input v-model="password" type="password" placeholder="Password" required class="input-field">
      <button type="submit" class="submit-button">Login</button>
    </form>
  </div>
</template>

<script setup>

const username = ref('')
const password = ref('')
const config = useRuntimeConfig()

const login = async () => {
  try {
    const body = { username: username.value, password: password.value }
    const res = await fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 400) {
      throw error
    }
    const data = await res.json()
    localStorage.setItem('token', data.token)
    useRouter().push('/profile')
  } catch (err) {
    console.error('Login failed:', err)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>