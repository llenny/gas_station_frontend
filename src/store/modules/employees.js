import ApiService from '@/api/services'
const apiService = new ApiService()

const state = {
  employees: [
    { id: 1, name: 'asf saf asf', status: true, position: 'pos1', station: 's1' },
    { id: 2, name: 'slakf slfaj bnb', status: true, position: 'pos2', station: 's2' },
    { id: 3, name: 'lskaf l;af zv', status: false, position: 'pos1', station: 's4' },
    { id: 4, name: '.asgm ;b as;f', status: true, position: 'pos5', station: 's3' },
    { id: 5, name: 'qtuoq b.l;k aifo', status: false, position: 'pos4', station: 's1' }
  ]
}

const getters = {
  // заправочные станции
  EMPLOYEES: state => {
    return state.employees
  }
}

const mutations = {
  // сохраняем полученные с помощью api станции в state
  SAVE_EMPLOYEES_TO_STATE(state, payload) {
    state.employees = payload
  }
}

const actions = {
  // получение станций с сервера
  GET_EMPLOYEES_FROM_API({ commit }) {
    // запрашиваем станции с сервера
    const stations = apiService.Post('/Employees')
      .then((result) => {
        return result.data
      })
      .then((data) => {
        return data.id
      })
    commit.SAVE_EMPLOYEES_TO_STATE(stations)
  },
  SAVE_EMPLOYEES_FROM_SERVER({ commit }, payload) {
    commit('SAVE_EMPLOYEES_TO_STATE', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
