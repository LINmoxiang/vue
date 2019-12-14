import { REQUESTING, REQSUCCESS, REQERR } from "./config";
export default {
  //发送请求前跟新状态
  [REQUESTING](state) {
    state.isFirst = false
    state.isLoading = true
  },

  //请求成功更新状态
  [REQSUCCESS](state,{users}){
    state.users = users
    state.isLoading = false
  },

  //请求失败更新状态
  [REQERR](state,{errMsg}){
    state.isLoading =false
    state.err = errMsg
  }
}