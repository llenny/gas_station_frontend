const state = {
  pricelist: []
}

const getters = {
  PRICELIST: state => {
    return state.pricelist
  }
}

const mutations = {
  SAVE_PRICELIST_TO_STATE: (state, payload) => {
    state.pricelist = payload
  }
}

const actions = {
  SAVE_PRICELIST_FROM_SERVER({ commit }, payload) {
    commit('SAVE_PRICELIST_TO_STATE', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
