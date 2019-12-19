import {
  reqAutoLogin,
} from "../../api";

import {
  SAVE_USER,
  SAVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
} from "../mutation_types";

export default {
  state: {
    user: {},
    token: localStorage.getItem('token_key') || ''
  },
  actions: {
    //保存用户
    saveUser({ commit }, user) {
      const token = user.token
      delete user.token //删除user中的token
      commit(SAVE_USER, user)
      commit(SAVE_TOKEN, token)
      //将token保存到localstorage中
      localStorage.setItem('token_key', token)
    },

    //自动登录
    async autoLogin({ commit, state }) {
      //当有token且没有user用户信息时，需要自动登录
      if (state.token && !state.user.id) {
        const result = await reqAutoLogin()
        if (result.code === 0) {
          commit(SAVE_USER, result.data)
        }
      }
    },

    //退出登录
    logOut({ commit }) {
      localStorage.removeItem('token_key')
      commit(RESET_USER)
      commit(RESET_TOKEN)
    }
  },
  mutations: {
    //保存user信息
    [SAVE_USER](state, user) {
      state.user = user
    },
    //保存token
    [SAVE_TOKEN](state, token) {
      state.token = token
    },
    //删除user信息
    [RESET_USER](state) {
      state.user = []
    },
    //删除token
    [RESET_TOKEN](state) {
      state.token = ''
    }
  },
  getters: {}
}