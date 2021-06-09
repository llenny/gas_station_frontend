import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 *
 * hidden: true                   контроль отображения в меню
 * alwaysShow: true               всегда показывать
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'            используется <keep-alive>
 * meta : {
    roles: ['admin','editor']    указание ролей, которым доступны маршруты
    title: 'title'               наименование маршрута, показываемое в меню
    icon: 'svg-name'/'el-icon-x' иконка для меню
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  выделение активного меню
  }
 */

/**
 для этих маршрутов не требуются никакие права и разрешения
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/registration',
    component: () => import('@/views/login/registration'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Главная',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Главная', icon: 'dashboard' }
    }]
  }
]
/**
 маршруты, доступ к которым контролируется заданной ролью
 */
export const asyncRoutes = [
  {
    path: '/delivery',
    component: Layout,
    redirect: '/delivery/delivery',
    name: 'Заявки',
    meta: { title: 'Заявки', icon: 'truck', roles: ['employee'] },
    children: [
      {
        path: 'delivery-history',
        name: 'delivery',
        component: () => import('@/views/delivery/delivery-history'),
        meta: { title: 'Активные', icon: 'checklist', roles: ['employee'] }
      },
      {
        path: 'create_delivery',
        name: 'create_delivery',
        component: () => import('@/views/delivery/create-delivery'),
        meta: { title: 'Создать заявку', icon: 'pencil' }
      }
    ]
  },

  {
    path: '/manageStation',
    component: Layout,
    redirect: '/manage_station/manage_station',
    name: 'Управление станцией',
    meta: { title: 'Управление станцией', icon: 'manage' },
    children: [
      {
        path: 'fillingColumns',
        name: 'fillingColumns',
        component: () => import('@/views/manage_station/filling_columns'),
        meta: { title: 'Управление колонками', icon: 'gasoline-pump' }
      },
      {
        path: 'pricelist',
        name: 'pricelist',
        component: () => import('@/views/manage_station/pricelist'),
        meta: { title: 'Прайслист', icon: 'price-tag' }
      },
      {
        path: 'storage',
        name: 'storage',
        component: () => import('@/views/manage_station/storage'),
        meta: { title: 'Склад', icon: 'box', roles: ['employee'] }
      }
    ]
  },

  {
    path: '/orders',
    component: Layout,
    redirect: '/order_panel/order_panel',
    name: 'Заказы',
    meta: { title: 'Заказы', icon: 'shopping-cart', roles: ['client', 'employee'] },
    children: [
      {
        path: 'order_history',
        name: 'order_history',
        component: () => import('@/views/order_panel/order_history'),
        meta: { title: 'История заказов', icon: 'checklist', roles: ['client', 'employee'] }
      },
      {
        path: 'create_order',
        name: 'create_order',
        component: () => import('@/views/create_order/create_order'),
        meta: { title: 'Сделать заказ', icon: 'shopping-list', roles: ['client', 'employee'] }
      }
    ]
  },

  {
    path: '/admin_panel',
    component: Layout,
    name: 'admin_panel',
    meta: { title: 'Панель администратора', icon: 'truck'},
    children: [
      {
        path: 'admin_panel/employees_list',
        name: 'employees_list',
        component: () => import('@/views/admin_panel/employees_list'),
        meta: { title: 'Сотрудники', icon: 'checklist' }
      },
      {
        path: 'admin_panel',
        name: 'admin_panel',
        component: () => import('@/views/admin_panel/'),
        meta: { title: 'Что-то админское', icon: 'checklist' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Обратная связь', icon: 'form', roles: ['client'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
