/* 
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

import axios from "axios";
import qs from "qs";
import { Indicator } from "mint-ui";

const instance = axios.create({
  baseURL:'/api',
  timeout:20000 //配置请求超时的时间
})

instance.interceptors.request.use((config)=>{
  Indicator.open()
  let data = config.data
  if(data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
})

instance.interceptors.response.use(
  (response)=>{
    Indicator.close()
    return response.data //异步请求成功的数据不是response, 而是response.data
  },
  (error)=>{
    Indicator.close()
    alert('请求出错'+error.message)
    return new Promise(()=>{})
  }
)

export default instance