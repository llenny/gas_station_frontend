const state = {
  fillingColumns: []
}

const getters = {
  // колонки всех заправочных станций
  FILLING_COLUMNS: (state) => {
    return state.fillingColumns
  }
}

const mutations = {
  SAVE_FILLING_COLUMNS_TO_STATE: (state, payload) => {
    state.fillingColumns = payload
  }
}

const actions = {
  SAVE_FILLING_COLUMNS_FROM_SERVER({ commit }, payload) {
    commit('SAVE_FILLING_COLUMNS_TO_STATE', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
