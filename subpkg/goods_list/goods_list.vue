<template>
  <view>
    <!-- 渲染商品列表 -->
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods.goods_id)">
        <view class="good-item">
          <!-- 左侧图片 -->
         <view class="good-item-left">
            <image class="item-img" :src="goods.goods_small_logo || defaultPic" mode=""></image>
          </view>
          <!-- 右侧内容 -->
          <view class="good-item-right">
            <view class="goods-name">{{goods.goods_name}}</view>
            <view class="goods-price">￥ {{goods.goods_price | tiFixed}}</view>
          </view>
        </view>
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
    filters:{
      // 处理价格小数点
      tiFixed(num){
        return Number(num).toFixed(2)
      }
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
        isLoading:true,
        // 默认的空图片
            defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
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
.goods-list{
  .good-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    .good-item-left{
      margin-right:5px ;
      > .item-img{
        height: 100px;
        width: 100px;
        display: block;
      }
    }
    .good-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-price{
        color: #c00;
        font-style: 16px;
      }
    }
  }
}
</style>
