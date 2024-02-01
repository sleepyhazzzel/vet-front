<template>
<VForm :disabled="isSubmitting" @submit.prevent="submit">
  <VCard elevated="6">
    <VToolbar>
      <VBtn icon="mdi-account-edit"></VBtn>
      <VToolbarTitle class="font-weight-light">修改管理員資料
      </VToolbarTitle>
      <VBtn icon @click="isEditing = !isEditing" class="text-end">
        <VFadeTransition leave-absolute>
          <VIcon v-if="isEditing" icon="mdi-close" />
          <VIcon v-else icon="mdi-pencil" />
        </VFadeTransition>
      </VBtn>
    </VToolbar>

    <VCardText v-if="isEditing">
      <VTextField
        :disabled="!isEditing"
        label="帳號" color="teal"
        v-model="account.value.value"
        :error-messages="account.errorMessage.value" />
      <VSelect
        :disabled="!isEditing"
        :items="['獸醫師', '護理師', '助理']"
        label="職稱" color="teal"
        v-model="position.value.value"
        :errror-messages="position.errorMessage.value" />
      <VTextField
        :disabled="!isEditing"
        label="密碼" color="teal"
        :type="visible ? 'text' : 'password'"
        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="visible = !visible"
        minlength="6" maxlength="20" counter
        hint="密碼長度：4 ~ 20 之間"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value" />
      <div class="text-end">
        <VBtn
          :disabled="!isEditing"
          @click="reset"
          color="teal" variant="text"
          class="mb-1 me-2">重設
        </VBtn>
        <VBtn
          :disabled="!isEditing"
          type="submit"
          color="teal"
          class="mb-1">確認
        </VBtn>
      </div>
    </VCardText>
    <VSnackbar
      v-model="hasSaved"
      :timeout="2000"
      attach
      position="absolute"
      location="bottom left">Your profile has been updated</VSnackbar>
  </VCard>
</VForm>
</template>
<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAdminStore } from '@/store/admin'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios-admin'

const visible = ref(false)
const hasSaved = ref(false)
const isEditing = ref(false)
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const admin = useAdminStore()

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

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  // initialValues 是表單的初始值
  // 這裡的 initialValues 是從 admin store 取得
  // 這樣就可以在這個表單中顯示 admin 的資料
  // 並且可以進行修改
  initialValues: {
    account: admin.account,
    position: admin.position
  }
})

const account = useField('account')
const position = useField('position')
const password = useField('password')

const reset = () => {
  resetForm({ values: {
    account: admin.account,
    position: admin.position
  } })
}

const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.patch('/admins/' + admin._id, {
      account: values.account,
      position: values.position,
      password: values.password
    })
    admin.login({
      account: values.account,
      position: values.position,
      _id: admin._id,
      token: admin.token
    })
    createSnackbar({
      text: '修改成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
  } catch (error) {
    console.log(error)
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
