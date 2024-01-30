<template>
<VContainer>
  <VRow>
    <VCol col="12">
      <VForm :disabled="isSubmitting" @submit.prevent="submit">
        <VTextField
          label="電子信箱" type="email" class="mb-3"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value">
        </VTextField>
        <VTextField
          label="密碼" class="mb-3"
          :type="visible ? 'text' : 'password'"
          :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="visible = !visible"
          hint="密碼長度：6 ~ 20 之間"
          minlength="6" maxlength="20" counter
          v-model="password.value.value"
          :error-messages="password.errorMessage.value">
        </VTextField>
        <VBtn type="submit" color="teal" block>登入</VBtn>
      </VForm>
    </VCol>
  </VRow>
</VContainer>
</template>

<script setup>
// 雖然 vee-validate 也可以驗證email
// 但是後端是用 validator 驗證
// 如果用不同驗證會出現前端通過，後端沒過的情況
import { ref } from 'vue'
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios' // 不用打副檔名
import { useUserStore } from '@/store/user'

const visible = ref(false)

const { api } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 定義註冊表單格式
const schema = yup.object({
  email: yup
    .string()
    .required('信箱為必填欄位')
    .test('isEmail', '信箱格式錯誤', (value) => { return validator.isEmail(value) }),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(6, '密碼長度過短')
    .max(20, '密碼長度過長')
})

// 先 useForm，再 useField
// isSubmitting 正在提交時
const { handleSubmit, isSubmitting } = useForm({
  // 跟上面的 schema 綁定
  validationSchema: schema
})
// useField('') 內容要與 schema 名稱相符
const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/users/login', {
      email: values.email,
      password: values.password
    })
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
    router.push('/account')
  } catch (error) {
    // ?. => 如果是 undefined 可以繼續往下讀取
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'error',
        location: 'bottom'
      }
    })
  }
})
</script>
