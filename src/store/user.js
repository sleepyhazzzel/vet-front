// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()

  const token = ref('')
  const _id = ref('')
  const email = ref('')
  const user_name = ref('')
  const honorific = ref('先生')
  const phone = ref('')
  const national_id = ref('')

  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    _id.value = data._id
    email.value = data.email
    user_name.value = data.user_name
    honorific.value = data.honorific
    phone.value = data.phone
    national_id.value = data.national_id
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
    _id.value = ''
    email.value = ''
    user_name.value = ''
    honorific.value = ''
    phone.value = ''
    national_id.value = ''
  }
  return {
    token, _id, email, user_name, honorific, phone, national_id, login, logout, isLogin, getProfile
  }
}, {
  persist: {
    key: '48763',
    paths: ['token']
  }
})
