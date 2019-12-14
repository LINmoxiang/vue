<template>
  <div class='app'>
    <router-view></router-view>
    <foot-guide v-show="$route.meta.isShowFooter"></foot-guide>
  </div>
</template>

<script>
import FootGuide from "./components/FootGuide/FootGuide";
export default {
  created() {
    this.$store.dispatch('getAddress')
    // this.$store.dispatch('getFoodCategories')
    // this.$store.dispatch('getShops')
  },
  components: {
    FootGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
