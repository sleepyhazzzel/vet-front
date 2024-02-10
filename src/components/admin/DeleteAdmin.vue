<template>
<VForm :disabled="isSubmitting" @submit.prevent="submit">
  <VCard elevated="6">
    <VToolbar>
      <VBtn icon="mdi-account-minus"></VBtn>
      <VToolbarTitle class="font-weight-light">刪除管理員
      </VToolbarTitle>
      <VBtn icon @click="isEditing = !isEditing" class="text-end">
        <VFadeTransition leave-absolute>
          <VIcon v-if="isEditing" icon="mdi-close" />
          <VIcon v-else icon="mdi-pencil" />
        </VFadeTransition>
      </VBtn>
    </VToolbar>

    <VCardText v-if="isEditing">
      <VAlert
        variant="tonal"
        color="error"
        border="start"
        icon="mdi-alert-circle-outline"
        text="刪除後無法復原，請謹慎操作"
        class="mb-3" />
      <VSelect
        label="帳號"
        :items="selectItems"
        :item-props="true"
        v-model="account.value.value"
        :error-messages="account.errorMessage.value" />
      <VTextField
        label="密碼" color="teal"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        :type="visible ? 'text' : 'password'"
        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="visible = !visible"
        hint="請輸入已選擇管理員之密碼" />
      <VRow>
        <VCol class="d-flex">
          <VCheckbox
            label="確認刪除"
            color="teal"
            density="compact"
            v-model="checkbox.value.value"
            :error-messages="checkbox.errorMessage.value" />
          <VBtn text="刪除" color="teal" />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</VForm>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { api } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const selectItems = ref([])
const isEditing = ref(false)
const visible = ref(false)
const createSnackbar = useSnackbar()
const emit = defineEmits(['delete'])

onMounted(async () => {
  try {
    const { data } = await api.get('/admins')
    selectItems.value = data.result.map(admin => ({
      title: admin.account,
      subtitle: admin.position
    }))
  } catch (error) {
    console.log(error)
  }
})

const schema = yup.object({
  account: yup
    .string()
    .required('帳號為必填'),
  password: yup
    .string()
    .required('密碼為必填'),
  checkbox: yup
    .boolean()
    .required('請確認刪除')
    .oneOf([true], '請確認刪除')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const account = useField('account')
const password = useField('password')
const checkbox = useField('checkbox')

const submit = handleSubmit(async (values) => {
  try {
    const ID = await api.get('/admins/getid', {
      account: values.account,
      password: values.password
    })
    await api.delete('/admins/' + ID.result._id)
    emit('delete')
    createSnackbar({
      text: '刪除成功',
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
