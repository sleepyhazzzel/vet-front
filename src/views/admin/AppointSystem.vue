<template>
<VContainer>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <FullCalendar :options="calendarOptions" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</VContainer>
<VDialog :width="550" v-model="dialog" persistent>
  <VForm>
    <VCard>
      <VCardText>
        <div class="text-h6 mx-2 my-3">預約掛號</div>
        <VRow>
          <VCol cols="6">
            <!-- <div class="text-subtitle-1 text-medium-emphasis ms-3">日期</div> -->
            <VTextField
              v-model="date"
              density="compact"
              prepend-inner-icon="mdi-calendar"
              variant="solo"
              hide-details
              readonly
              flat />
          </VCol>
          <VCol cols="6">
            <!-- <div class="text-subtitle-1 text-medium-emphasis ms-3">時段</div> -->
            <VTextField
              v-model="time"
              density="compact"
              prepend-inner-icon="mdi-clock-time-four-outline"
              variant="solo"
              hide-details
              readonly
              flat />
          </VCol>
          <VCol cols="12">
            <VSelect
              label="獸醫師"
              v-model="doctor"
              :items="doctors"
              :item-props="true"
              item-title="title"
              item-value="value"
              color="teal"
              :rules="[rules.required]" />
            <VRow class="mb-2">
              <VCol cols="8">
                <VTextField
                label="飼主帳號"
                v-model="user.user_name"
                :suffix="user.honorific"
                color="teal"
                hide-details
                readonly />
              </VCol>
              <VCol cols="4" align-self="center">
                <SearchDialog @update="getPets" />
              </VCol>
            </VRow>
            <VSelect
              label="寵物"
              v-model="pet"
              :items="pets"
              :item-props="true"
              item-title="title"
              item-value="value"
              no-data-text="請先輸入飼主帳號"
              color="teal"
              :rules="[rules.required]" />
          </VCol>
        </VRow>
        <div class="text-end mb-3">
          <VBtn
            color="teal"
            variant="text"
            @click="closeDialog">取消</VBtn>
          <VBtn
            color="teal"
            @click="submit">確認掛號</VBtn>
        </div>
      </VCardText>
    </VCard>
  </VForm>
</VDialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios-admin'
import { useUserStore } from '@/store/user'
import { useSnackbar, useConfirm } from 'vuetify-use-dialog'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import SearchDialog from '@/components/admin/SearchDialog.vue'

const dialog = ref(false)
const date = ref('')
const time = ref('')
const doctors = ref([])
const doctor = ref(null)
const pets = ref([])
const pet = ref(null)
const rules = ref({ required: (v) => !!v || '此欄位為必填' })
const { api } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const createConfirm = useConfirm()

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

const getPets = async () => {
  try {
    const { data } = await api.get('/pets/owner/' + user._id)
    pets.value = data.result.map(pet => ({
      title: pet.name,
      subtitle: pet.species + '：' + pet.breed,
      value: pet._id
    }))
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

const closeDialog = () => {
  dialog.value = false
  date.value = ''
  time.value = ''
  doctor.value = null
  pet.value = null
  user.logout()
}

const submit = async () => {
  try {
    const { data } = await api.get('/appointments/order', {
      params: {
        date: date.value,
        time: time.value,
        doctor: doctor.value
      }
    })
    await api.post('/appointments',
      { order: data.maxOrder + 1 },
      {
        params: {
          date: date.value,
          time: time.value,
          doctor: doctor.value,
          owner: user._id,
          pet: pet.value
        }
      })
    closeDialog()
    createConfirm({
      title: '預約成功',
      content: `預約編號：${data.maxOrder + 1}`,
      dialogProps: {
        maxWidth: 300
      },
      confirmationButtonProps: {
        variant: 'tonal',
        color: 'teal'
      }
    })
  } catch (error) {
    const text = error.response.data.message
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

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin],
  initialView: 'dayGridMonth',
  height: 'auto',
  selectable: true,
  fixedWeekCount: true, // 固定行數
  displayEventTime: false,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek'
  },
  buttonText: {
    today: 'Today',
    month: 'Month',
    week: 'Week'
  },
  googleCalendarApiKey: 'AIzaSyDBB-0Rvp5dWODMEADAx6e8WKIXN2FznVk',
  eventSources: [{
    googleCalendarId: 'zh-tw.taiwan#holiday@group.v.calendar.google.com',
    color: '#B2DFDB',
    textColor: '#000'
  }],
  events: [
    {
      title: '上午診',
      daysOfWeek: ['2', '3', '4', '5', '6'],
      startTime: '09:00:00',
      endTime: '12:00:00',
      color: '#FF9800'
    },
    {
      title: '下午診',
      daysOfWeek: ['2', '3', '4', '5', '6'],
      startTime: '14:00:00',
      endTime: '17:00:00',
      color: '#009688'
    },
    {
      title: '夜間診',
      daysOfWeek: ['5', '6'],
      startTime: '18:00:00',
      endTime: '21:00:00',
      color: '#3F51B5'
    }
  ],
  eventClick: (info) => {
    dialog.value = true
    date.value = info.event.startStr.substring(0, 10)
    time.value = info.event.title
  }
})
</script>
