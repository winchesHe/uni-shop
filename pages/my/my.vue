<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import badgeMix from "@/mixins/tabbar-badge.js"
  import {mapState} from 'vuex'
  
  export default {
    mixins:[badgeMix],
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState("m_user",['token'])
    },
    methods:{
    }
  }
</script>

<style lang="scss">
page,my-container{
  height: 100%;
  background-color: #f4f4f4;
}
</style>
