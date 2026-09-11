<script setup>
import navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidbar.vue'
</script>
<template>
    <navbar />

  <div class="flex">
    <Sidebar />

    <main class="flex-1 m-10">
      <RouterView />
    </main>
  </div>
</template>