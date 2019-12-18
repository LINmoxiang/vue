import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqAutoLogin,
  reqGoods,
  reqInfo,
  reqRatings
} from "../api";
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOPS,
  SAVE_USER,
  SAVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  SAVE_GOODS,
  SAVE_RATINGS,
  SAVE_INFO
} from "./mutation_types";

export default {
  //获取地址
  async getAddress({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqAddress(latitude, longitude)
    const { code, data } = result
    if (code === 0) {
      commit(RECEIVE_ADDRESS, data)
    }
  },

  //获取分类
  async getFoodCategories({ commit }, callback) {
    const result = await reqFoodCategories()
    const { code, data } = result
    if (code === 0) {
      commit(RECEIVE_FOOD_CATEGORIES, data)
      typeof callback === 'function' && callback()
    }
  },

  //获取商家列表
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops(latitude, longitude)
    const { code, data } = result
    if (code === 0) {
      commit(RECEIVE_SHOPS, data)
    }
  },

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
  },

  async getGoods({ commit }, cb) {
    const result = await reqGoods()
    if(result.code === 0){
      commit(SAVE_GOODS,result.data)
    }
    typeof cb === 'function' && cb()
  },

  async getRatings({ commit }, cb) {
    const result = await reqRatings()
    if(result.code === 0){
      commit(SAVE_RATINGS,result.data)
    }
    typeof cb === 'function' && cb()
  },

  async getInfo({ commit }, cb) {
    const result = await reqInfo()
    if(result.code === 0){
      commit(SAVE_INFO,result.data)
    }
    typeof cb === 'function' && cb()
  }
}