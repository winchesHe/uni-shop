
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'

Vue.config.productionTip = false


// 配置网络请求
uni.$http = $http
// 配置根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情 (响应拦截器)
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装全局的展示信息提示方法
uni.$showMsg = function (title = '数据加载失败！'){
  uni.showToast({
    title,
    icon:"none"
  })
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif