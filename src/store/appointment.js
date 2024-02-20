import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppointStore = defineStore('appointment', () => {
  const date = ref('')
  const time = ref('')
  const doctor = ref('')

  const update = (data) => {
    date.value = data.date
    time.value = data.time
    doctor.value = data.doctor
  }

  return {
    date, time, doctor, update
  }
}, {
  persist: {
    key: '48763',
    paths: ['token']
  }
})
