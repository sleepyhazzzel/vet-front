<template>
  <VContainer class="pa-0">
    <VLayout>
      <VNavigationDrawer>
        <VList>
          <VListItem
            :prepend-avatar="prependAdvatar"
            :title="user.user_name"
            :subtitle="user.email"
          ></VListItem>
        </VList>
        <VDivider />
        <VList density="compact" nav>
          <VListItem prepend-icon="mdi-folder" title="My Files" value="myfiles"></VListItem>
          <VListItem prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></VListItem>
          <VListItem prepend-icon="mdi-star" title="Starred" value="starred"></VListItem>
          <VListItem prepend-icon="mdi-logout" title="登出" @click="logout"></VListItem>
        </VList>
      </VNavigationDrawer>
      <VMain style="height: 250px"></VMain>
    </VLayout>
  </VContainer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'

const user = useUserStore()
const createSnackbar = useSnackbar()
const { apiAuth } = useApi()
const router = useRouter()

const prependAdvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=545454,7B8A84,B2DFDB,EDE7D5,B7CC18`
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
