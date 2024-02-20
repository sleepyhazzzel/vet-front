<template>
<VForm>
  <VContainer>
    <VRow>
      <VCol v-if="!isMobile" cols="12" md="1"></VCol>
      <VCol cols="12" md="3">
        <VMenu
          v-model="isMenuOpen"
          :close-on-content-click="false">
          <template #activator="{ props }">
            <VTextField
              label="日期"
              :model-value="selectedDate"
              prepend-inner-icon="mdi-calendar"
              color="teal"
              bg-color="white"
              readonly
              flat
              v-bind="props" />
          </template>
          <VDatePicker
            @input="isMenuOpen = false"
            v-model="DateValue"
            color="teal" />
        </VMenu>
      </VCol>
      <VCol cols="12" md="3">
        <VSelect
          label="時段"
          v-model="time"
          prepend-inner-icon="mdi-clock-time-four-outline"
          :items="['上午診', '下午診', '夜間診']"
          color="teal"
          bg-color="white"
          :rules="[rules.required]" />
      </VCol>
      <VCol cols="12" md="3">
        <VSelect
          label="獸醫師"
          v-model="doctor"
          :items="doctors"
          :item-props="true"
          item-title="title"
          item-value="value"
          color="teal"
          bg-color="white"
          :rules="[rules.required]" />
      </VCol>
      <VCol cols="12" md="2" >
        <VBtn
          type="submit"
          prepend-icon="mdi-magnify"
          color="teal"
          class="mt-3"
          @click="submit">搜尋</VBtn>
      </VCol>
    </VRow>
    <VDataTable
      :headers="headers"
      :items="appointments"
      :items-per-page="10"
      :loading="tableLoading">
      <template #[`item.view`]="{ item }">
        <VBtn
          icon="mdi-eye"
          color="teal"
          variant="text"
          @click="viewItem(item)" />
      </template>
      <template #[`item.delete`]="{ item }">
        <VBtn
          icon="mdi-delete"
          color="grey"
          variant="text"
          @click="deleteItem(item)" />
      </template>
    </VDataTable>
  </VContainer>
</VForm>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useApi } from '@/composables/axios-admin'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useAppointStore } from '@/store/appointment'

const DateValue = ref(null)
const isMenuOpen = ref(false)
const time = ref(null)
const doctors = ref([])
const doctor = ref(null)
const rules = ref({ required: (v) => !!v || '此欄位為必填' })
const appointments = ref([])
const tableLoading = ref(false)

const { sm } = useDisplay()
const { api } = useApi()
const createSnackbar = useSnackbar()
const router = useRouter()
const appointmentStore = useAppointStore()

const isMobile = computed(() => sm.value)

onMounted(async () => {
  try {
    const { data } = await api.get('/admins')
    doctors.value = data.result
      .filter(admin => admin.position === '獸醫師')
      .map(admin => ({
        title: admin.account,
        subtitle: admin.position,
        value: admin._id
      }))
  } catch (error) {
    console.log(error)
  }
})

const selectedDate = computed(() => {
  if (!DateValue.value) return null
  return DateValue.value.toLocaleDateString('en-CA')
})

const headers = [
  { title: '掛號號碼', key: 'order' },
  { title: '寵物', key: 'pet_name' },
  { title: '種族', key: 'pet_species' },
  { title: '品種', key: 'pet_breed' },
  { title: '性格', key: 'pet_personality' },
  { title: '檢視', key: 'view', align: 'center', sortable: false },
  { title: '刪除', key: 'delete', align: 'center', sortable: false }
]

const tableLoadItems = async () => {
  try {
    const form = {
      date: selectedDate.value,
      time: time.value,
      doctor: doctor.value
    }
    tableLoading.value = true
    const { data } = await api.get('/appointments', {
      params: form
    })
    appointments.value = data.result
  } catch (error) {
    console.log(error)
  }
  tableLoading.value = false
}
tableLoadItems()

const submit = async () => {
  try {
    const form = {
      date: selectedDate.value,
      time: time.value,
      doctor: doctor.value
    }
    tableLoadItems()
    appointmentStore.update(form)
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
}

const viewItem = (item) => {
  router.push(`/admin/appointment/${item.pet}`)
}

const deleteItem = async (item) => {
  api.delete(`/appointments/${item._id}`)
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
}
</script>

<style scoped lang="sass">
:deep(.v-picker__header)
  display: none

:deep(.v-col-12)
  padding: 0 12px
</style>
