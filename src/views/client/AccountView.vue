<template>
<div class="overflow">
  <div v-if="isDesktop" class="image-paw"></div>
  <div class="circle-top"></div>
  <div class="circle-bottom"></div>
</div>
  <!-- <div class="bg"></div> -->
  <VContainer :style="isDesktop ? 'margin-top: 20vh;' : 'margin-top: 10vh;'">
    <VRow>
      <VCol cols="12" md="10" offset-md="1" class="pt-0">
        <div v-if="!isDesktop" class="ma-3 title">個人帳號</div>
        <VCard class="px-4 py-2" rounded="lg" style="background: rgba(255, 255, 255, 0.8);" flat>
          <VList class="pb-0" bg-color="transparent">
            <VListItem class="pe-0">
              <template #prepend>
                <Avatar
                  :name="advatarName"
                  :variant="'beam'"
                  :size="isDesktop ? '80' : '60'"
                  :colors="['#545454', '#7B8A84', '#B2DFDB', '#EDE7D5', '#B7CC18']"
                />
              </template>
              <v-list-item-title>
                {{ user.user_name }}
                <span class="small-title"> ({{ user.honorific }})</span>
              </v-list-item-title>
              <template #append>
                <EditUserDialog />
              </template>
            </VListItem>
          </VList>
          <VDivider class="my-1" />
          <div>
            <VList class="pa-0 d-flex flex-column flex-md-row justify-md-space-between overflow-hidden" disabled bg-color="transparent">
              <VListItem v-for="item in userItems" :key="item"
                :prepend-icon="item.icon">{{ item.text }}
              </VListItem>
            </VList>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="10" offset-md="1">
        <VCard class="pa-3" rounded="lg" style="background: rgba(255, 255, 255, 0.7);" flat>
          <div class="d-flex justify-space-between">
            <VCardTitle class="card-title">寵物資料</VCardTitle>
            <AddPet @update="getPets" />
          </div>
          <VDivider class="mt-1 mb-sm-3" />
          <div class="d-flex flex-column flex-sm-row">
            <VRow>
              <VCol cols="12" sm="2" :class="isDesktop ? '' : 'mt-3 pb-0'">
                <VTabs v-model="tab"
                  :direction="isDesktop ? 'vertical' : 'horizontal'"
                  color="teal">
                  <VTab v-for="(pet, n) in pets" :key="n" :value="n"
                    :class="tab === n ? 'tab-focus' : ''"
                    :rounded="isDesktop ? 'e-lg' : 't-lg'">
                    {{ pet.name }}
                  </VTab>
                </VTabs>
              </VCol>
              <VCol cols="12" sm="10" class="pb-2">
                <VWindow v-model="tab" touch>
                  <VWindowItem v-for="(pet, n) in pets" :key="n" :value="n">
                    <VCard class="pa-0 mb-3" flat style="background-color: #ffffff00;">
                      <VCardTitle class="ma-3 card-title">基本資料</VCardTitle>
                        <VCard class="mx-2 mb-2" flat style="background-color: #ffffff00;">
                          <template #prepend>
                          <VAvatar :size="isDesktop ? '60' : '40'" class="me-2">
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
                              <VCol cols="12" sm="4">
                                <p>體重</p>
                                <span class="text-h6">{{ pet.weight }}</span>(g)
                              </VCol>
                              <VDivider v-if="isDesktop" color="teal" class="my-2" vertical />
                              <VCol cols="12" sm="4">
                                <p>年齡</p>
                                <span class="text-h6">{{ pet.age }}</span> 歲 <span class="text-h6">{{ pet.month }}</span> 月
                              </VCol>
                              <VDivider v-if="isDesktop" color="teal" class="my-2" vertical />
                              <VCol cols="12" sm="4">
                                <p>出生日期</p>
                                <span class="text-h6">{{ pet.birth }}</span>
                              </VCol>
                            </VRow>
                          </VCardText>
                        </VSheet>
                    </VCard>
                    <VDivider />
                    <VCard class="pa-0 mb-1" flat style="background-color: #ffffff00;">
                      <VCardTitle class="ma-3 card-title">掛號紀錄</VCardTitle>
                      <AppointTable :id="pet._id" />
                    </VCard>
                  </VWindowItem>
                </VWindow>
              </VCol>
            </VRow>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
// import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useDisplay } from 'vuetify'
import Avatar from 'vue-boring-avatars'
import EditUserDialog from '@/components/client/EditUserDialog.vue'
import AddPet from '@/components/client/AddPet.vue'
import AppointTable from '@/components/client/AppointTable.vue'

const user = useUserStore()
// const createSnackbar = useSnackbar()
const { api } = useApi()
const { smAndUp } = useDisplay()

const tab = ref(0)
const pets = ref([])
// const appointments = ref([])
const isDesktop = computed(() => smAndUp.value)

const advatarName = onMounted(() => {
  // 中文名稱編碼轉換
  return encodeURIComponent(user.user_name)
})

const getPets = async () => {
  if (!user.address) {
    user.address = '尚未填寫'
  }
  try {
    const { data } = await api.get(`/pets/owner/${user._id}`)
    if (!data.result) return
    // 計算年齡
    data.result.forEach(pet => {
      pet.birth = new Date(pet.birth).toLocaleDateString('zh-TW')
      pet.age = new Date().getFullYear() - new Date(pet.birth).getFullYear()
      pet.month = new Date().getMonth() - new Date(pet.birth).getMonth()
      if (pet.month < 0 || (pet.month === 0 && new Date().getDate() < new Date(pet.birth).getDate())) {
        pet.age -= 1
        pet.month += 12
      }
    })
    pets.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getPets()

const userItems = computed(() => [
  { icon: 'mdi-phone', text: user.phone },
  { icon: 'mdi-card-account-details', text: user.national_id },
  { icon: 'mdi-map-marker', text: user.address },
  { icon: 'mdi-email', text: user.email }
])

</script>

<style scoped lang="sass">
.overflow
  overflow: hidden
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
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
  background: linear-gradient(to bottom right, #009688 40%, #E0F2F1 100%)
  border-radius: 50%
  filter: blur(10px)
.circle-bottom
  position: absolute
  bottom: -30vh
  right: 25vw
  width: calc(300px + 12vw)
  height: calc(300px + 12vw)
  background: linear-gradient(45deg, #009688, #E0F2F1)
  border-radius: 50%
  filter: blur(20px)
.bg
  background-image: linear-gradient(45deg, #009688, #80CBC4)
  width: 100%
  height: 30vh
.title
  position: relative
  font-size: 1.8rem
  font-weight: 500
  color: white
.card-title
  font-size: 1rem
  font-weight: 500
.small-title
  font-size: 0.8rem
  font-weight: normal
.sheet
  background-color: rgba(0, 150, 136, 0.1)
  color: #009688
.tab-focus
  background-color: rgba(0, 150, 136, 0.1)
  font-weight: 700
  transition: all 0.3s

:deep(.v-list-item__prepend)
  padding-right: 20px
:deep(.v-list-item__spacer)
  display: none
</style>
