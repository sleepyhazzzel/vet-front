<template>
<VForm :disabled="isSubmitting" @submit.prevent="submit">
  <VCard elevated="6">
    <VToolbar>
      <VBtn icon="mdi-account-plus" />
      <VToolbarTitle class="font-weight-light">新增管理員</VToolbarTitle>
      <VBtn icon @click="isEditing = !isEditing" class="text-end">
        <VFadeTransition leave-absolute>
          <VIcon v-if="isEditing" icon="mdi-close" />
          <VIcon v-else icon="mdi-pencil" />
        </VFadeTransition>
      </VBtn>
    </VToolbar>
    <VCardText v-if="isEditing">
      <VTextField
        label="管理員帳號" color="teal"
        minlength="2" maxlength="20" counter
        hint="只能使用英數字，帳號長度 2 ~ 20 之間"
        v-model="account.value.value"
        :error-messages="account.errorMessage.value" />
      <VSelect
        label="職稱" color="teal"
        :items="['獸醫師', '護理師', '助理']"
        v-model="position.value.value"
        :errror-messages="position.errorMessage.value" />
      <VTextField
        label="密碼" color="teal"
        :type="visible ? 'text' : 'password'"
        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="visible = !visible"
        minlength="4" maxlength="20" counter
        hint="密碼長度 4 ~ 20 之間"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value" />
      <div class="text-end">
        <VBtn type="submit" color="teal" class="mb-1">新增管理員</VBtn>
      </div>
    </VCardText>
  </VCard>
</VForm>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios-admin'

const visible = ref(false)
const isEditing = ref(false)
const { api } = useApi()
const createSnackbar = useSnackbar()
const emit = defineEmits(['update'])

const schema = yup.object({
  account: yup
    .string()
    .required('帳號為必填欄位')
    .min(2, '使用者帳號過短')
    .max(20, '使用者帳號過長')
    .matches(/^.[A-Za-z0-9]+$/, '只能使用英數字', { excludeEmptyString: true }),
  position: yup
    .string()
    .required('職稱為必填欄位'),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度過短')
    .max(20, '密碼長度過長')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
const account = useField('account')
const position = useField('position')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/admins', {
      account: values.account,
      position: values.position,
      password: values.password
    })
    emit('update')
    createSnackbar({
      text: '新增成功',
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
