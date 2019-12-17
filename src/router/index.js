import Vue from "vue";
import VueRouter from "vue-router";

import Msite from "../pages/Msite/Msite";
import Order from "../pages/Order/Order";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import Goods from "../pages/Shop/Goods";
import Rating from "../pages/Shop/Ratings";
import Info from "../pages/Shop/Info";

//声明使用vue插件
Vue.use(VueRouter)

//向外暴露路由器对象模块
export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/msite',
      component:Msite,
      meta: {
        isShowFooter: true
      }
    },
    {
      path:'/order',
      component:Order,
      meta: {
        isShowFooter: true
      }
    },
    {
      path:'/search',
      component:Search,
      meta: {
        isShowFooter: true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta: {
        isShowFooter: true
      }
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:Goods
        },
        {
          path:'/shop/info',
          component:Info
        },
        {
          path:'/shop/rating',
          component:Rating
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    },
    {
      path:'',
      redirect:'/msite'
    },
  ]
})