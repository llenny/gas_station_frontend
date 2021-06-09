import ApiService from '@/api/services'
const apiService = new ApiService()

const state = {
  orders: []
}

const getters = {
  // все заказы
  ORDERS: (state) => {
    return state.orders
  }
}

const mutations = {
  GET_ORDERS(state, payload) {
    this.state.orders = payload
  },
  ADD_ORDER(state, payload) {
    this.state.orders.push(payload)
  }
}

const actions = {
  GET_ORDERS_FROM_API({ commit }) {
    const payload = apiService.Get('Orders')
    commit.GET_ORDERS(payload)
  },
  CREATE_ORDER({ commit }, payload) {
    // отправляем данные по заказу на сервер
    const orderId = apiService.Post('/Orders', { ...payload })
      .then((result) => {
        console.log(result.data)
        return result.data
      })
      .then((data) => {
        console.log(data.id)
        return data.id
      })
    // добавляем новый заказ в state
    commit.ADD_ORDER({ orderId, ...payload })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
