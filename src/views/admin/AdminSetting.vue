<template>
<VContainer class="py-0">
  <VRow class="px-2">
    <VCol cols="12" md="4">
      <VRow>
        <VCol cols="12">
          <EditAdmin @update="tableLoadItems" />
        </VCol>
        <VCol cols="12">
          <AddAdmin @update="tableLoadItems" />
        </VCol>
        <VCol cols="12">
          <DeleteAdmin @delete="tableLoadItems" />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12" md="8">
      <VCard>
        <VDataTable
          :headers="headers"
          :items="admins"
          :items-per-page="10"
          :loading="tableLoading"
          :search="search"
          >
          <template v-slot:top>
            <VToolbar flat>
              <VBtn icon="mdi-account-multiple"></VBtn>
              <VToolbarTitle class="font-weight-light">管理員列表</VToolbarTitle>
              <VSpacer />
              <VTextField
                label="Search"
                v-model="search"
                variant="solo"
                append-inner-icon="mdi-magnify"
                density="compact"
                flat
                single-line
                hide-details
                class="me-3"
              ></VTextField>
            </VToolbar>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</VContainer>
</template>
<script setup>
import AddAdmin from '@/components/admin/AddAdmin.vue'
import EditAdmin from '@/components/admin/EditAdmin.vue'
import DeleteAdmin from '@/components/admin/DeleteAdmin.vue'

import { ref } from 'vue'
import { useApi } from '@/composables/axios-admin'

const { apiAuth } = useApi()

const search = ref('')
const admins = ref([])
const tableLoading = ref(true)

const headers = [
  { title: '帳號', key: 'account', align: 'start' },
  { title: '職稱', key: 'position', align: 'start' },
  { title: '入職日期', key: 'createdAt', align: 'start' }
]

const tableLoadItems = async () => {
  try {
    tableLoading.value = true
    const { data } = await apiAuth.get('/admins')
    admins.value = data.result
  } catch (error) {
    console.log(error)
  }
  tableLoading.value = false
}
tableLoadItems()

</script>

<style scoped lang="sass">
:deep(table)
  padding-left: 10px
  padding-right: 10px
</style>
