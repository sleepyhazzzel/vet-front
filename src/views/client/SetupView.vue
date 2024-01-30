<template>
  <VCard class="mx-auto mt" max-width="500" elevation="4">
    <VTabs v-model="tab" color="teal" fixed-tabs align-tabs="center">
      <VTab :value="1">註冊</VTab>
      <VTab :value="2">登入</VTab>
    </VTabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <RegisterView  @submit-form="shift" />
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <LoginView />
        </v-container>
      </v-window-item>
    </v-window>
  </VCard>
</template>

<script setup>
import { ref } from 'vue'
import RegisterView from '@/components/client/RegisterView.vue'
import LoginView from '@/components/client/LoginView.vue'

const tab = ref(1)

const shift = () => {
  tab.value = 2
}
</script>

<style scoped lang="sass">
.mt
  margin-top: 90px
</style>
