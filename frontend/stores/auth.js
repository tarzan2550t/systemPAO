import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api'

export const useAuthStore = defineStore('auth' , ()=>{
    const token = ref(localStorage.getItem('bpes_token') || null)
    const user = ref(null)
    const frist_login = ref(null)

    const isLoggedIn  = computed(() => !!token.value)
    const isAdmin     = computed(() => user.value?.role === 'admin')
    const isEvaluator = computed(() => user.value?.role === 'evaluator')
    const isEvaluatee = computed(() => user.value?.role === 'evaluatee')

    async function login (email , password ){

        const res = await api.post('/auth/login' , {email , password})
        // console.log(res)
        token.value = res.token
        user.value = res.payload
        frist_login.value = res.purpose
        localStorage.setItem('bpes_token' , token.value)
    }
    
    
    async function fetchMe() {
    if (!token.value) return
        try {
        const res = await api.get('/auth/me')
        user.value = res
        } catch {
        logout()
        }
    }
    function logout() {
        token.value = null
        user.value  = null
        localStorage.removeItem('bpes_token')
    }
     return { token, user, isLoggedIn, isAdmin, isEvaluator, isEvaluatee, frist_login, login, fetchMe, logout }
})
