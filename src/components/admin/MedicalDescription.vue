<template>
  <VDialog :width="800" v-model="dialog" persistent>
    <VCard>
      <VForm :disabled="isSubmitting" @submit.prevent="submit">
        <VCardText>
          <div class="text-h6 mx-2 my-3">診療紀錄</div>
          <VMenu
            v-model="isMenuOpen"
            :close-on-content-click="false">
            <template #activator="{ props }">
              <VTextField
                label="出生日期"
                :model-value="selectedDate"
                color="teal"
                readonly
                v-bind="props" />
            </template>
            <VDatePicker
              @input="isMenuOpen = false"
              v-model="DateValue"
              height="430px"
              color="teal" />
          </VMenu>
          <VTextarea
            label="描述"
            color="teal"
            v-model="description.value.value"
            :error-messages="description.errorMessage.value" />
          <div class="text-end mb-2">
            <VBtn :disabled="isSubmitting" variant="text" @click="closeDialog">取消</VBtn>
            <VBtn type="submit" color="teal">
              {{ dialogId === '' ? '新增': '送出'}}
            </VBtn>
          </div>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios-admin'
import { useRoute } from 'vue-router'

const dialog = ref(false)
// 表單對話框正在編輯商品 ID，空值為新增商品
const dialogId = ref('')
const isMenuOpen = ref(false)
const DateValue = ref(null)
const createSnackbar = useSnackbar()
const { api } = useApi()
const route = useRoute()
const emit = defineEmits(['update'])

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: {
    description: yup
      .string()
      .required('描述為必填欄位')
  }
})

const description = useField('description')

const openDialog = (item) => {
  if (item) {
    dialogId.value = item._id
    DateValue.value = new Date(item.date)
    description.value.value = item.description
  } else {
    dialogId.value = ''
    DateValue.value = new Date()
  }
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  DateValue.value = new Date()
  resetForm()
}

const selectedDate = computed(() => {
  if (!DateValue.value) return null
  return DateValue.value.toLocaleDateString()
})

const submit = handleSubmit(async (values) => {
  try {
    if (dialogId.value === '') {
      await api.post('/pets/medical/' + route.params.id, {
        date: selectedDate.value,
        description: values.description
      })
    } else {
      await api.patch('/pets/medical/' + dialogId.value, {
        date: selectedDate.value,
        description: values.description
      })
    }
    emit('update')
    dialog.value = false
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

// 透過 defineExpose 來將 openDialog 方法暴露給父元件
defineExpose({ openDialog })
</script>

<style scoped lang="sass">
:deep(.v-picker__header)
  display: none
</style>
