<template>
  <VDialog :width="500" v-model="dialog">
    <template #activator="{ props }">
      <VBtn
        color="teal"
        density="compact"
        variant="text"
        class="align-self-start"
        v-bind="props">查詢已註冊帳號
      </VBtn>
    </template>
    <VCard>
      <VForm :disabled="isSubmitting" @submit.prevent="search">
        <VCardText>
          <div class="text-h6 mx-2 my-3">查詢已註冊帳號</div>
          <VTextField
            label="身分證字號"
            color="teal"
            v-model="national_id.value.value"
            :error-messages="national_id.errorMessage.value" />
          <div class="text-end">
            <VBtn type="submit" color="teal" class="mb-3">查詢</VBtn>
          </div>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/axios-admin'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { isNationalIdentificationNumberValid } from 'taiwan-id-validator'

const dialog = ref(false)
const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    national_id: yup
      .string()
      .test('isNI', '身分證格式錯誤', (value) => { return isNationalIdentificationNumberValid(value) })
  }
})

const national_id = useField('national_id')

const search = handleSubmit(async (values) => {
  try {
    const { data } = await apiAuth.get('/users/search', {
      params: {
        national_id: values.national_id
      }
    })
    dialog.value = false
    user.login(data.result)
    createSnackbar({
      text: '查詢成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
  } catch (error) {
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
