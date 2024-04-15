<template>
<div class="overflow">
  <div v-if="isDesktop" class="image-paw"></div>
  <div class="circle-top"></div>
  <div class="circle-bottom"></div>
</div>
<VContainer :style="isDesktop ? 'margin-top: 20vh;' : 'margin-top: 10vh; height: 100vh;'">
  <VRow>
    <VCol cols="12" md="10" offset-md="1" class="pt-0">
      <div v-if="!isDesktop" class="ma-3 title">看診進度</div>
      <VCard style="background: rgba(255, 255, 255, 0.7);"
        height="calc(200px + 30vh)" class="pa-6" rounded="lg" flat>
        <VCardTitle class="mb-3">
          <VIcon icon="mdi-calendar-search" color="teal"></VIcon>
          <span class="ms-2 mt-1" style="color: #009688;">看診進度</span>
        </VCardTitle>
          <VDataTable
            :headers="headers"
            :items="appointments"
            :loading="tableLoading"
            >
            <!-- 關footer -->
            <template #bottom></template>
          </VDataTable>
          <div class="mt-3 ms-2 text-caption">
            <div>※ 上午診 09:00 ~ 12:00 、 下午診 14:00 ~ 17:00 、 夜間診 18:00 ~ 21:00</div>
          </div>
          <div style="height: 13.5vh;"></div>
        <div class="d-flex justify-space-between">
          <VBtn to="/appoint" variant="tonal" color="teal" rounded="pill" flat class="px-6" prepend-icon="mdi-arrow-left">預約掛號</VBtn>
          <VBtn v-if="user.isLogin" to="/account" variant="tonal" color="teal" rounded="pill" flat class="px-6" append-icon="mdi-arrow-right">個人帳號</VBtn>
          <VBtn v-else to="/setup" variant="tonal" color="teal" rounded="pill" flat class="px-6" append-icon="mdi-arrow-right">註冊登入</VBtn>
        </div>
      </VCard>
    </VCol>
  </VRow>
</VContainer>
</template>

<script setup>
import { api } from '@/composables/axios-admin'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'

const appointments = ref([])
const tableLoading = ref(false)
const { smAndUp } = useDisplay()
const user = useUserStore()

const isDesktop = computed(() => smAndUp.value)

const headers = ref([
  { title: '日期', key: 'date', sortable: false },
  { title: '時段', key: 'time', sortable: false },
  { title: '獸醫師', key: 'doctor_name', sortable: false },
  { title: '目前看診進度', key: 'status', sortable: false, align: 'center' }
])

const tableLoadItems = async () => {
  try {
    tableLoading.value = true
    const { data } = await api.get('/appointments/clinic')
    appointments.value = data.result
    setTimeout(() => {
      tableLoading.value = false
    }, 750)
  } catch (error) {
    console.error(error)
  }
}
tableLoadItems()

setInterval(() => {
  tableLoadItems()
}, 60000)
</script>

<style scoped lang="sass">
:deep(tbody>.v-data-table__tr>.v-data-table__td:nth-child(4))
  color: #009688
  font-weight: 600
.overflow
  overflow: hidden
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  // background: linear-gradient(45deg, #009688, #E0F2F1)
.image-paw
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background: 105% 0% / 290px no-repeat url('@/assets/paw.png')
.circle-top
  position: absolute
  bottom: 70vh
  right: 40vw
  width: calc(600px + 20vw)
  height: calc(600px + 20vw)
  // background: linear-gradient(to bottom right, #B2DFDB 40%, #E0F2F1 100%)
  background: linear-gradient(to bottom right, #009688 40%, #E0F2F1 100%)
  border-radius: 50%
  filter: blur(10px)
.circle-bottom
  position: absolute
  bottom: -30vh
  right: 25vw
  width: calc(300px + 12vw)
  height: calc(300px + 12vw)
  // background: linear-gradient(45deg, #B2DFDB, #E0F2F1)
  background: linear-gradient(45deg, #009688, #E0F2F1)
  border-radius: 50%
  filter: blur(20px)
.title
  position: relative
  font-size: 1.8rem
  font-weight: 500
  color: white
</style>
