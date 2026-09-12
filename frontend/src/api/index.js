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
    const status = err.response?.status
    const msg = err.response?.data?.message || 'เกิดข้อผิดพลาด'
    // 401 ที่หมายถึง token หมดอายุ/ไม่ถูกต้องเท่านั้น
    if (
      status === 401 &&
      err.response?.data?.code === 'TOKEN_EXPIRED'
    ) {
      localStorage.removeItem('bpes_token')
      window.location.href = '/login'
    }

    return Promise.reject(new Error(msg))
  }
)


export default api