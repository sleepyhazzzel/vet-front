// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()

  const token = ref('')
  const email = ref('')

  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    email.value = data.email
  }

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  const getProfile = async () => {
    if (token.value.length === 0) {
      return
    }
    try {
      const { data } = await apiAuth.get('/users/me')
      login(data.result)
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    token.value = ''
    email.value = ''
  }
  return {
    token, email, login, logout, isLogin, getProfile
  }
}, {
  persist: {
    key: '48763',
    paths: ['token']
  }
})
