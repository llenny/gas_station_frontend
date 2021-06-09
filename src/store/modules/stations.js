import ApiService from '@/api/services'
const apiService = new ApiService()

const state = {
  stations: []
}

const getters = {
  // заправочные станции
  STATIONS: state => {
    return state.stations
  }
}

const mutations = {
  // сохраняем полученные с помощью api станции в state
  SAVE_STATIONS_TO_STATE(state, payload) {
    state.stations = payload
  }
}

const actions = {
  // получение станций с сервера
  GET_STATIONS_FROM_API({ commit }) {
    // запрашиваем станции с сервера
    const stations = apiService.Post('/Stations')
      .then((result) => {
        return result.data
      })
      .then((data) => {
        return data.id
      })
    commit.SAVE_STATIONS_TO_STATE(stations)
  },
  SAVE_STATIONS_FROM_SERVER({ commit }, payload) {
    commit('SAVE_STATIONS_TO_STATE', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
