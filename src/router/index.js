// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useAdminStore } from '@/store/admin'

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
        path: 'status',
        name: 'Status',
        component: () => import('@/views/client/ClinicStatus.vue'),
        meta: {
          title: '台北動物醫院 | 看診進度'
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
          title: '台北動物醫院 | 個人帳號',
          name: '個人帳號'
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
        name: 'AdminLogin',
        component: () => import('@/views/admin/AdminLogin.vue'),
        meta: {
          title: '台北動物醫院｜管理員登入',
          name: '管理員登入'
        }
      },
      {
        path: 'medical-data',
        name: 'MedicalLayout',
        component: () => import('@/layouts/MedicalLayout.vue'),
        meta: {
          title: '台北動物醫院｜病歷管理',
          name: '病歷管理'
        },
        children: [
          {
            path: '',
            name: 'MedicalData',
            component: () => import('@/views/admin/MedicalData.vue'),
            meta: {
              title: '台北動物醫院｜病歷總覽',
              name: '病歷總覽'
            }
          },
          {
            path: 'new',
            name: 'NewMedical',
            component: () => import('@/views/admin/NewMedical.vue'),
            meta: {
              title: '台北動物醫院｜新增病例',
              name: '新增病例'
            }
          },
          {
            path: ':id',
            name: 'MedicalDetail',
            component: () => import('@/views/admin/MedicalDetail.vue'),
            meta: {
              title: '台北動物醫院｜病歷詳情',
              name: '病歷詳情'
            }
          }
        ]
      },
      {
        path: 'appointment',
        name: 'AppointmentLayout',
        component: () => import('@/layouts/AppointmentLayout.vue'),
        meta: {
          title: '台北動物醫院｜掛號管理',
          name: '掛號管理'
        },
        children: [
          {
            path: '',
            name: 'AppointmentData',
            component: () => import('@/views/admin/AppointData.vue'),
            meta: {
              title: '台北動物醫院｜掛號資訊',
              name: '掛號資訊'
            }
          },
          {
            path: 'system',
            name: 'AppointmentSystem',
            component: () => import('@/views/admin/AppointSystem.vue'),
            meta: {
              title: '台北動物醫院｜掛號系統',
              name: '掛號系統'
            }
          },
          {
            path: ':id',
            name: 'AppointmentDetail',
            component: () => import('@/views/admin/MedicalDetail.vue'),
            meta: {
              title: '台北動物醫院｜病歷資料',
              name: '病歷資料'
            }
          }
        ]
      },
      {
        path: 'setting',
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

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  const admin = useAdminStore()

  if (from === START_LOCATION) {
    if (admin.token && to.path.includes('/admin')) {
      await admin.getProfile()
    } else if (user.token) {
      await user.getProfile()
    }
  }

  if (to.path.includes('/admin')) {
    if (admin.isAdminLogin && to.meta.name === '管理員登入') {
      // 如果已登入，要去登入頁，重新導向管理員設定
      next('/admin/setting')
    } else if (!admin.isAdminLogin && to.path.includes('/admin/')) {
      // 如果沒登入，但是要去的頁面要登入，重新導向登入頁
      next('/admin')
    } else {
      // 不重新導向
      next()
    }
  } else {
    if (user.isLogin && to.path.includes('/setup')) {
      // 如果已登入，要去註冊或登入頁，重新導向首頁
      next('/')
    } else if (!user.isLogin && to.path.includes('/account')) {
      // 如果沒登入，但是要去的頁面要登入，重新導向登入頁
      next('/setup')
    } else {
      // 不重新導向
      next()
    }
  }
})

export default router
