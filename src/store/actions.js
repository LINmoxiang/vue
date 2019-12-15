import { reqAddress, reqFoodCategories, reqShops } from "../api";
import { RECEIVE_ADDRESS, RECEIVE_FOOD_CATEGORIES, RECEIVE_SHOPS } from "./mutation_types";

export default {
  async getAddress({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqAddress(latitude, longitude)
    const { code, data } = result
    if (code === 0) {
      commit(RECEIVE_ADDRESS, data)
    }
  },
  async getFoodCategories({ commit },callback) {
    const result = await reqFoodCategories()
    const { code, data } = result
    if (code === 0) {
      commit(RECEIVE_FOOD_CATEGORIES,data)
      typeof callback === 'function' && callback()
    }
  },
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops(latitude, longitude)
    const { code, data } = result
    if (code === 0) {
      commit(RECEIVE_SHOPS,data)
    }
  }
}