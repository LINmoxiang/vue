import Vue from "vue";
import 'lib-flexible/flexible';
import './validate';
import { Button } from "mint-ui";
import VueLazyload from 'vue-lazyload'

import router from "./router";
import App from './App';
import store from "./store";
import Header from "./components/Header/Header";
import Start from "./components/Start/Start";
import CartControl from "./components/CartControl/CartControl";
import * as API from "./api";
import "./mock/mock-server";
import i18n from './i18n'
import loading from '@/common/images/loading.gif'



Vue.component('Header',Header)
Vue.component('Start',Start)
Vue.component('CartControl',CartControl)
Vue.component(Button.name,Button)

Vue.use(VueLazyload,{
  loading,
})

Vue.prototype.$API = API
//全局事件总线
//Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
new Vue({
  //全局事件总线
  beforeMount() {
    Vue.prototype.$bus = this
  },

  //注册局部组件
  render: h => h(App),

  router,
  i18n,
  store
}).$mount('#app')
