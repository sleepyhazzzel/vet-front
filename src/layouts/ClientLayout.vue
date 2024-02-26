<template>
<VNavigationDrawer v-model="drawer" temporary location="right" v-if="isPad" theme="dark">
  <VList nav>
    <template v-for="item in navItems" :key="item.to">
      <VListItem :to="item.to" v-if="item.show" exact>
        <template #prepend>
          <VIcon :icon="item.icon" />
        </template>
        <VListItemTitle>{{ item.text }}</VListItemTitle>
      </VListItem>
    </template>
    <VListItem v-if="user.isLogin" @click="logout">
      <template #prepend>
        <VIcon icon="mdi-logout" />
      </template>
      <VListItemTitle>登出</VListItemTitle>
    </VListItem>
  </VList>
</VNavigationDrawer>
<VAppBar v-if="isDesktop"
  flat
  color="rgba(255, 255, 255, 0)"
  height="80"
  scroll-behavior="fade-image inverted"
  scroll-threshold="100"
  >
  <template #image>
    <VImg gradient="45deg, #009688, #80CBC4" />
  </template>
  <VContainer class="d-flex align-center">
    <VBtn to="/" :active="false">
      <VAppBarTitle style="color: #fff;"
        class="font-weight-medium text-h5">台北動物醫院</VAppBarTitle>
    </VBtn>
    <VSpacer />
    <!-- 漢堡 -->
    <template v-if="isPad">
      <VAppBarNavIcon color="#fff" @click="drawer = true" />
    </template>
    <!-- 電腦版 -->
    <template v-else>
      <div class="navbar" :style="`--navbar-padding: ${user.isLogin ? '0px 8px' : '6px 8px'};`">
        <template v-for="item in navItems" :key="item">
          <VBtn
            :to="item.to" v-if="item.show"
            :prepend-icon="item.icon"
            color="teal"
            rounded exact>{{ item.text }}
          </VBtn>
          <VIcon color="teal" v-if="item.show">mdi-circle-small</VIcon>
        </template>
        <VBtn color="teal" rounded>
          <VBadge color="#f2a73b" dot>
            <VIcon size="large">mdi-bell</VIcon>
          </VBadge>
        </VBtn>
        <VBtn v-if="user.isLogin"
          icon="mdi-logout"
          color="grey"
          @click="logout" />
      </div>
    </template>
  </VContainer>
</VAppBar>
<VMain :class="{
  'bg-grey-lighten-3': route.name === 'Account' || route.name === 'Appoint',
  'pa-0': true }">
  <RouterView />
</VMain>
<!-- 手機版 -->
<VFooter v-if="isMobile">
  <VRow class="overflow-visible" style="height: 56px;">
    <VBottomNavigation bg-color="teal" v-model="selectedNavItem">
      <template v-for="item in navItems" :key="item">
        <VBtn v-if="item.show" :to="item.to" exact>
          <VIcon>{{ item.icon }}</VIcon>
          <span>{{ item.text }}</span>
        </VBtn>
      </template>
    </VBottomNavigation>
  </VRow>
</VFooter>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const drawer = ref(false)
const selectedNavItem = ref(0)
const route = useRoute()
const router = useRouter()
const user = useUserStore()
const createSnackbar = useSnackbar()
const { apiAuth } = useApi()
const { xs, sm, smAndUp } = useDisplay()
const isDesktop = computed(() => smAndUp.value)
const isPad = computed(() => sm.value)
const isMobile = computed(() => xs.value)

const navItems = computed(() => {
  return [
    { to: '/', text: '首頁', show: isPad.value, icon: 'mdi-home' },
    { to: '/appoint', text: '預約掛號', show: true, icon: 'mdi-calendar' },
    { text: '看診進度', show: true, icon: 'mdi-calendar-search' },
    { to: '/setup', text: '註冊登入', show: !user.isLogin, icon: 'mdi-login-variant' },
    { to: '/account', text: '個人帳號', show: user.isLogin, icon: 'mdi-account' }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
    router.push('/')
  } catch (error) {
    const text = error?.responce?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'warning',
        location: 'bottom'
      }
    })
  }
}
</script>

<style scoped lang="sass">
.navbar
  background-color: #fff
  padding: var(--navbar-padding, 6px 8px)
  border-radius: 30px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)

.p-0
  padding-top: 0 !important
</style>
