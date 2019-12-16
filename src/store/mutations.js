import { RECEIVE_ADDRESS, RECEIVE_FOOD_CATEGORIES, RECEIVE_SHOPS,SAVE_USER,SAVE_TOKEN } from "./mutation_types";

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
    console.log(user)
    state.user = user
  },
  [SAVE_TOKEN](state,token){
    console.log(token)
    state.token = token
  }
}