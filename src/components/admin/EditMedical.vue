<template>
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
    <VBtn type="submit" color="teal">更新寵物病歷</VBtn>
  </div>
</VForm>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mask as vMask } from 'vue-the-mask'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/axios-admin'
// import { useSnackbar } from 'vuetify-use-dialog'
import { useRoute } from 'vue-router'
import SearchDialog from '@/components/admin/SearchDialog.vue'

const isMenuOpen = ref(false)

const { api } = useApi()
const route = useRoute()

const { petdata } = api.get(`/pets/${route.params.id}`)
const { ownerdata } = api.get(`/owners/${petdata.owner_id}`)

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

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: petSchema
})

const name = useField('name')
const species = useField('species')
const breed = useField('breed')
const gender = useField('gender')
const weight = useField('weight')
const personality = useField('personality')
const chip_id = useField('chip_id')

name.value.value = petdata.name
species.value.value = petdata.species
breed.value.value = petdata.breed
gender.value.value = petdata.gender
weight.value.value = petdata.weight
const DateValue = ref(petdata.birth)
personality.value.value = petdata.personality
chip_id.value.value = petdata.chip_id

const user = ref({
  user_name: ownerdata.name,
  national_id: ownerdata.national_id,
  phone: ownerdata.phone,
  honorific: ownerdata.honorific
})

const submit = handleSubmit(async (values) => {
  console.log(values)
  // await api.post('/pets', values)
  // resetForm()
})
</script>
