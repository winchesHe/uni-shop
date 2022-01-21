<template>
  <view>
    <view class="settle-container">
      <label class="radio">
        <radio :checked="isCheck" color="#c00" @click="Allcheck"/><text>全选</text>
      </label>
      
      <view >合计: <text class="settle-price">￥{{totalPrice}}</text></view>
      
      <view class="settle-total">结算({{checkedCount}})</view>
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        // isCheck:"true"
      };
    },
    computed:{
      ...mapGetters("m_cart",['checkedCount','totalPrice','isCheck'])
    },
    methods:{
      ...mapMutations("m_cart",['AllChange']),
      Allcheck(){
        const state = this.isCheck
        this.AllChange(state)
      }
    }
  }
</script>

<style lang="scss">
.settle-container{
  height: 50px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-left: 5px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .radio{
    display: flex;
    align-items: center;
  }
  .settle-price{
    color: #c00;
    font-weight: bold;
    margin-left: 5px;
    font-size: 16px;
  }
  .settle-total{
    background-color: #c00;
    padding: 0 10px;
    min-width: 100px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
}
</style>
