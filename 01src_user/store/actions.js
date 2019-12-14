import axios from "axios";
import { REQUESTING, REQSUCCESS, REQERR } from "./config";

export default {
  async search({commit},searchName){
    //发送请求前更改状态
    commit(REQUESTING)

    try{
      let response = await axios.get(`https://api.github.com/search/users`,{params:{q: searchName}})
      let result = response.data
      let users = result.items.map(item=>({
        username : item.login,
        url : item.html_url,
        avatar_url: item.avatar_url
      }))
      commit(REQSUCCESS,{users})
    }catch(err){
      commit(REQSUCCESS,{errMsg:err.message})
    }
  }
  
  

  //发送请求
  
 
  //请求成功
  //请求失败
}