<template>
<div class="overflow">
  <div v-if="isDesktop" class="image-paw"></div>
  <div class="circle-top"></div>
  <div class="circle-bottom"></div>
</div>

<VForm>
<VContainer :style="isDesktop ? 'margin-top: 20vh;' : 'margin-top: 10vh; height: 100vh;'" >
  <VRow>
    <VCol cols="12" sm="7" class="py-0">
      <div v-if="!isDesktop" class="ma-3 title">預約掛號</div>
      <VRow no-gutters>
        <VCol cols="12" sm="6" class="pe-sm-2">
          <VSelect
            label="獸醫師"
            v-model="doctor"
            :items="doctors"
            :item-props="true"
            item-title="title"
            item-value="value"
            prepend-inner-icon="mdi-account"
            variant="solo"
            color="teal"
            bg-color="rgba(255, 255, 255, 0.8)"
            rounded="lg"
            flat
            :rules="[rules.required]"
            @update:model-value="findAppointments" />
        </VCol>
        <VCol cols="12" sm="6" class="ps-sm-2">
          <VSelect
            label="寵物"
            v-model="pet"
            :items="pets"
            :item-props="true"
            item-title="title"
            item-value="value"
            prepend-inner-icon="mdi-paw"
            variant="solo"
            color="teal"
            bg-color="rgba(255, 255, 255, 0.8)"
            rounded="lg"
            flat
            no-data-text="請先註冊登入"
            :rules="[rules.required]" />
        </VCol>
      </VRow>
      <VDatePicker
        v-if="isDesktop"
        hide-header
        v-model="date"
        width="100%"
        rounded="lg"
        color="teal"
        position="relative"
        :allowed-dates="allowedDates"
        :min="today"
        :max="endDay"
        @update:model-value="findAppointments" />
        <!-- bg-color="rgba(255, 255, 255, 0.5)"
        style="backdrop-filter: blur(10px);" -->
      <VMenu
        v-else
        v-model="isMenuOpen"
        :close-on-content-click="false">
        <template #activator="{ props }">
          <VTextField
            label="日期"
            :model-value="selectedDate"
            prepend-inner-icon="mdi-calendar"
            color="teal" rounded="lg"
            variant="solo"
            hide-details
            readonly
            flat
            v-bind="props" />
        </template>
        <VDatePicker
          @update:model-value="isMenuOpen = false, findAppointments"
          :allowed-dates="allowedDates"
          :min="today"
          :max="endDay"
          v-model="date"
          color="teal" />
      </VMenu>
      <div class="mt-3 ms-2 mb-5 text-caption" style="position: relative;">
        <div>※ 預約開放時間為當日開始一個月整</div>
        <div>※ 夜間診只開放星期五、六</div>
      </div>
    </VCol>
    <VCol cols="12" sm="5" class="py-0">
      <VCard v-for="(appoint, n) in appoints" :key="n" class="mb-5"
        style="background: rgba(255, 255, 255, 0.8);"
        rounded="lg" flat>
        <template v-if="weekday || n !== 2">
        <div class="d-flex justify-center align-center">
          <VAvatar
            class="ma-3"
            size="calc(60px + 5vw)"
            rounded="0">
            <VImg :src="appoint.image" />
          </VAvatar>
          <div class="mx-5 my-6 text-center">
            <p class="card-title my-3">{{ appoint.title }}
              <span class="card-subtitle">{{ appoint.subtitle }}</span>
            </p>
            <VBtn :disabled="appoint.full" block variant="tonal" color="teal" rounded flat @click="submit(appoint.title)">
              {{ appoint.text }}
            </VBtn>
          </div>
        </div>
      </template>
      </VCard>
    </VCol>
  </VRow>
</VContainer>
</VForm>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay, useDate } from 'vuetify'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import morningIcon from '@/assets/morning_icon.png'
import eveningIcon from '@/assets/evening_icon.png'
import nightIcon from '@/assets/night_icon.png'

const isMenuOpen = ref(false)
const allowedDates = ref()
const doctors = ref([])
const doctor = ref(null)
const pets = ref([])
const pet = ref(null)
const date = ref()
const rules = ref({ required: (v) => !!v || '此欄位為必填' })
const { smAndUp } = useDisplay()
const { api } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()

const isDesktop = computed(() => smAndUp.value)

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
    doctor.value = doctors.value[0].value
  } catch (error) {
    console.log(error)
  }
  findAppointments()
  if (!user.isLogin) return
  try {
    const { data } = await api.get('/pets/owner/' + user._id)
    pets.value = data.result.map(pet => ({
      title: pet.name,
      subtitle: pet.species,
      value: pet._id
    }))
  } catch (error) {
    console.log(error)
  }
})

date.value = new Date()
const selectedDate = computed(() => {
  if (!date.value) return null
  return date.value.toLocaleDateString('en-CA')
})

allowedDates.value = (val) => {
  const day = new Date(val).getDay()
  return day !== 0 && day !== 1
}

const weekday = computed(() => {
  const day = new Date(date.value).getDay()
  if (day === 5 || day === 6) {
    return true
  } else {
    return false
  }
})

const today = new Date().toISOString().substr(0, 10)
const endDay = useDate().addMonths(new Date(today), 1)

const appoints = ref([
  {
    title: '上午診',
    subtitle: '09:00 - 12:00',
    image: morningIcon,
    text: '預約',
    full: false
  },
  {
    title: '下午診',
    subtitle: '14:00 - 17:00',
    image: eveningIcon,
    text: '預約',
    full: false
  },
  {
    title: '夜間診',
    subtitle: '18:00 - 21:00',
    image: nightIcon,
    text: '預約',
    full: false
  }
])

const findAppointments = async () => {
  try {
    const { data } = await api.get('/appointments/day', {
      params: {
        date: selectedDate.value,
        doctor: doctor.value
      }
    })
    console.log(data.result)
    data.result.forEach((appoint, n) => {
      appoints.value[n].full = appoint
      if (appoint) {
        appoints.value[n].text = '已額滿'
      } else {
        appoints.value[n].text = '預約'
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const submit = async (timing) => {
  if (!pet.value) {
    createSnackbar({
      text: '請先選擇寵物',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
    return
  }
  try {
    const { data } = await api.get('/appointments/order', {
      params: {
        date: selectedDate.value,
        time: timing,
        doctor: doctor.value
      }
    })
    await api.post('/appointments',
      { order: data.maxOrder + 1 },
      {
        params: {
          date: selectedDate.value,
          time: timing,
          doctor: doctor.value,
          owner: user._id,
          pet: pet.value
        }
      })
    createSnackbar({
      text: `掛號成功，預約編號：${data.maxOrder + 1}`,
      showCloseButton: true,
      snackbarProps: {
        color: 'teal',
        timeout: 10000,
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
}
</script>

<style scoped lang="sass">
:deep(.v-date-picker-controls)
  padding-top: 10px

:deep(.v-picker__header)
  display: none

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
.title
  position: relative
  font-size: 1.8rem
  font-weight: 500
  color: white
.card-title
  font-size: calc(1rem + 1vw)
  font-weight: 400
.card-subtitle
  font-size: calc(0.5rem + 0.5vw)
  font-weight: 400
</style>
