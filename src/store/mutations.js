import { RECEIVE_ADDRESS, RECEIVE_FOOD_CATEGORIES, RECEIVE_SHOPS } from "./mutation_types";

export default{
  [RECEIVE_ADDRESS](state,address){
    state.address = address
  },
  [RECEIVE_FOOD_CATEGORIES](state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  }
}