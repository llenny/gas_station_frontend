const state = {
  positions: []
}

const getters = {
  POSITIONS: state => {
    return state.positions
  }
}

const mutations = {
  SAVE_POSITIONS_TO_STATE: (state, payload) => {
    state.positions = payload
  }
}

const actions = {
  SAVE_POSITIONS_FROM_SERVER({ commit }, payload) {
    console.log('in pos')
    console.log(payload)
    commit('SAVE_POSITIONS_TO_STATE', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
