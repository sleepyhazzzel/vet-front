<template>
<VBtn
  variant="text"
  class="ms-4"
  prepend-icon="mdi-arrow-left"
  @click="backToMedicalData">返回</VBtn>
<VContainer>
  <VForm :disabled="isSubmitting" @submit.prevent="submit">
    <VCard>
      <VToolbar>
        <VIcon class="ms-4">mdi-paw</VIcon>
        <VToolbarTitle class="ms-2">編輯寵物病歷</VToolbarTitle>
      </VToolbar>
      <VCardText>
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
                <div class="text-subtitle-1 font-weight-medium mb-2 ms-2">照片</div>
                <VImg
                  max-height="176"
                  :src="image"
                  aspect-ratio="4/3"
                  class="bg-grey-lighten-3" />
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
            <VRow>
              <VCol cols="12">
                <div class="d-flex justify-space-between align-center">
                  <div class="text-subtitle-1 font-weight-medium ms-2 mb-2">飼主資訊</div>
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
          <div v-if="isMobile" class="text-end">
            <VBtn color="teal" type="submit" class="mb-4">更新寵物病歷</VBtn>
          </div>
          <VRow v-else style="height: 215px;">
            <VCol cols="12" align-self="end">
              <div class="text-end">
                <VBtn color="teal" type="submit" flat>更新寵物病歷</VBtn>
              </div>
            </VCol>
          </VRow>

          </VCol>
        </VRow>
        <VDivider class="mb-4" />
        <VRow>
          <VCol cols="12">
            <div class="d-flex justify-space-between align-center">
              <div class="text-subtitle-1 font-weight-medium ms-2 mb-2">診療紀錄</div>
              <VBtn
                color="teal"
                density="compact"
                variant="text"
                class="align-self-start"
                @click="openDialog(item)">新增診療紀錄
              </VBtn>
            </div>
            <VDataTable
              :headers="headers"
              :sort-by="[{ key: 'date', order: 'desc' }]"
              :items="descriptions"
              :loading="tableLoading"
              :items-per-page="10"
              :no-data-text="tableLoading ? '載入中...' : '無資料'"
              color="teal"
              class="mb-4 elevation-1"
              >
              <template #[`item.actions`]="{ item }">
                <VBtn
                  color="teal"
                  icon="mdi-pencil"
                  variant="text"
                  @click="openDialog(item)" />
                <VBtn
                  icon="mdi-delete"
                  variant="text"
                  color="grey"
                  @click="deleteItem(item)" />
              </template>
            </VDataTable>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VForm>
</VContainer>
<DESCDialog :item="selectedItem" ref="elDESCDialog" @update="tableLoadItems" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { mask as vMask } from 'vue-the-mask'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios-admin'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import SearchDialog from '@/components/admin/SearchDialog.vue'
import DESCDialog from '@/components/admin/DescriptionDialog.vue'

const isMenuOpen = ref(false)
const tableLoading = ref(true)
const selectedItem = ref(null)

const elDESCDialog = ref(null)

const route = useRoute()
const router = useRouter()
const { api } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const { sm } = useDisplay()
const isMobile = computed(() => sm.value)

const backToMedicalData = () => {
  router.go(-1)
}

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
const image = ref(null)
const DateValue = ref(null)
const descriptions = ref([])

onMounted(async () => {
  try {
    const { data: petdata } = await api.get(`/pets/${route.params.id}`)
    name.value.value = petdata.result.name
    species.value.value = petdata.result.species
    breed.value.value = petdata.result.breed
    gender.value.value = petdata.result.gender
    weight.value.value = petdata.result.weight
    DateValue.value = new Date(petdata.result.birth)
    personality.value.value = petdata.result.personality
    chip_id.value.value = petdata.result.chip_id.replace(/-/g, '')
    image.value = petdata.result.image

    const { data: ownerdata } = await api.get(`/users/${petdata.result.owner}`)
    user.login(ownerdata.result)
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
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

const selectedDate = computed(() => {
  if (!DateValue.value) return null
  return DateValue.value.toLocaleDateString()
})

const openDialog = (item) => {
  elDESCDialog.value.openDialog(item)
}

const headers = [
  { title: '日期', key: 'date' },
  { title: '描述', key: 'description', sortable: false },
  { title: '主治醫生', key: 'edit_by' },
  { title: '編輯 / 刪除', key: 'actions', align: 'center', sortable: false }
]

const tableLoadItems = async () => {
  try {
    tableLoading.value = true
    const { data } = await api.get('/pets/medical/' + route.params.id)
    descriptions.value = data.result.descriptions
  } catch (error) {
    console.log(error)
  }
  tableLoading.value = false
}
tableLoadItems()

const submit = handleSubmit(async (values) => {
  try {
    if (user._id !== null) {
      values.owner = user._id
    }
    values.birth = selectedDate.value
    await api.patch('/pets/' + route.params.id, values)
    createSnackbar({
      text: '更新成功',
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
        color: 'red',
        location: 'bottom'
      }
    })
  }
})

const deleteItem = async (item) => {
  try {
    await api.delete('/pets/medical/' + route.params.id + '/' + item._id)
    createSnackbar({
      text: '刪除成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
    tableLoadItems()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="sass">
:deep(thead)
  background-color: #eee
</style>
