<template>
  <div class="bg"></div>
  <VContainer style="margin-top: -15vh;">
    <VRow>
      <VCol cols="12" md="10" offset-md="1">
        <VCard class="px-4 py-2">
          <VList class="pb-0">
            <VListItem
              :prepend-avatar="prependAdvatar">
                <v-list-item-title>
                  {{ user.user_name }}({{ user.honorific }})
                </v-list-item-title>
                <template #append>
                  <VBtn icon="mdi-pencil" color="grey" variant="text"></VBtn>
                </template>
            </VListItem>
          </VList>
          <VDivider class="my-1" />
          <VRow>
            <VCol v-for="item in userItems" :key="item" cols="3">
              <VList class="pa-0" disabled>
                <VListItem :prepend-icon="item.icon">{{ item.text }}</VListItem>
              </VList>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol cols="12" md="5" offset-md="1">
        <VCard class="pa-3">
          <VCardTitle class="card-title">寵物資料</VCardTitle>
          <VItemGroup mandatory>
            <VRow>
              <VCol v-for="n in 3" :key="n" cols="6">
                <v-item v-slot="{ isSelected, toggle }">
                  <VCard
                    :color="isSelected ? 'teal' : ''"
                    class="d-flex align-center"
                    dark
                    height="150"
                    @click="toggle">
                    <v-scroll-y-transition>
                      <div class="text-h3 flex-grow-1 text-center">
                        {{ isSelected ? 'Selected' : 'Click Me!' }}
                      </div>
                    </v-scroll-y-transition>
                  </VCard>
                </v-item>
              </VCol>
            </VRow>
          </VItemGroup>
        </VCard>
      </VCol>
      <VCol cols="12" md="5">
        <VCard class="pa-3 mb-3">
          <VCardTitle class="card-title">基本資料</VCardTitle>
          <template v-for="pet in pets" :key="pet">
            <VCard class="mx-2">
              <template #prepend>
              <VAvatar size="60" class="me-2">
                <VImg :src="pet.image" cover />
              </VAvatar>
              </template>
              <template #title>
                {{ pet.name }}<span class="small-title"> ({{ pet.species }})</span>
              </template>
              <template #subtitle>
                <p class="text-caption">晶片號碼：{{ pet.chip_id }}</p>
              </template>
              <template #append>
              <VIcon
                :icon="pet.gender === '公' ? 'mdi-gender-male' : 'mdi-gender-female'"
                color="teal"
                size="40"/>
              </template>
            </VCard>
            <VSheet class="mx-2 mb-2 px-3 sheet" rounded>
              <VCardText>
                <VRow>
                  <VCol cols="4">
                    <p>體重</p>
                    <span class="text-h6">{{ pet.weight }}</span>(g)
                  </VCol>
                  <VDivider color="teal" vertical />
                  <VCol cols="4">
                    <p>年齡</p>
                    <span class="text-h6">{{ pet.age }}</span> 歲 <span class="text-h6">{{ pet. month }}</span> 月
                  </VCol>
                  <VDivider color="teal" vertical />
                  <VCol cols="4">
                    <p>出生日期</p>
                    <span class="text-h6">{{ pet.birth}}</span>
                  </VCol>
                </VRow>
              </VCardText>
            </VSheet>
          </template>
        </VCard>
        <VCard>
          <VCardTitle class="ma-3 card-title">掛號紀錄</VCardTitle>
          <VDataTable
            :headers="headers"
            :items="appointments"
            :items-per-page="5"
            class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <VBtn
                color="teal"
                variant="text"
                @click="showAppointment(item)">取消
              </VBtn>
            </template>
          </VDataTable>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useDisplay } from 'vuetify'

const user = useUserStore()
const createSnackbar = useSnackbar()
const { api, apiAuth } = useApi()
const { smAndUp } = useDisplay()

const pets = ref([])
const isDesktop = computed(() => smAndUp.value)

const prependAdvatar = computed(() => {
  const encode_name = encodeURIComponent(user.user_name)
  return `https://source.boringavatars.com/beam/120/${encode_name}?colors=545454,7B8A84,B2DFDB,EDE7D5,B7CC18`
})

onMounted(async () => {
  if (!user.address) {
    user.address = '尚未填寫'
  }

  const { data } = await api.get(`/pets/owner/${user._id}`)
  if (!data.result) return

  pets.value = data.result.map(pet => {
    pet.birth = new Date(pet.birth).toLocaleDateString('zh-TW')
    pet.age = new Date().getFullYear() - new Date(pet.birth).getFullYear()
    pet.month = new Date().getMonth() - new Date(pet.birth).getMonth()
    if (pet.month < 0 || (pet.month === 0 && new Date().getDate() < new Date(pet.birth).getDate())) {
      pet.age -= 1
      pet.month += 12
    }
    return {
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      gender: pet.gender,
      birth: pet.birth,
      age: pet.age,
      month: pet.month,
      weight: pet.weight,
      chip_id: pet.chip_id,
      image: pet.image
    }
  })
})

const userItems = [
  { icon: 'mdi-phone', text: user.phone },
  { icon: 'mdi-card-account-details', text: user.national_id },
  { icon: 'mdi-map-marker', text: user.address },
  { icon: 'mdi-email', text: user.email }
]

const headers = [
  { title: '日期', key: 'date' },
  { title: '時段', key: 'time' },
  { title: '獸醫師', key: 'doctor' },
  { title: '操作', key: 'actions', align: 'center', sortable: false }
]

const appointments = [
  {
    date: '2021-09-01',
    time: '09:00',
    doctor: '王小明',
    status: '已完成'
  },
  {
    date: '2021-09-01',
    time: '09:00',
    doctor: '王小明',
    status: '已完成'
  },
  {
    date: '2021-09-01',
    time: '09:00',
    doctor: '王小明',
    status: '已完成'
  },
  {
    date: '2021-09-01',
    time: '09:00',
    doctor: '王小明',
    status: '已完成'
  },
  {
    date: '2021-09-01',
    time: '09:00',
    doctor: '王小明',
    status: '已完成'
  }
]

// const logout = async () => {
//   try {
//     await apiAuth.delete('/users/logout')
//     user.logout()
//     createSnackbar({
//       text: '登出成功',
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'success',
//         location: 'bottom'
//       }
//     })
//     router.push('/')
//   } catch (error) {
//     const text = error?.responce?.data?.message || '發生錯誤，請稍後再試'
//     createSnackbar({
//       text,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'warning',
//         location: 'bottom'
//       }
//     })
//   }
// }
</script>

<style scoped lang="sass">
.bg
  background-image: linear-gradient(45deg, #009688, #80CBC4)
  width: 100%
  height: 30vh
.card-title
  font-size: 1rem
  font-weight: 500
.small-title
  font-size: 0.8rem
  font-weight: normal
.sheet
  background-color: rgba(0, 150, 136, 0.1)
  color: #009688
</style>
