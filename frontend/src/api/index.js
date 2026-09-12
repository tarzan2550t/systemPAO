import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})



api.interceptors.request.use(config => {
  const token = localStorage.getItem('bpes_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})



api.interceptors.response.use(
  res => res.data,
  err => {
    const msg = err.response?.data?.message || 'เกิดข้อผิดพลาด'
    if (err.response?.status === 401) {
      localStorage.removeItem('bpes_token')
      window.location.href = '/login'
    }
    return Promise.reject(new Error(msg))
  }
)


export default api