<template>
  <div class="foot-guide">
    <span class="guide-item" :class="{on:$route.path === '/msite'}" @click="goto('/msite')">
      <span>
        <i class="iconfont iconshouye"></i>
      </span>
      <span>{{$t('footer_home')}}</span>
    </span>
    <span class="guide-item" :class="{on:$route.path === '/search'}" @click="goto('/search')">
      <span>
        <i class="iconfont iconicon-search2"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide-item" :class="{on:$route.path === '/order'}" @click="goto('/order')">
      <span>
        <i class="iconfont icondingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide-item" :class="{on:$route.path === '/profile'}" @click="goto('/profile')">
      <span>
        <i class="iconfont icongeren"></i>
      </span>
      <span>个人</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    goto(path){
      if(path !== this.$route.path){
        this.$router.replace(path)
      }
    }
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.foot-guide 
  top-border-1px(#cccccc);
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background #fff
  .guide-item 
    display: flex;
    flex-direction: column;
    width: 25%;
    text-align: center;
    &.on
      color $green
    span 
      margin-top: 5px;
      font-size: 12px;
    i 
      font-size: 22px;
    
</style>
