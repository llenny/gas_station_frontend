const state = {
  news: [
    { id: 1, title: 'Новость 1', descr: 'Новостная новость 1', image: require('../../assets/images/gasoline.png') },
    { id: 2, title: 'Новость 2', descr: 'Новостная новость 2', image: require('../../assets/images/1.jpg') },
    { id: 3, title: 'Новость 3', descr: 'Новостная новость 3', image: require('../../assets/images/2.jpg') },
    { id: 4, title: 'Новость 4', descr: 'Новостная новость 4', image: require('../../assets/images/3.jpg') },
    { id: 5, title: 'Новость 5', descr: 'Новостная новость 5', image: require('../../assets/images/4.jpg') }
  ]
}

const getters = {
  NEWS: state => {
    return state.news
  }
}

const mutations = {
  SAVE_NEWS_ITEM_TO_STATE: (state, payload) => {
    state.news.push(payload)
  }
}

const actions = {
  SAVE_NEWS_FROM_SERVER({ commit }, payload) {
    commit('SAVE_FUEL_TYPES_TO_STATE', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
