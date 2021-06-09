import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // определяем, залогинен пользователь или нет
  const hasToken = sessionStorage.getItem('accessToken')
  if (hasToken) {
    if (to.path === '/login') {
      // если да, перенаправляем на главную страницу
      next({ path: '/' })
      NProgress.done()
    } else {
      // смотрим, есть ли роли у пользователя в store
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // если нет, получаем информацию по пользователю (в частности роль)
        // в зависимости от которой генерируем доступные маршруты
        // по этой ветке условий проходимся 1 раз
        try {
          const roles = []
          roles.push(await store.dispatch('user/getInfo'))

          // генерация доступных маршрутов
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // удаление токена и перенаправление
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // если токена нема
    if (whiteList.indexOf(to.path) !== -1) {
      // если белый список маршрутов пуст
      next()
    } else {
      // другие страницы без доступа перенаправляются на страницу логина
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
