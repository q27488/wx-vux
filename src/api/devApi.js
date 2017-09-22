/**
 * Created by Chan on 2017/9/1.
 * @dec: descrition
 */
import Vue from 'vue'

const API_URL = process.env.NODE_ENV === "development"
  // ?  'http://172.16.1.157:21001'         //开发环境
  ? 'api/'                                  //开发环境
  : '';                                     //部署环境


export default {

  //支付
  wxPay({fee}, context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'wx-pay',
      method: 'post',
      body: JSON.stringify({
        fee
      })
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    })
  },


//扫码成功-绑定
  wxBind({code}, context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'bind',
      method: 'post',
      body: {
        code
      }
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },

  //解绑
  unBind(context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'unbind',
      method: 'post',
      body: JSON.stringify({})
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },

  //检查-睡眠报告
  checkSleepReport(context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'report-check',
      method: 'post',
      body: JSON.stringify({})
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },
  //睡眠报告
  getSleepReport(context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'sleep-report',
      method: 'post',
      body: JSON.stringify({})
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },

  //实时数据-获取设备状态
  getDeviceStatus(context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'device-status',
      method: 'post',
      body: JSON.stringify({})
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },


  //睡眠足迹
  getSleepWork({bindLogId}, context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'sleepwork',
      method: 'post',
      body: JSON.stringify({
        bindLogId
      }),
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },

  //睡眠足迹-睡眠报告
  getFootSleepWork({createdTime}, context = "") {
    return (context ? context.$http : Vue.http)({
      url: API_URL + 'foot-sleep-report',
      method: 'post',
      body: {
        createdTime:parseInt(createdTime)
      }
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      return data;
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },
}
