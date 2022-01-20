<template>
  <view>
    <!-- 渲染商品列表 -->
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods.goods_id)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    // 上拉刷新
    onPullDownRefresh() {
      // 重置数据
      this.goodsList = []
      this.queryObj.pagenum = 1
      this.total = 0
      // 重新请求数据
      this.getGoodList(()=> uni.stopPullDownRefresh())
    },
    // 设置上拉加载函数
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      // 判断上次请求是否加载完（节流）
      if(!this.isLoading) return 
      // 获取新数据
      this.queryObj.pagenum +=1
      this.getGoodList()
    },
    data() {
      return {
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        // 设置节流防止额外的请求
        isLoading:true
      };
    },
    onLoad(options) {
      // 把页面传进的参数保存
      this.queryObj.query = options.query || ""
      this.queryObj.cid = options.cid || ""
      // 获取商品的数据
      this.getGoodList()
    },
    methods:{
      async getGoodList(cb){
        this.isLoading = false
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 数据请求完回调函数
        cb && cb()
            // 为数据赋值
            // 新旧数据拼接
            this.goodsList = [...this.goodsList,...res.message.goods]
            this.total = res.message.total
            this.isLoading = true
      },
      gotoDetail(id){
        uni.navigateTo({
          url:'/subpkg/shop_detail/shop_detail?goods_id=' + id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
