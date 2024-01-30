// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/ClientLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/client/HomeView.vue'),
        meta: {
          title: '台北動物醫院'
        }
      },
      {
        path: 'appoint',
        name: 'Appoint',
        component: () => import('@/views/client/AppointView.vue'),
        meta: {
          title: '台北動物醫院 | 預約掛號'
        }
      },
      {
        path: 'hospital',
        name: 'Hospital',
        component: () => import('@/views/client/HospitalView.vue'),
        meta: {
          title: '台北動物醫院 | 醫院查詢'
        }
      },
      {
        path: 'setup',
        name: 'Setup',
        component: () => import('@/views/client/SetupView.vue'),
        meta: {
          title: '台北動物醫院 | 註冊登入'
        }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/client/AccountView.vue'),
        meta: {
          title: '台北動物醫院 | 個人帳號'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '台北動物醫院｜管理首頁'
        }
      },
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('@/views/admin/AdminLogin.vue'),
        meta: {
          title: '台北動物醫院｜管理員登入'
        }
      },
      {
        path: 'medical-record',
        name: 'MedicalRecord',
        component: () => import('@/views/admin/MedicalRecord.vue'),
        meta: {
          title: '台北動物醫院｜病歷總覽'
        }
      },
      {
        path: 'appointment-list',
        name: 'AppointmentList',
        component: () => import('@/views/admin/AppointView.vue'),
        meta: {
          title: '台北動物醫院｜掛號管理'
        }
      },
      {
        path: 'admin-setting',
        name: 'AdminSetting',
        component: () => import('@/views/admin/AdminSetting.vue'),
        meta: {
          title: '台北動物醫院｜管理員設定'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
