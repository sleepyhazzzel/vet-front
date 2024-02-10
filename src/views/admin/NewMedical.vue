<template>
<VContainer>
  <VCard elevation="2">
    <VToolbar>
      <VIcon class="ms-4">mdi-paw</VIcon>
      <VToolbarTitle class="ms-2">新增寵物病歷</VToolbarTitle>
    </VToolbar>
    <VCardText>
      <VForm :disabled="isSubmitting" @submit.prevent="submit">
        <VRow>
          <VCol cols="12" md="8">
            <div class="text-subtitle-1 font-weight-medium ms-2 mb-2">基本資訊</div>
            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                  label="姓名"
                  color="teal"
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value" />
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
                <VTextField
                  label="體重"
                  type="string"
                  model-value="0"
                  suffix="(g)"
                  color="teal"
                  v-model="weight.value.value"
                  :error-messages="weight.errorMessage.value" />
                <VSelect
                  label="性格"
                  :items="['溫和', '緊張', '危險']"
                  color="teal"
                  v-model="personality.value.value"
                  :error-messages="personality.errorMessage.value" />
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
                    color="teal"
                  ></VDatePicker>
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
                      label="年齡"
                      v-model="month"
                      suffix="(月)"
                      color="teal"
                      readonly />
                  </VCol>
                </VRow>
                <VTextField
                  label="晶片號碼"
                  v-mask="'####-####-####-####'"
                  color="teal"
                  v-model="chip_id.value.value"
                  :error-messages="chip_id.errorMessage.value" />
              </VCol>
            </VRow>
          </VCol>
          <VDivider v-if="isMobile" class="mx-3" />
          <VDivider v-else vertical class="my-3" />
          <VCol cols="12" md="4">
            <div class="d-flex justify-space-between align-center">
              <div
                class="text-subtitle-1 font-weight-medium ms-2 mb-2">飼主資訊
              </div>
              <SearchDialog />
            </div>
            <VTextField
              label="姓名"
              color="teal"
              v-model="user.user_name"
              :suffix="user.honorific"
              readonly
              />
            <VTextField
              label="身分證字號"
              color="teal"
              v-model="user.national_id"
              readonly
              />
            <VTextField
              label="電話"
              color="teal"
              v-model="user.phone"
              readonly
              />
          </VCol>
        </VRow>
        <div class="text-end">
          <VBtn @click="reset" color="teal" variant="text" class="mb-1 me-2">重設</VBtn>
          <VBtn type="submit" color="teal">新增寵物病歷</VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</VContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { mask as vMask } from 'vue-the-mask'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/axios-admin'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import SearchDialog from '@/components/admin/SearchDialog.vue'

const DateValue = ref(null)
const isMenuOpen = ref(false)
const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const { api } = useApi()
const { sm } = useDisplay()
const user = useUserStore()
const createSnackbar = useSnackbar()
const isMobile = computed(() => sm.value)

const selectedDate = computed(() => {
  if (!DateValue.value) return null
  // 時區問題，要減掉時區差
  const localDate = new Date(DateValue.value.getTime() - DateValue.value.getTimezoneOffset() * 60000)
  return localDate.toISOString().substr(0, 10)
})

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
    .required('體重為必填欄位'),
  personality: yup
    .string()
    .required('性格為必填欄位'),
  chip_id: yup
    .string()
    .required('晶片號碼為必填欄位')
    .matches(/^.{4}-.{4}-.{4}-.{4}$/, '晶片號碼格式錯誤')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: petSchema
})

const name = useField('name')
const species = useField('species')
const breed = useField('breed')
const gender = useField('gender')
const weight = useField('weight')
const personality = useField('personality')
const chip_id = useField('chip_id')

const reset = () => {
  resetForm({ values: {
    name: '',
    species: '',
    color: '',
    gender: '',
    weight: '',
    personality: '',
    birth: '',
    chip_id: ''
  } })
  fileAgent.value.deleteFileRecord()
  DateValue.value = null
  fileRecords.value = []
  rawFileRecords.value = []
  user.logout()
}

const submit = handleSubmit(async (values) => {
  try {
    if (fileRecords.value[0]?.error) throw new Error('NO_IMAGE')

    chip_id.value.value = chip_id.value.value.replace(/-/g, '')

    const formdata = new FormData()

    for (const key in values) {
      formdata.append(key, values[key])
    }
    // 放圖片
    if (fileRecords.value.length > 0) {
      formdata.append('image', fileRecords.value[0].file)
    }
    // 放飼主id
    if (user._id !== null) {
      formdata.append('owner', user._id)
    }
    // 放出生日期
    formdata.append('birth', selectedDate)

    await api.post('/pets', formdata)

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
    console.log(error)
    let text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    if (error.message === 'NO_IMAGE') {
      text = '請上傳寵物照片'
    }
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'error',
        location: 'bottom'
        // Cast to ObjectId failed for value "undefined" (type string) at path "owner" because of "BSONError"
      }
    })
  }
})
</script>

<style scoped lang="sass">
:deep(.file-input-wrapper)
  border: none !important
  background-color: rgba(0, 0, 0, 0.1) !important

:deep(.file-preview-wrapper)
  &::before
    background: none !important
    border: none !important
</style>
