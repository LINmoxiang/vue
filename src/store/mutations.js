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

export default{
  [RECEIVE_ADDRESS](state,address){
    state.address = address
  },
  [RECEIVE_FOOD_CATEGORIES](state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  },
  [SAVE_USER](state,user){
    state.user = user
  },
  [SAVE_TOKEN](state,token){
    state.token = token
  },
  [RESET_USER](state){
    state.user = []
  },
  [RESET_TOKEN](state){
    state.token = ''
  },
  [SAVE_GOODS](state,goods){
    state.goods = goods
  },
  [SAVE_RATINGS](state,ratings){
    state.ratings = ratings
  },
  [SAVE_INFO](state,info){
    state.info = info
  }
}