<template>
<VContainer>
  <VForm :disabled="isSubmitting" @submit.prevent="submit">
    <VRow>
      <VCol cols="6" class="py-0">
        <VTextField
          label="姓名" type="text"
          color="teal" variant="solo-filled" flat rounded="lg"
          v-model="user_name.value.value"
          :error-messages="user_name.errorMessage.value" />
      </VCol>
      <VCol cols="6" class="py-0">
        <VSelect
          label="稱謂"
          :items="['先生', '女士']"
          color="teal" variant="solo-filled" flat rounded="lg"
          v-model="honorific.value.value"
          :error-messages="honorific.errorMessage.value" />
      </VCol>
      <VCol cols="12" class="py-0">
        <VTextField
          label="身分證字號" type="text"
          color="teal" variant="solo-filled" flat rounded="lg"
          v-model="national_id.value.value"
          :error-messages="national_id.errorMessage.value" />
      </VCol>
      <VCol cols="12" class="py-0">
        <VTextField
          label="電子信箱" type="email"
          color="teal" variant="solo-filled" flat rounded="lg"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value" />
      </VCol>
      <VCol cols="12" class="py-0">
        <VTextField
          label="手機號碼" type="tel"
          color="teal" variant="solo-filled" flat rounded="lg"
          v-mask="'####-###-###'"
          v-model="phone.value.value"
          :error-messages="phone.errorMessage.value" />
      </VCol>
      <VCol cols="6" class="py-0">
        <VTextField
          label="密碼" type="password"
          color="teal" variant="solo-filled" flat rounded="lg"
          hint="密碼長度：6 - 20"
          minlength="6" maxlength="20" counter
          v-model="password.value.value"
          :error-messages="password.errorMessage.value" />
      </VCol>
      <VCol cols="6" class="py-0">
        <VTextField
          label="確認密碼" type="password"
          color="teal" variant="solo-filled" flat rounded="lg"
          minlength="6" maxlength="20" counter
          v-model="passwordConfirm.value.value"
          :error-messages="passwordConfirm.errorMessage.value" />
      </VCol>
      <VCol cols="12">
        <VBtn type="submit" color="teal" block rounded size="large">註冊</VBtn>
      </VCol>
    </VRow>
  </VForm>
</VContainer>
</template>

<script setup>
// 雖然 vee-validate 也可以驗證email
// 但是後端是用 validator 驗證
// 如果用不同驗證會出現前端通過，後端沒過的情況
import validator from 'validator'
import { isNationalIdentificationNumberValid } from 'taiwan-id-validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { mask as vMask } from 'vue-the-mask'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios' // 不用打副檔名

const { api } = useApi()
const createSnackbar = useSnackbar()

// 定義註冊表單格式
const schema = yup.object({
  user_name: yup
    .string()
    .required('姓名為必填欄位'),
  honorific: yup
    .string()
    .required('稱謂為必填欄位'),
  national_id: yup
    .string()
    .required('身分證為必填欄位')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證function)
    .test('isNI', '身分證格式錯誤', (value) => { return isNationalIdentificationNumberValid(value) }),
  email: yup
    .string()
    .required('信箱為必填欄位')
    .test('isEmail', '信箱格式錯誤', (value) => { return validator.isEmail(value) }),
  phone: yup
    .string()
    .required('手機號碼為必填欄位')
    .test('isPhone', '手機號碼格式錯誤', (value) => {
      value = value.replace(/-/g, '')
      return validator.isMobilePhone(value, 'zh-TW')
    }),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(6, '密碼長度過短')
    .max(20, '密碼長度過長'),
  passwordConfirm: yup
    .string()
    .required('密碼為必填欄位')
    .min(6, '密碼長度過短')
    .max(20, '密碼長度過長')
    // .oneOf() 只允許符合陣列其中一個值
    // .oneOf(陣列, 錯誤訊息)
    // .ref('password') => schema 中的 password
    .oneOf([yup.ref('password')], '密碼不一致')
})

// 先 useForm，再 useField
// isSubmitting 正在提交時
const { handleSubmit, isSubmitting } = useForm({
  // 跟上面的 schema 綁定
  validationSchema: schema
})
// useField('') 內容要與 schema 名稱相符
const user_name = useField('user_name')
const honorific = useField('honorific')
const national_id = useField('national_id')
const email = useField('email')
const phone = useField('phone')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
const emit = defineEmits([''])

const submit = handleSubmit(async (values) => {
  try {
    values.phone = values.phone.replace(/-/g, '')
    await api.post('/users', {
      user_name: values.user_name,
      honorific: values.honorific,
      national_id: values.national_id,
      email: values.email,
      phone: values.phone,
      password: values.password
    })
    emit('submitForm')
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
  } catch (error) {
    console.log(error)
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
