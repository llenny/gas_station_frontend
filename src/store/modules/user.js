import { resetRouter } from '@/router'
import LoginService from '../../api/login'

const loginService = new LoginService()

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, role) => {
    state.roles.push(role)
  }
}

const actions = {
  // user login
  login({ commit }, payload) {
    commit('SET_TOKEN', payload.access_token)
    commit('SET_AVATAR', '../../assets/images/avatar/skeleton.gif')
    // return new Promise((resolve, reject) => {
    //   loginService.getTokenAsync({ username: username.trim(), password: password }).then(response => {
    //     // console.log(response)
    //     commit('SET_TOKEN', response.token)
    //     commit('SET_AVATAR', '../../assets/images/avatar/skeleton.gif')
    //     return response
    //     // resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', sessionStorage.getItem('role'))
      resolve(sessionStorage.getItem('role'))
    })
  },

  resetToken({ commit, state }) {
    sessionStorage.removeItem('accessToken')
    commit('SET_TOKEN', '')
    commit('RESET_STATE')
    resetRouter()
  },

  // user logout
  logout({ commit, state }) {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('username')
    commit('RESET_STATE')
    resetRouter()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

