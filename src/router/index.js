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
    name: 'Admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {
      title: '台北動物醫院｜後台管理',
      name: '後台管理'
    },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '台北動物醫院｜管理首頁',
          name: '管理首頁'
        }
      },
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('@/views/admin/AdminLogin.vue'),
        meta: {
          title: '台北動物醫院｜管理員登入',
          name: '管理員登入'
        }
      },
      {
        path: 'new-medical',
        name: 'NewMedical',
        component: () => import('@/views/admin/NewMedical.vue'),
        meta: {
          title: '台北動物醫院｜新增病例',
          name: '新增病例'
        }
      },
      {
        path: 'medical-data',
        name: 'MedicalData',
        component: () => import('@/views/admin/MedicalData.vue'),
        meta: {
          title: '台北動物醫院｜病歷總覽',
          name: '病歷總覽'
        }
      },
      {
        path: 'appointment-data',
        name: 'AppointmentData',
        component: () => import('@/views/admin/AppointData.vue'),
        meta: {
          title: '台北動物醫院｜掛號資訊',
          name: '掛號資訊'
        }
      },
      {
        path: 'appointment-system',
        name: 'AppointmentSystem',
        component: () => import('@/views/admin/AppointSystem.vue'),
        meta: {
          title: '台北動物醫院｜掛號系統',
          name: '掛號系統'
        }
      },
      {
        path: 'admin-setting',
        name: 'AdminSetting',
        component: () => import('@/views/admin/AdminSetting.vue'),
        meta: {
          title: '台北動物醫院｜管理員設定',
          name: '管理員設定'
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
