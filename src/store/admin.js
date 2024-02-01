// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/axios-admin'

export const useAdminStore = defineStore('admin', () => {
  const { apiAuth } = useApi()

  const token = ref('')
  const _id = ref('')
  const account = ref('')
  const position = ref('')

  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    _id.value = data._id
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
    _id.value = ''
    account.value = ''
    position.value = ''
  }

  return {
    token, _id, account, position, login, isAdminLogin, getProfile, logout
  }
}, {
  persist: {
    key: '48763',
    paths: ['token']
  }
})
