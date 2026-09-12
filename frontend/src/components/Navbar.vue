<script setup>
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useAuthStore()

function handleLogout(){
    // console.log('ทำงาน')
    auth.logout()
    //  console.log('after logout')
    router.push({name :'login'})
}
</script>
<template>
  <div class="navbar bg-base-100 shadow-sm">

    <!-- Left: Menu -->
    <div class="flex-none">
      <label
        for="my-drawer-1"
        class="btn btn-square btn-ghost"
      >
        <svg
          aria-label="Menu"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>

    <!-- Center -->
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>

    <!-- Right: Dropdown -->
    <div class="flex-none">
      <div class="dropdown dropdown-end">

        <div
          tabindex="0"
          role="button"
          class="btn btn-square btn-ghost"
        >
          <svg
            aria-label="More"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>

        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a>Profile</a></li>
          <li><a @click="handleLogout">Logout</a></li>
        </ul>

      </div>
    </div>

  </div>
</template>