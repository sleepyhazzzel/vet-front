<template>
  <VDataTable
    :headers="headers"
    :sort-by="[{ key: 'date', order: 'desc' }]"
    :items="appointments"
    :items-per-page="10"
    :loading="tableLoading"
    no-data-text="無掛號紀錄"
    :class="tableClass"
    >
    <template #[`item.actions`]="{ item }">
      <VBtn v-if="!item.status && isFuture(item.date)"
        color="teal"
        variant="text"
        @click="cancel(item)">取消
      </VBtn>
    </template>
  </VDataTable>
  <VDialog v-model="dialog" max-width="300" persistent>
    <VCard>
      <VCardText>
        <div class="text-center">
          <div class="text-h6 mt-3 mb-8">確定取消預約掛號？</div>
          <div class="mb-3">
            <VBtn
              color="teal"
              class="me-3"
              variant="text"
              @click="dialog = false">取消
            </VBtn>
            <VBtn
              color="teal"
              @click="delAppoint">確定
            </VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRoute } from 'vue-router'

const props = defineProps({
  id: String
})
const dialog = ref(false)
const tableLoading = ref(true)
const petId = ref('')
const appointments = ref([])

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const route = useRoute()

const tableClass = computed(() => {
  return route.meta.name.includes('病歷') ? 'mb-4 elevation-1' : 'pa-3'
})

const isFuture = (date) => {
  return new Date(date) >= new Date()
}

const headers = [
  { title: '日期', key: 'date' },
  { title: '時段', key: 'time' },
  { title: '獸醫師', key: 'doctor_name' },
  { title: '號碼', key: 'order' },
  { title: '取消', key: 'actions', align: 'center', sortable: false }
]

const tableLoadItems = async (petId) => {
  try {
    tableLoading.value = true
    const { data } = await apiAuth.get(`/appointments/${petId}`)
    appointments.value = data.result
  } catch (error) {
    console.log(error)
  }
  tableLoading.value = false
}
tableLoadItems(props.id)

const cancel = async (item) => {
  dialog.value = true
  petId.value = item._id
}

const delAppoint = async () => {
  try {
    dialog.value = false
    await apiAuth.delete(`/appointments/${petId.value}`)
    tableLoadItems(props.id)
    createSnackbar({
      text: '取消成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
  } catch (error) {
    console.log(error)
  }
}
</script>
