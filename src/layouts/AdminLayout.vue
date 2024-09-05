<template>
<VNavigationDrawer theme="dark"
  v-model="drawer"
  :rail="rail"
  @click="rail=false"
  permanent>
  <VList v-if="admin.isAdminLogin">
    <VListItem
      :title="admin.account"
      :subtitle="admin.position">
      <template #prepend>
        <Avatar
          :name="admin.account"
          :variant="'beam'"
          :size="30"
          :colors="['#545454', '#7B8A84', '#B2DFDB', '#EDE7D5', '#B7CC18']"
        />
      </template>
      <template #append>
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
    <template v-for="item in navItems" :key="item">
      <VListItem v-if="item.show && !item.group"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.text"
        exact>
      </VListItem>
      <VListGroup v-if="item.show && item.group">
        <template #activator="{ props }">
          <VListItem v-bind="props"
            :prepend-icon="item.icon"
            :title="item.text"
            exact />
        </template>
        <template v-for="child in item.children" :key="child">
          <VListItem
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
import { useRouter } from 'vue-router'
// import { useDisplay } from 'vuetify'
import Avatar from 'vue-boring-avatars'
import BreadCrumb from '@/components/admin/BreadCrumb.vue'

const drawer = ref(true)
const rail = ref(false)
const admin = useAdminStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const router = useRouter()
// const { smAndUp } = useDisplay()

// const isDesktop = computed(() => smAndUp.value)

// rail.value = computed(() => {
//   // rail.value = false 代表是展開狀態
//   // 如果是不是展開(rail.value = true)，不繼續執行
//   if (rail.value) return

//   // 如果是桌機以上，展開
//   // 如果是手機，收起
//   if (isDesktop.value) {
//     return false
//   } else {
//     return true
//   }
// })

const navItems = computed(() => {
  return [
    { to: '/admin', text: '管理員登入', show: !admin.isAdminLogin, icon: 'mdi-login-variant', group: false },
    { text: '病歷管理', show: admin.isAdminLogin, icon: 'mdi-file-document-multiple-outline', group: true,
      children: [
        { to: '/admin/medical-data/new', text: '新增病例', show: true },
        { to: '/admin/medical-data', text: '病歷總覽', show: true }
      ]
    },
    { text: '掛號管理', show: admin.isAdminLogin, icon: 'mdi-calendar', group: true,
      children: [
        { to: '/admin/appointment', text: '掛號資訊', show: true },
        { to: '/admin/appointment/system', text: '掛號系統', show: true }
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
