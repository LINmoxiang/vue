<template>
  <h2 v-if="isFirst">请输入搜索条件</h2>
  <h2 v-else-if="isLoading">Loading</h2>
  <h2 v-else-if="err">{{ err }}</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user) in users" :key="user.username">
      <a :href="user.url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.username }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import axios from "axios";
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['isFirst','isLoading','err','users'])
  },
}
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
