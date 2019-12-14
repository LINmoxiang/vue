<template>
  <div class='test'>
    app
    <ul>
      <li :class="{active:liNum === index}" v-for="(num, index) in 20" :key="index" @click="liClick(index)">{{num}}</li>
    </ul>
    <div class="test2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liNum : 0
    }
  },
  methods: {
    liClick(index){
      this.liNum = index
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixins.styl"
    .test
     color red
     font-size 10px
     li.active 
      color green

    .test2
      background-color yellow 
      width 64px
      height 64px
</style>
