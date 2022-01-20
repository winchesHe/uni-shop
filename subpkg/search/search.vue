<template>
  <view>
    <view class="search-box" >
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="搜索" :focus="true" ></uni-search-bar>
    </view>
    <!-- 渲染搜索历史     并且判断什么时候展示搜索列表跟展示结果-->
    <view class="search-history" v-if="serachResults.length === 0">
      <view class="history-top">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="historyClear"></uni-icons>
      </view>
      <view class="history-bottom">
        <uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="historyNav(item)" ></uni-tag>
      </view>
    </view>
    
    <!-- 渲染搜搜列表 -->
    <view class="search-list" v-else>
      <view class="search-item" v-for="(item,index) in serachResults" :key="index" @click="searchNav(item.goods_id)">
        <view class="goods-text"> {{item.goods_name}} </view> 
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        keyword:'',
        serachResults:[],
        historyList:[]
      };
    },
    onLoad() {
      // 每次加载页面时加载本地的搜索历史
      this.historyList = JSON.parse(uni.getStorageSync("kw") || '[]')
    },
    methods:{
      // 搜索框事件
       input(e){
         // 节流函数
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.keyword = e.valueOf()
          this.getSearchList()
        },500)
      },
      async getSearchList(){
        // 发起服务器请求
        if(this.keyword === '' ){
          this.serachResults = []
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyword})
        if (res.meta.status !== 200) return uni.$showMsg()
        this.serachResults = res.message
        // 保存搜索关键字
        this.savaSearchKey(this.keyword)
      },
      searchNav(id){
        uni.navigateTo({
          url:'/subpkg/shop_detail/shop_detail?goods_id=' + id
        })
      },
      savaSearchKey(kw){
        this.historyList.unshift(kw)
        const set = new Set(this.historyList)
        this.historyList = [...set]
        // 调用uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync("kw",JSON.stringify(this.historyList))
      },
      historyClear(){
        // 将本地history清空
        this.historyList = []
        // 将stroe 的数据清空
        uni.setStorageSync("kw",[])
      },
      // 搜索历史
      historyNav(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
    top: 0;
    z-index: 999;
    background-color: #c00000;
}
.search-item{
  display: flex;
  line-height: 50px;
  padding: 0 8px;
  border-bottom: 1px solid #efefef;
  .goods-text{
    // 文本单行显示
    white-space: nowrap;
    // 超出部分隐藏
    overflow: hidden;
    // 超出用三个点
    text-overflow: ellipsis;
  }
}

.search-history{
  .history-top{
    line-height: 40px;
    border-bottom: 1px solid #efefef;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .history-bottom{
    margin-top: 10px;
    uni-tag{
      margin-left: 8px;
    }
  }
}
</style>
