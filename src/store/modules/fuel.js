const state = {
  fuelTypes: [],
  fuels: []
}

const getters = {
  FUEL_TYPES: state => {
    return state.fuelTypes
  },
  FUELS: state => {
    return state.fuels
  }
}

const mutations = {
  SAVE_FUEL_TYPES_TO_STATE: (state, payload) => {
    state.fuelTypes = payload
  },
  SAVE_FUELS_TO_STATE: (state, payload) => {
    state.fuels = payload
  }
}

const actions = {
  SAVE_FUEL_TYPES_FROM_SERVER({ commit }, payload) {
    commit('SAVE_FUEL_TYPES_TO_STATE', payload)
  },
  SAVE_FUELS_FROM_SERVER({ commit }, payload) {
    commit('SAVE_FUELS_TO_STATE', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
