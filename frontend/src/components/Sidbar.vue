<script setup>
import {computed} from 'vue'
import {useAuthStore} from '../stores/auth.js'
import {useRouter} from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const sidebarMenus = computed(() => {
  return router.getRoutes().filter(route => {
    return (
      route.meta.showInSidebar &&
      route.meta.role === authStore.user?.role
    )
  })
})
</script>
<template>

  <input id="my-drawer-1" type="checkbox" class="drawer-toggle" />
  <div class="drawer-side top-16">
    <label for="my-drawer-1" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 min-h-full w-50 p-4">
      <!-- Sidebar content here -->
    <li v-for="menu in sidebarMenus" :key="menu.name" >
      <RouterLink :to="menu.path">{{ menu.meta.title }}</RouterLink>
    </li>

    </ul>
  </div>

</template>