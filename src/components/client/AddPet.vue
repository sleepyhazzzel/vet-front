<template>
  <VBtn
    color="teal" variant="tonal"
    class="mt-1" rounded
    append-icon="mdi-plus-circle-outline"
    @click="openDialog">新增寵物
  </VBtn>
  <VDialog v-model="dialog" width="800" persistent>
    <VCard>
      <VForm :disabled="isSubmitting" @submit.prevent="submit">
        <VCardText>
          <div class="text-h6 mx-2 my-3">新增寵物</div>
            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                  label="姓名"
                  color="teal"
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value" />
                <VTextField
                  label="體重"
                  type="string"
                  model-value="0"
                  suffix="(g)"
                  color="teal"
                  v-model="weight.value.value"
                  :error-messages="weight.errorMessage.value" />
                <div class="text-subtitle-1 font-weight-medium mt-4 ms-2 mb-2">照片</div>
                <VueFileAgent
                  v-model="fileRecords"
                  v-model:raw-model-value="rawFileRecords"
                  :error-text="{type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'}"
                  accept="image/jpeg,image/png"
                  ref="fileAgent"
                  max-size="1MB"
                  :max-files="1"
                  deletable />
              </VCol>
              <VCol cols="12" md="6">
                <VSelect
                  label="性別"
                  :items="['公', '母']"
                  color="teal"
                  v-model="gender.value.value"
                  :error-messages="gender.errorMessage.value" />
                <VSelect
                  label="種族"
                  :items="['犬', '貓', '兔', '鼠', '鳥', '兩棲', '其他']"
                  color="teal"
                  v-model="species.value.value"
                  :error-messages="species.errorMessage.value" />
                <VTextField
                  label="品種"
                  color="teal"
                  v-model="breed.value.value"
                  :error-messages="breed.errorMessage.value" />
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
                    @update:model-value="isMenuOpen = false"
                    color="teal" />
                </VMenu>
                <VRow>
                  <VCol cols="6">
                    <VTextField
                      label="年齡"
                      v-model="age"
                      suffix="(歲)"
                      color="teal"
                      readonly />
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      label="月份"
                      v-model="month"
                      suffix="(月)"
                      color="teal"
                      readonly />
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
            <div class="text-end">
              <VBtn
                color="teal"
                variant="text"
                class="me-3"
                @click="dialog = false">取消
              </VBtn>
              <VBtn
                color="teal"
                :loading="isSubmitting"
                type="submit">新增
              </VBtn>
            </div>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios-admin'
import { useSnackbar } from 'vuetify-use-dialog'

const user = useUserStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const emit = defineEmits(['update'])

const dialog = ref(false)
const DateValue = ref(null)
const isMenuOpen = ref(false)
const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const selectedDate = computed(() => {
  if (!DateValue.value) return null
  return DateValue.value.toLocaleDateString()
})

// Day.js 套件功能(有空再加)
const age = computed(() => {
  if (DateValue.value) {
    const today = new Date()
    const birthDate = new Date(DateValue.value)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  return null
})

const month = computed(() => {
  if (DateValue.value) {
    const today = new Date()
    const birthDate = new Date(DateValue.value)
    let month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      month = month + 12
    }
    return month
  }
  return null
})

const petSchema = yup.object({
  name: yup
    .string()
    .required('姓名為必填欄位'),
  species: yup
    .string()
    .required('種族為必填欄位'),
  breed: yup
    .string()
    .required('品種為必填欄位'),
  gender: yup
    .string()
    .required('性別為必填欄位'),
  weight: yup
    .number()
    .typeError('商品價格格式錯誤')
    .required('體重為必填欄位')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: petSchema
})

const name = useField('name')
const species = useField('species')
const breed = useField('breed')
const gender = useField('gender')
const weight = useField('weight')

const openDialog = () => {
  resetForm()
  dialog.value = true
}

const submit = handleSubmit(async (values) => {
  try {
    const formdata = new FormData()

    for (const key in values) {
      formdata.append(key, values[key])
    }
    // 放圖片
    if (fileRecords.value.length > 0) {
      formdata.append('image', fileRecords.value[0].file)
    } else {
      formdata.append('image', null)
    }
    // 放出生日期
    formdata.append('birth', selectedDate.value)
    // 放飼主id
    formdata.append('owner', user._id)

    formdata.append('chip_id', '')
    formdata.append('personality', '')

    await apiAuth.post('/pets', formdata)
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
    dialog.value = false
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
