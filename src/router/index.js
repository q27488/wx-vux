import Vue from 'vue'
import Router from 'vue-router'

import bind from '@/page/bind'
import monitorData from '@/page/monitorData'
import pay from '@/page/pay'
import hotelService from '@/page/hotelService'
import noReport from '@/page/noReport'
import sleepReport from '@/page/sleepReport'
import sleepTrack from '@/page/sleepTrack'

Vue.use(Router)

export default new Router({
  routes: [
    //绑定页面
    {
      path: '/',
      name: 'bind',
      component: bind
    },
    //实时数据
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    //实时数据
    {
      path: '/monitorData',
      name: 'monitorData',
      component: monitorData
    },
    //酒店服务
    {
      path: '/hotelService',
      name: 'hotelService',
      component: hotelService
    },
    //没有睡眠报告
    {
      path: '/noReport',
      name: 'noReport',
      component: noReport
    },
    //酒店服务
    {
      path: '/sleepTrack',
      name: 'sleepTrack',
      component: sleepTrack
    },
    //睡眠报告
    {
      path: '/sleepReport',
      name: 'sleepReport',
      component: sleepReport
    },
  ]
})
