import ajax from "./ajax";

//获取地址请求
export const reqAddress = (latitude,longitude) => ajax(`/position/${latitude},${longitude}`)

//获取食品分类请求
export const reqFoodCategories = () => ajax('/index_category',{
  headers:{
    needCheck:true
  }
})

//获取商家列表请求
export const reqShops = ({latitude,longitude}) => ajax('/shops',{
  params:{latitude,longitude},
  headers:{
    needCheck:true
  }
})

//发送短信验证码请求
export const reqSendCode = (phone) => ajax('/sendcode',{params:{phone}})

//用户名密码登录请求
export const reqPwdLogin = (name,pwd,captcha) => ajax.post('/login_pwd',{name,pwd,captcha})

//手机验证码登录请求
export const reqPhoneLogin = (phone,code) => ajax.post('/login_sms',{phone,code})

//自动登录请求
export const reqAutoLogin = () => ajax.get('/auto_login')