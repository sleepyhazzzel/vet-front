<template>
  <div class="overflow">
    <div class="circle-top"></div>
    <div class="circle-bottom"></div>
  </div>
  <div v-if="isMd" class="parallax-bg">
    <div class="arrow animate__animated animate__pulse animate__infinite"></div>
    <div class="right-img1"></div>
    <div class="right-img2"></div>
  </div>
  <VContainer style="margin-top: 9vh;">
    <VRow>
      <VCol cols="12">
        <VCard v-if="isDesktop" rounded="xl" flat style="background-color: transparent; background: linear-gradient(to bottom, #ffffff00, #fff 70%);" >
          <VImg :src="Banner" height="calc(250px + 30vw)" cover />
          <div class="logo-right animate__animated animate__fadeInUp"></div>
        </VCard>
        <VCard v-else rounded="xl" flat style="background: linear-gradient(to bottom, #ffffff00, #fff 50%);">
          <VImg :src="Banner" min-width="120%" height="40vh" position="bottom" />
          <div class="logo-center animate__animated animate__fadeInUp"></div>
        </VCard>
      </VCol>
    </VRow>
    <VRow class="my-16">
      <VCol cols="12" md="7">
        <div class="ma-5" style="position: relative;">
        <!-- <VCard style="background-color: #ffffffaa;" rounded="xl" flat> -->
          <!-- <VCardText> -->
            <div v-if="isDesktop" style="height: 90px;"></div>
            <div class="text-h4 font-weight-medium text-teal ma-3">關於我們</div>
            <p class="subtitle ma-3 me-16">
              歡迎來到台北動物醫院！我們致力於提供最優質的<br>
              醫療護理，讓毛孩子們始終保持健康和活力。
            </p>
            <p class="ma-3">
              無論是緊急情況還是預防保健，我們的專業團隊都以溫暖、同理心和專業精神對待每一位患者。從常規檢查到手術療，我們的設施配備了先進的設備和技術，以確保最佳的治療效果。<br>
              醫院的服務內容包括內外科手術、預防接種、疾病診斷和管理。我們會制定<br>
              最適合您寵物需求的治療計劃，讓您毛孩子們健康成長。
            </p>
            <VBtn to="/appoint"
              color="teal"
              rounded="pill"
              class="ma-3 px-16"
              size="large"
              append-icon="mdi-arrow-right"
              flat>
              點我掛號</VBtn>
          <!-- </VCardText> -->
        <!-- </VCard> -->
        </div>
      </VCol>
      <VCol cols="4" v-if="isMd">
        <VCard rounded="lg" flat>
          <VImg :src="Hotdog" height="500" cover></VImg>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard style="background-color: #ffffffaa;" rounded="xl" flat>
          <VCardText>
            <VRow>
              <VCol cols="12" sm="7" order="last" order-sm="first">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57831.0474529106!2d121.48458152167966!3d25.05305600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abeba6b07d31%3A0xb5f8552925b06dda!2z5Y-w5YyX5YuV54mp6Yar6Zmi!5e0!3m2!1szh-TW!2stw!4v1709110679177!5m2!1szh-TW!2stw" width="100%" height="100%" style="border:0; border-radius: 16px;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </VCol>
              <VCol cols="12" sm="5" order="first" order-sm="last">
                <div v-if="isDesktop" style="height: 180px;"></div>
                <div class="text-h4 font-weight-medium text-teal ma-3">聯絡我們</div>
                <VList style="background-color: transparent">
                  <VListItem v-for="info in contactInfo" :key="info"
                    :title="info.title" :subtitle="info.subtitle" :prepend-icon="info.icon"
                    class="mb-2">
                  </VListItem>
                </VList>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <p class="ms-3 mb-10 text-grey">&copy; Created by Hazel 2024</p>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import Banner from '@/assets/banner.png'
import Hotdog from '@/assets/hotdog.jpg'
import 'animate.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const { smAndUp, mdAndUp } = useDisplay()
const isDesktop = computed(() => smAndUp.value)
const isMd = computed(() => mdAndUp.value)

onMounted(() => {
  if (isDesktop.value) {
    gsap.to('.right-img1', {
      y: -300,
      ease: 'none',
      scrollTrigger: {
        trigger: '.overflow',
        scrub: true
      }
    })
    gsap.to('.right-img2', {
      y: -300,
      ease: 'none',
      scrollTrigger: {
        trigger: '.overflow',
        scrub: true
      }
    })
  }
})

const contactInfo = [
  {
    icon: 'mdi-map-marker',
    title: '地址',
    subtitle: '台北市松山區光復北路164號'
  },
  {
    icon: 'mdi-phone',
    title: '電話',
    subtitle: '02-2700-1234'
  },
  {
    icon: 'mdi-clock-time-four-outline',
    title: '營業時間',
    subtitle: '週二至週六 09:00 ~ 21:00'
  }

]
</script>

<style scoped lang="sass">
.overflow
  overflow: hidden
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
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
  filter: blur(10px)
.logo-right
  position: absolute
  top: 18vw
  right: calc( 10px + 10vw )
  width: 200px
  height: 200px
  background: url('@/assets/logo.png') center / cover no-repeat
.logo-center
  position: absolute
  top: 20px
  left: 50%
  transform: translateX(-50%) !important
  width: 150px
  height: 150px
  background: url('@/assets/logo.png') center / cover no-repeat
.animate__fadeInUp
  animation-duration: 2s
.arrow
  position: absolute
  top: calc( 380px + 20vw )
  left: 5vw
  width: 28px
  height: 105px
  background: url('@/assets/arrow.png') center / contain no-repeat
.right-img1
  position: absolute
  top: calc( 350px + 25vw )
  right: 0
  width: calc( 100px + 20vw )
  height: calc( 150px + 30vw )
  background: linear-gradient(rgba(0, 150, 136, 0.7), rgba(0, 150, 136, 0.7)), url('@/assets/dog-run.jpg') center / cover no-repeat
  border-radius: 16px 0 0 16px
.right-img2
  position: absolute
  top: calc( 970px + 25vw )
  right: 0
  width: calc( 100px + 12vw )
  height: calc( 100px + 12vw )
  background: url('@/assets/kitty.jpg') center / cover no-repeat
  border-radius: 8px 0 0 8px
.subtitle
  font-size: 1.2rem
  font-weight: 500
  color: #333
  line-height: 1.5
</style>
