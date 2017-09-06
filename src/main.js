// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'           //移除移动端点击延迟
import router from './router'
import App from './App'

//使用highcharts 作为图表插件
import highcharts from 'highcharts'
Vue.prototype.$highcharts = highcharts;

//初始化css
import './assets/css/reset.css'
import './assets/css/vux-css.css'

//注册title全局指令
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

//仿双击插件
// FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
