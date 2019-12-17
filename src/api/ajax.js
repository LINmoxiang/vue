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
import { Indicator, MessageBox, Toast } from "mint-ui";
import store from "../store";
import router from "../router";

const instance = axios.create({
  baseURL: '/api',
  timeout: 20000 //配置请求超时的时间
})

//请求拦截器
instance.interceptors.request.use((config) => {
  Indicator.open()
  let data = config.data
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }

  //通过请求头携带token数据
  const token = store.state.token
  if (token) {
    config.headers.Authorization = token
  } else {
    //若当前请求接口需要token,但没有token时，不发送请求，进入错误流程
    const needCheck = config.headers.needCheck
    if (needCheck) {
      throw new Error('没有登录,不能发请求')
    }
  }
  return config
})

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    Indicator.close()
    return response.data //异步请求成功的数据不是response, 而是response.data
  },
  (error) => {
    Indicator.close()
    const response = error.response
    //没法请求有错误
    if (!response) {
      console.log('无response')
      const path = router.currentRoute.path
      if (path !== '/login') {
        router.replace('/login')
        Toast(error.message)
      }
    } else {
      //发了请求有错误

      //401时需要跳到login
      if (response.status === 401) {
        console.log('状态为401')
        //若401时，没在登陆界面，退出登录（清除数据/跳到登录界面）
        const path = router.currentRoute.path
        if (path !== '/login') {
          store.dispatch('logOut')
          router.replace('/login')
          Toast(response.data.message || '登录失效，请重新登录')
        }
      }else if(error.response.status === 404){
        MessageBox('访问资源不存在')
      } else {
        MessageBox('请求出错' + error.message)
      }

    }

    return new Promise(() => { })
  }
)

export default instance