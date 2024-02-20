<template>
<VContainer>
  <VCard>
    <VDataTable
      :headers="headers"
      :items="pets"
      :items-per-page="10"
      :loading="tableLoading"
      :search="search"
    >
      <template #top>
        <VToolbar flat>
          <VBtn icon="mdi-account-multiple"></VBtn>
          <VToolbarTitle>病例總覽</VToolbarTitle>
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
            class="me-3" />
        </VToolbar>
      </template>
      <template #[`item.image`]="{ item }">
        <VImg :src="item.image"
          width="50px"
          height="50px"
          cover
          class="rounded-pill" />
      </template>
      <template #[`item.actions`]="{ item }">
        <VBtn
          icon="mdi-pencil"
          variant="text"
          color="teal"
          @click="editItem(item)" />
        <VBtn
          icon="mdi-delete"
          variant="text"
          color="grey"
          @click="deleteItem(item)" />
      </template>
    </VDataTable>
  </VCard>
</VContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/axios-admin'

const { api } = useApi()
const router = useRouter()
const search = ref('')
const pets = ref([])
const tableLoading = ref(true)

const headers = [
  { title: '晶片號碼', key: 'chip_id' },
  { title: '圖片', key: 'image', sortable: false },
  { title: '名稱', key: 'name' },
  { title: '性別', key: 'gender' },
  { title: '種族', key: 'species' },
  { title: '品種', key: 'breed' },
  { title: '編輯 / 刪除', key: 'actions', align: 'center', sortable: false }
]

const tableLoadItems = async () => {
  try {
    tableLoading.value = true
    const { data } = await api.get('/pets')
    pets.value = data.result
  } catch (error) {
    console.log(error)
  }
  tableLoading.value = false
}
tableLoadItems()

const editItem = (item) => {
  router.push(`/admin/medical-data/${item._id}`)
}

const deleteItem = async (item) => {
  await api.delete(`/pets/${item._id}`)
  tableLoadItems()
}
</script>

<!-- <style scoped lang="sass">
:deep(tbody tr td:nth-child(2))
  padding-left: 0 !important
</style> -->
