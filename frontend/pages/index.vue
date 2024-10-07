<template>
  <div class="container">
    <h1>{{ welcomeMessage }}</h1>
    <div class="links">
      <nuxt-link class="link" to="/login">Login</nuxt-link>
      <nuxt-link class="link" to="/register">Register</nuxt-link>
    </div>
  </div>
</template>
  
  <script setup>
  
  const welcomeMessage = ref('')
  
  onMounted(() => {
   welcomeMessage.value = 'Welcome to our app!'
  })
  </script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.links {
  display: flex;
  gap: 15px;
}

.link {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.link:hover {
  background-color: #0056b3;
}
</style>