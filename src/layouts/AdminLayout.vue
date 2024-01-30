<template>
<VNavigationDrawer theme="dark" permanent>
  <VList v-if="admin.isAdminLogin">
    <VListItem
      :prepend-avatar="prependAdvatar"
      :title="admin.account"
      :subtitle="admin.position" />
  </VList>
  <VDivider />
  <VList nav>
    <template v-for="item in navItems" :key="item.to">
      <VListItem v-if="item.show"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.text" exact />
    </template>
    <VListItem v-if="admin.isAdminLogin" @click="logout" title="登出" prepend-icon="mdi-logout" />
  </VList>
</VNavigationDrawer>
<VMain class="bg-grey-lighten-2">
  <VBreadcrumbs :items="breadcrumbs" class="breadcrumbs">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right" size="small"></v-icon>
    </template>
  </VBreadcrumbs>
  <RouterView />
</VMain>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminStore } from '@/store/admin'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios-admin'
import { useRouter } from 'vue-router'

const admin = useAdminStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const router = useRouter()

const prependAdvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${admin.account}?colors=545454,7B8A84,B2DFDB,EDE7D5,B7CC18`
})

const navItems = computed(() => {
  return [
    { to: '/admin', text: '管理員首頁', show: true, icon: 'mdi-home' },
    { to: '/admin/login', text: '管理員登入', show: !admin.isAdminLogin, icon: 'mdi-login-variant' },
    { to: '/admin/medical-record', text: '病歷總覽', show: admin.isAdminLogin, icon: 'mdi-list-box' },
    { to: '/admin/appointment-list', text: '掛號管理', show: admin.isAdminLogin, icon: 'mdi-calendar-clock' },
    { to: '/admin/admin-setting', text: '管理員設定', show: admin.isAdminLogin, icon: 'mdi-cog' }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/admins/logout')
    admin.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
    router.push('/admin')
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

const breadcrumbs = computed(() => {
  return [
    { title: '管理員首頁', disabled: false, href: '/admin' },
    { title: '管理員登入', disabled: false, href: '/admin/login' }
  ]
})
</script>

<style scoped lang="sass">
.breadcrumbs
  margin: 5px 0 0 10px
  font-size: 0.9rem
  font-weight: 500
  color: teal
</style>
