import axios from 'axios'
import { useAdminStore } from '@/store/admin'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

apiAuth.interceptors.request.use(config => {
  const admin = useAdminStore()
  config.headers.Authorization = 'Bearer ' + admin.token
  return config
})

apiAuth.interceptors.response.use((res) => {
  return res
}, async (error) => {
  // 如桌拜有收到回應
  if (error.response) {
    // 如果是 jwt 過期，且不是舊換新請求
    if (error.response.data.message === 'JWT過期' && error.config.url !== '/admins/extend') {
      const admin = useAdminStore()
      // 傳送舊換新請求
      try {
        const { data } = await apiAuth.patch('/admins/extend')
        // 更新 pinia 保存 token
        admin.token = data.result
        // 修改發生錯誤的原請求設定 jwt
        error.config.headers.Authorization = 'Bearer ' + admin.token
        return await axios(error.config)
      } catch {
        // 如果舊換新失敗，登出
        admin.logout()
        return await Promise.reject(error)
      }
    }
  }
  // 如果請求沒回應，或不是過期的錯誤，回傳原錯誤到呼叫的地方
  return Promise.reject(error)
})

export const useApi = () => {
  return { api, apiAuth }
}
