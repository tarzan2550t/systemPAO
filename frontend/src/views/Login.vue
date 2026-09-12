<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router, { redirectByRole } from '../router/index.js'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

async function handleLogin() {
  try {
    await auth.login( form.value.email, form.value.password )

    // console.log('role:', auth.user?.role)
    // console.log('purpose:', auth.frist_login)

    router.push( redirectByRole( auth.user?.role, auth.frist_login))

  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="bg-white w-xs h-auto p-5 text-black rounded flex flex-col gap-3 items-center shadow-lg">
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          Login
        </div>
        <!-- email -->
        <fieldset class="fieldset">
          <label class="label" for="email">email</label>
          <input
            type="email"
            v-model="form.email"
            id="email"
            placeholder="email"
            class="input w-70"
          />
        </fieldset>

        <!-- password -->
        <fieldset class="fieldset">
          <label class="label" for="password">password</label>
          <input
            type="password"
            v-model="form.password"
            id="password"
            placeholder="password"
            class="input w-70"
          />
        </fieldset>
        <button type="submit" class="btn btn-success w-full mt-3 mb-2">
          Login
        </button>

        <p class="text-sm">
          Don't have an account?

          <RouterLink
            class="link link-success"
            :to="{ name: 'register' }"
          >
            Register
          </RouterLink>
        </p>

      </form>

    </div>
  </div>
</template>