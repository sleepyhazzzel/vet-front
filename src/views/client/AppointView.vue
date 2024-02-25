<template>
<VContainer :style="isDesktop ? 'margin-top: 25vh;' : 'margin-top: 10vh;'">
  <VRow>
    <VCol cols="4">
      <VDatePicker
        v-model="date"
        color="teal"
        @input="getAppointments" />
    </VCol>
    <VCol cols="8"></VCol>
  </VRow>
</VContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()
// const date = ref(new Date().toLocaleDateString('zh-TW'))

const isDesktop = computed(() => smAndUp.value)
</script>

<style scoped lang="sass">

</style>
