<script setup>
import { ref } from 'vue'
import router , {redirectByRole} from '../router/index.js'
import { useAuthStore } from '../stores/auth.js'


const auth = useAuthStore()
const form = ref({ email : '' , password : ''})
async function handleLogin(){

    try{
        await auth.login(form.value.email , form.value.password)
        router.push(redirectByRole(auth.user?.role , auth.frist_login ))

    }catch(e){
        console.log(e)
    }
   
}
</script>
<template>
    <div class="flex h-screen w-full justify-center items-center">
        <div class="bg-white w-xs h-auto  p-5 text-black  rounded flex flex-col gap-3
        jutify-conter items-center shadow-lg">
        <form @submit.prevent="handleLogin">
        Login
        <!-- input email -->
        <fieldset class="fieldset">
        <label class="label" for="email">email</label>
        <input type="email" v-model="form.email" id="email" placeholder="email" class="input w-70" />
        </fieldset>
        <!-- input password -->
        <fieldset class="fieldset">
        <label class="label" for="password">email</label>
        <input
         type="password" 
         v-model="form.password" 
         id="password" 
         placeholder="password" 
         class="input w-70" />
        </fieldset>

        <button type="submit" class="btn btn-success w-full mt-3 mb-2">Success</button>
        <p class="text-sm">
        Don't have an account?
        <RouterLink class="link link-success" :to="{name:'register'}">Register</RouterLink>
        </p>
        </form>
        </div>
    </div>
</template>