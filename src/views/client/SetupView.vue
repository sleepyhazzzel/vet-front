<template>
  <div class="bg"></div>
  <VContainer>
    <VRow align="center" style="height: 100vh">
      <VCol cols="8" md="5" offset="2" offset-md="7" >
        <VTabs v-model="tab" color="teal" fixed-tabs align-tabs="center">
          <VTab :value="1"
            rounded="t-xl"
            :class="tab === 1 ? 'tab-white text-h6' : 'tab-grey'">註冊</VTab>
          <VTab :value="2"
            rounded="t-xl"
            :class="tab === 2 ? 'tab-white text-h6' : 'tab-grey'">登入</VTab>
        </VTabs>
        <VCard elevation="4" rounded="b-xl t-0">
          <v-window v-model="tab">
            <v-window-item :value="1">
              <v-container fluid class="mt-2">
                <RegisterView  @submit-form="shift" />
              </v-container>
            </v-window-item>
            <v-window-item :value="2">
              <v-container fluid class="mt-2">
                <LoginView />
              </v-container>
            </v-window-item>
          </v-window>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref } from 'vue'
import RegisterView from '@/components/client/RegisterView.vue'
import LoginView from '@/components/client/LoginView.vue'

const tab = ref(2)

const shift = () => {
  tab.value = 2
}
</script>

<style scoped lang="sass">
  .bg
    background: linear-gradient(to top right, rgba(0, 0, 0, 0.4), rgba(0, 150, 136, 0.4)), center / cover no-repeat url('@/assets/login-background.jpg')
    filter: blur(5px)
    -webkit-filter: blur(5px)
    position: absolute
    top: -10px
    left: -10px
    right: -10px
    bottom: -10px

  .tab-white
    background-color: #fff
    letter-spacing: 10px !important
    font-weight: 700
    transition: all 0.3s

  .tab-grey
    color: #999
    background-color: #ddd
    transition: all 0.3s

  :deep(.v-slide-group__container)
    border-radius: 30px 30px 0 0
    background-color: #ddd
</style>
