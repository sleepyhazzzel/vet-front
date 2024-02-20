<template>
<VNavigationDrawer theme="dark"
  v-model="drawer"
  :rail="rail"
  @click="rail=false"
  permanent>
  <VList v-if="admin.isAdminLogin">
    <VListItem
      :prepend-avatar="prependAdvatar"
      :title="admin.account"
      :subtitle="admin.position">
      <template v-slot:append>
        <VBtn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></VBtn>
      </template>
    </VListItem>
  </VList>
  <VDivider />
  <VList nav>
    <template v-for="item in navItems" :key="item.to">
      <VListItem v-if="item.show && !item.group"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.text" exact>
      </VListItem>
      <VListGroup v-if="item.show && item.group">
        <template v-slot:activator="{ props }">
          <VListItem v-bind="props"
            :prepend-icon="item.icon"
            :title="item.text"
            exact />
        </template>
        <template v-for="child in item.children" :key="child.to">
          <VListItem
            v-if="child.show"
            :to="child.to"
            :title="child.text"
            exact />
        </template>
      </VListGroup>
    </template>
    <VListItem v-if="admin.isAdminLogin" @click="logout" title="登出" prepend-icon="mdi-logout" />
  </VList>
</VNavigationDrawer>

<VMain class="bg-grey-lighten-2">
  <BreadCrumb />
  <RouterView />
</VMain>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '@/store/admin'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios-admin'
import { useRoute, useRouter } from 'vue-router'
import BreadCrumb from '@/components/admin/BreadCrumb.vue'

const drawer = ref(true)
const rail = ref(false)
const admin = useAdminStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const route = useRoute()
const router = useRouter()

const prependAdvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${admin.account}?colors=545454,7B8A84,B2DFDB,EDE7D5,B7CC18`
})

const navItems = computed(() => {
  return [
    { to: '/admin', text: '管理員登入', show: !admin.isAdminLogin, icon: 'mdi-login-variant', group: false },
    { text: '病歷管理', show: admin.isAdminLogin, icon: 'mdi-file-document-multiple-outline', group: true,
      children: [
        { to: '/admin/medical-data/new', text: '新增病例', show: true },
        { to: '/admin/medical-data', text: '病歷總覽', show: true },
        { to: '/admin/medical-data/:id', text: '病歷詳情', show: route.meta.name === '病歷詳情' }
      ]
    },
    { text: '掛號管理', show: admin.isAdminLogin, icon: 'mdi-calendar', group: true,
      children: [
        { to: '/admin/appointment', text: '掛號資訊', show: true },
        { to: '/admin/appointment/system', text: '掛號系統', show: true },
        { to: '/admin/appointment/:id', text: '病歷資料', show: route.meta.name === '病歷資料' }
      ]
    },
    { to: '/admin/setting', text: '管理員設定', show: admin.isAdminLogin, icon: 'mdi-cog', group: false }
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
</script>
