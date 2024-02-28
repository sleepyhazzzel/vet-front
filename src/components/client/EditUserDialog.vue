<template>
  <VBtn
    append-icon="mdi-pencil"
    color="teal" variant="tonal"
    rounded
    @click="openDialog">編輯
  </VBtn>
  <VDialog v-model="dialog" :width="500" persistent>
    <VCard>
      <VForm :disabled="isSubmitting" @submit.prevent="submit">
        <VCardText>
          <div class="text-h6 mx-2 my-3">編輯使用者資料</div>
          <VRow class="py-3">
            <VCol cols="12" md="6" class="py-0">
              <VTextField
                label="姓名"
                v-model="user_name.value.value"
                :error-messages="user_name.errorMessage.value"
                color="teal" variant="solo-filled" flat rounded="lg" />
            </VCol>
            <VCol cols="12" md="6" class="py-0">
              <VSelect
                label="稱謂"
                :items="['先生', '女士']"
                color="teal" variant="solo-filled" flat         rounded="lg"
                v-model="honorific.value.value"
                :error-messages="honorific.errorMessage.value" />
            </VCol>
          </VRow>
          <VTextField
            label="身分證字號"
            color="teal" variant="solo-filled" flat rounded="lg"
            v-model="national_id.value.value"
            :error-messages="national_id.errorMessage.value" />
          <VTextField
            label="電子信箱" type="email"
            color="teal" variant="solo-filled" flat rounded="lg"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value" />
          <VTextField
            label="手機號碼" type="tel"
            color="teal" variant="solo-filled" flat rounded="lg"
            v-mask="'####-###-###'"
            v-model="phone.value.value"
            :error-messages="phone.errorMessage.value" />
          <VTextField
            label="住址"
            color="teal" variant="solo-filled" flat rounded="lg"
            v-model="address.value.value"
            :error-messages="address.errorMessage.value" />
          <div class="text-end mb-3">
            <VBtn
              color="teal"
              variant="text"
              class="me-3"
              @click="dialog = false">取消
            </VBtn>
            <VBtn type="submit" color="teal">儲存</VBtn>
          </div>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { isNationalIdentificationNumberValid } from 'taiwan-id-validator'
import { mask as vMask } from 'vue-the-mask'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const dialog = ref(false)
const user = useUserStore()
const createSnackbar = useSnackbar()
const { apiAuth } = useApi()

const openDialog = () => {
  dialog.value = true
}

const schema = yup.object({
  user_name: yup
    .string()
    .required('必填'),
  honorific: yup
    .string()
    .required('必填'),
  national_id: yup
    .string()
    .required('必填')
    .test('isNI', '身分證格式錯誤', (value) => { return isNationalIdentificationNumberValid(value) }),
  email: yup
    .string()
    .required('必填')
    .test('isEmail', '信箱格式錯誤', (value) => { return validator.isEmail(value) }),
  phone: yup
    .string()
    .required('必填')
    .test('isPhone', '手機號碼格式錯誤', (value) => {
      value = value.replace(/-/g, '')
      return validator.isMobilePhone(value, 'zh-TW')
    }),
  address: yup
    .string()
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const user_name = useField('user_name')
const honorific = useField('honorific')
const national_id = useField('national_id')
const email = useField('email')
const phone = useField('phone')
const address = useField('address')

onMounted(() => {
  user_name.value.value = user.user_name
  honorific.value.value = user.honorific
  national_id.value.value = user.national_id
  email.value.value = user.email
  phone.value.value = user.phone
  address.value.value = user.address
})

const submit = handleSubmit(async (values) => {
  values.phone = values.phone.replace(/-/g, '')
  await apiAuth.patch(`/users/${user._id}`, values)
  user.login(values)
  createSnackbar({
    text: '更新成功',
    showCloseButton: false,
    snackbarProps: {
      timeout: 2000,
      color: 'success',
      location: 'bottom'
    }
  })
})
</script>
