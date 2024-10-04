<template>
    <div v-if="user">
      <h1>Welcome, {{ user.username }}!</h1>
      <p>Email: {{ user.email }}</p>
    </div>
  </template>
  
  <script setup>
  
  const config = useRuntimeConfig()
  const user = ref(null)
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${config.public.apiBase}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  
      if(res.status === 400) {
      throw  error
      }
      const data = await res.json() 
      user.value = data
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    }
  }
  onMounted(() => {
    fetchUser()
  })
  </script>