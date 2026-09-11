<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const role = 'admin'
function login(){
    // console.log(typeof email.value)
    // console.log(typeof password.value)
    // console.log(email.value)
    // console.log(password.value)
    try{
        if (email.value == 'admin@email.com' && password.value == '123456') router.push({name :'admin_home'})
        else if ( email.value == 'evaluator@email.com' && password.value == '123456') router.push({name : 'evaluator_home'})
        else if ( email.value == 'evaluatee@email.com' && password.value == '123456') router.push({name : 'evaluatee_home'})
    }catch(e){
        console.log(e)
    }
   
}
</script>
<template>
    <div class="flex h-screen w-full justify-center items-center">
        <div class="bg-white w-xs h-auto  p-5 text-black  rounded flex flex-col gap-3
        jutify-conter items-center shadow-lg">
        Login
        <!-- input email -->
        <fieldset class="fieldset">
        <label class="label" for="email">email</label>
        <input type="email" v-model="email" id="email" placeholder="email" class="input w-70" />
        </fieldset>
        <!-- input password -->
        <fieldset class="fieldset">
        <label class="label" for="password">email</label>
        <input
         type="password" 
         v-model="password" 
         id="password" 
         placeholder="password" 
         class="input w-70" />
        </fieldset>

        <button class="btn btn-success w-full" @click="login">Success</button>
        <p class="text-sm">
        Don't have an account?
        <RouterLink class="link link-success" :to="{name:'register'}">Register</RouterLink>
        </p>
        </div>
    </div>
</template>