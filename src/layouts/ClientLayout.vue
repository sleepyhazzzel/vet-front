<template>
<VNavigationDrawer v-model="drawer" temporary location="right" v-if="isPad">
  <VList nav>
    <template v-for="item in navItems" :key="item.to">
      <VListItem :to="item.to" v-if="item.show">
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
<VAppBar color="teal" v-if="isDesktop">
  <VContainer class="d-flex align-center">
    <VBtn to="/" :active="false">
      <VAppBarTitle>台北動物醫院</VAppBarTitle>
    </VBtn>
    <VSpacer />
    <!-- 手機版 -->
    <template v-if="isPad">
      <VAppBarNavIcon @click="drawer = true" />
    </template>
    <!-- 電腦版 -->
    <template v-else>
      <template v-for="item in navItems" :key="item">
        <VBtn
          :to="item.to" v-if="item.show"
          :prepend-icon="item.icon" exact>{{ item.text }}</VBtn>
      </template>
    </template>
  </VContainer>
</VAppBar>
<VMain>
  <RouterView />
</VMain>
<!-- 手機版 -->
<VFooter v-if="isMobile">
  <VRow class="overflow-visible" style="height: 56px;">
    <VBottomNavigation mode="shift" bg-color="teal" v-model="selectedNavItem">
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

import { useUserStore } from '@/store/user'

const drawer = ref(false)
const selectedNavItem = ref(0)

const user = useUserStore()
const { xs, sm, smAndUp } = useDisplay()
const isDesktop = computed(() => smAndUp.value)
const isPad = computed(() => sm.value)
const isMobile = computed(() => xs.value)

const navItems = computed(() => {
  return [
    { to: '/', text: '首頁', show: true, icon: 'mdi-home' },
    { to: '/appoint', text: '預約掛號', show: true, icon: 'mdi-calendar-multiselect' },
    { to: '/hospital', text: '急診醫院查詢', show: true, icon: 'mdi-hospital-building' },
    { to: '/setup', text: '註冊登入', show: !user.isLogin, icon: 'mdi-login-variant' },
    { to: '/account', text: '個人帳號', show: user.isLogin, icon: 'mdi-account' }
  ]
})
</script>
