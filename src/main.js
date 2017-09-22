// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'
import App from './App'
import { LoadingPlugin } from 'vux'
import { WechatPlugin } from 'vux'
import highcharts from 'highcharts'
//初始化css
import './assets/css/reset.css'
import './assets/css/vux-css.css'

//使用highcharts 作为图表插件
Vue.prototype.$highcharts = highcharts;



//http:vue-resource
Vue.use(VueResource);

Vue.use(LoadingPlugin);   //使用全局loading
Vue.use(WechatPlugin);    //使用微信SDK,请在微信环境下测试

//注册title全局指令,用于改变title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

Vue.use(LoadingPlugin);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
