import Vue from "vue";
import 'lib-flexible/flexible';
import './validate';
import { Button } from "mint-ui";
        
import router from "./router";
import App from './App';
import store from "./store";
import Header from "./components/Header/Header";
import Start from "./components/Start/Start";
import * as API from "./api";



Vue.component('Header',Header)
Vue.component('Start',Start)
Vue.component(Button.name,Button)

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
  store
}).$mount('#app')
