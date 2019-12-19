import {
  reqAddress,
  reqFoodCategories,
  reqShops,
} from "../../api";

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOPS,
} from "../mutation_types";

export default {
  state: {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
  },
  actions: {
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
    }
  },
  mutations: {
    [RECEIVE_ADDRESS](state, address) {
      state.address = address
    },
    [RECEIVE_FOOD_CATEGORIES](state, categorys) {
      state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, shops) {
      state.shops = shops
    }
  },
  getters: {}
}