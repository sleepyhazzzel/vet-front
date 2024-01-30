// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/axios-admin'

export const useAdminStore = defineStore('admin', () => {
  const { apiAuth } = useApi()

  const token = ref('')
  const account = ref('')
  const position = ref('')

  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    account.value = data.account
    position.value = data.position
  }

  const isAdminLogin = computed(() => {
    return token.value.length > 0
  })

  const getProfile = async () => {
    if (token.value.length === 0) {
      return
    }
    try {
      const { data } = await apiAuth.get('/admins/me')
      login(data.result)
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    token.value = ''
    account.value = ''
    position.value = ''
  }

  return {
    token, account, position, login, isAdminLogin, getProfile, logout
  }
}, {
  persist: {
    key: '48763',
    paths: ['token']
  }
})
