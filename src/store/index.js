import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import delivery from './modules/delivery'
import orders from './modules/orders'
import fuel from './modules/fuel'
import filling_columns from './modules/filling_columns'
import stations from './modules/stations'
import pricelist from './modules/pricelist'
import news from './modules/news'
import permission from './modules/permission'
import employees from '@/store/modules/employees'
import positions from '@/store/modules/positions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    delivery,
    orders,
    fuel,
    filling_columns,
    stations,
    pricelist,
    news,
    permission,
    employees,
    positions
  },
  getters
})

export default store
