import Vue from 'vue'

import {
  // reqGoods,
  // reqInfo,
  // reqRatings
  reqShop
} from "../../api"

import {
  // SAVE_GOODS,
  // SAVE_RATINGS,
  // SAVE_INFO,
  SAVE_SHOP,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from "../mutation_types";

export default {
  state: {
    // goods: [],
    // info: {},
    // ratings: [],
    shop:{},
    cartFoods: []
  },
  actions: {
    // //获取商店食品
    // async getGoods({ commit }, cb) {
    //   const result = await reqGoods()
    //   if (result.code === 0) {
    //     commit(SAVE_GOODS, result.data)
    //   }
    //   typeof cb === 'function' && cb()
    // },

    // //获取商店评论
    // async getRatings({ commit }, cb) {
    //   const result = await reqRatings()
    //   if (result.code === 0) {
    //     commit(SAVE_RATINGS, result.data)
    //   }
    //   typeof cb === 'function' && cb()
    // },

    // //获取商店信息
    // async getInfo({ commit }, cb) {
    //   const result = await reqInfo()
    //   if (result.code === 0) {
    //     commit(SAVE_INFO, result.data)
    //   }
    //   typeof cb === 'function' && cb()
    // },
    
    //获取商铺信息
    async getShop({commit,state},id){
      //若点击进入相同的商铺，不发送请求，从状态中读取数据
      if(state.shop.id == id){
        return 
      }

      //若点击进入相不同的商铺，则清空状态的数据
      if(state.shop.id){
        commit(SAVE_SHOP,{})
      }

      //发送请求获取商家信息并更新状态
      const result = await reqShop(id)
        if(result.code === 0){
          const shop = result.data
          commit(SAVE_SHOP,{shop})
        }
      },

    //更新食品的点购数量
    updateFoodCount({ commit }, { isAdd, food }) {
      if (isAdd) {
        commit(ADD_FOOD_COUNT, { food })
      } else {
        commit(REDUCE_FOOD_COUNT, { food })
      }
    }
  },
  mutations: {
    // //保存店铺商品
    // [SAVE_GOODS](state, goods) {
    //   state.goods = goods
    // },
    // //保存店铺评价
    // [SAVE_RATINGS](state, ratings) {
    //   state.ratings = ratings
    // },
    // //保存店铺信息
    // [SAVE_INFO](state, info) {
    //   state.info = info
    // },

    //保存商铺信息
    [SAVE_SHOP](state,{shop={},cartFoods=[]}){
      state.shop = shop
      state.cartFoods = cartFoods
    },

    //选购添加
    [ADD_FOOD_COUNT](state, { food }) {
      if (food.count) {
        food.count++
      } else {
        Vue.set(food, 'count', 1)
        state.cartFoods.push(food)
      }
    },
    //选购删减
    [REDUCE_FOOD_COUNT](state, { food }) {
      if (food.count > 0) {
        food.count--
        if(food.count === 0){
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
      }
    },
    //清空购物车所有信息
    [CLEAR_CART](state){
      state.cartFoods.forEach(food => food.count = 0)
      state.cartFoods = []
    }
  },
  getters: {
    totalCount(state) {
      return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },
    totalPrice(state) {
      return state.cartFoods.reduce((pre, food) => pre + food.count*food.price, 0)
    }
  }
}