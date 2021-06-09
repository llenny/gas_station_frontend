import ApiService from '../../api/services'
const apiService = new ApiService()

const getDefaultState = () => {
  return {
    deliveryItems: [],
    deliveries: [],
    deliveriesItemsOfDelivery: []
  }
}

const state = getDefaultState()

const getters = {
  DELIVERY_ITEMS: state => {
    return state.deliveryItems
  },
  DELIVERIES: state => {
    return state.deliveries
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

const mutations = {
  ADD_DELIVERY_ITEM: (state, payload) => {
    const { FuelId } = payload

    state.deliveryItems = state.deliveryItems.concat({ ...payload })
  },
  REMOVE_DELIVERY_ITEM: (state, index) => {
    state.deliveryItems.splice(index, 1)
  },
  SET_DELIVERY_ITEM: (state, payload) => {
    state.deliveryItems.forEach((item) => {
      if (item.itemId === payload.itemId) {
        // item.FuelType = payload.FuelType
        item.FuelId = payload.FuelId
        item.Price = payload.Price
        item.UpdateDate = payload.UpdateDate
      }
    })
  },
  SAVE_DELIVERY: (state, payload) => {
    state.deliveries = state.deliveries.concat(payload)
  },
  TAKE_DELIVERY(state, index) {
    state.deliveries.forEach((item) => {
      if (item.id === index) {
        item.status = true
      }
    })
  },
  SAVE_DELIVERY_ITEMS_TO_STATE: (state, payload) => {
    state.deliveries = payload
  },
  RESET_DELIVERY_ITEMS_FROM_STATE: (state) => {
    state.deliveryItems = []
  }
}

const actions = {
  GET_DELIVERY_ITEMS: (context) => {
    apiService.getDeliveryItemsOfDelivery((result) => {
      console.log(result.data)
      context.commit('SAVE_DELIVERY_ITEMS_TO_STATE', result.data)
    })
  },
  // добавление единицы поставки в store
  ADD_DELIVERY_ITEM({ commit }, payload) {
    console.log('in SAVE_DELIVERY_ITEM')
    commit('ADD_DELIVERY_ITEM', payload)
  },
  // удаление единицы поставки из store
  DELETE_DELIVERY_ITEM({ commit }, index) {
    commit('REMOVE_DELIVERY_ITEM', index)
  },
  // изменение единицы поставки в store
  CHANGE_DELIVERY_ITEM({ commit }, payload) {
    commit('SET_DELIVERY_ITEM', payload)
  },
  // подтверждение поставки с отправкой на сервер
  CONFIRM_DELIVERY({ commit }, payload) {
    // вычисляем общую сумму поставки
    const SumOfDelivery = state.deliveryItems.reduce((sum, { Sum }) => sum + Sum, 0)
    // формируем объект поставки для отправки
    const sendDelivery = {
      EmployeeId: 2,
      Status: false,
      Sum: SumOfDelivery,
      EndBy: null,
      EndDate: null,
      ...payload }
    // отправляем на сервер данные по заявке и получаем сгенерированный id
    apiService.Post('/Deliveries', sendDelivery)
      .then(async(result) => {
        commit('SAVE_DELIVERY', sendDelivery)
        return await JSON.stringify(result.data.id)
      })
      // после получения id заявки передаем на сервер все, что в нее входит
      .then((delivery_id) => {
        state.deliveryItems.forEach(({ CreateDate, UpdateDate, Price, FuelId, Value, Sum }) => {
          // формируем объект для отправки единицы поставки
          const sendItem = { DeliveryId: delivery_id, CreateDate, UpdateDate, Price, FuelId, Value, Sum }
          // постим единицу поставки на сервер
          apiService.Post('/DeliveryItems', sendItem)
            .then((result) => {
              commit('RESET_STATE')
              return result
            })
        })
      })
      .catch((error) => {
        console.log(error)
      })
    commit('SAVE_DELIVERY', payload)
  },
  // принимаем заявку
  TAKE_DELIVERY({ commit }, index) {
    commit('TAKE_DELIVERY', index)
  },
  RESET_DELIVERY_ITEMS({ commit }) {
    commit('RESET_DELIVERY_ITEMS_FROM_STATE')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
