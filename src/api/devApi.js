/**
 * Created by Chan on 2017/1/1.
 * @dec: descrition
 */
import Vue from 'vue'

export default {

  //测试用
  getTest(context = "") {
    return (context ? context.$http : Vue.http)({
      url: 'api/test',
      method: 'post',
      body: JSON.stringify({
        // adminId: store.getters.adminId,
        // hotelId: store.getters.hotelId,
      })
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      if (data.code === 66666) {
        return data;
      } else {
      }
    }, (respond => {        //错误处理
      console.error(respond);
    }))
  },

  //睡眠报告
  getSleepReport(context = "") {
    return (context ? context.$http : Vue.http)({
      url: 'api/report',
      method: 'post',
      body: JSON.stringify({
      })
    }).then(rep => {
      const {status, data} = rep;
      if (status != 200) {
        return console.log("网络服务器异常");
      }
      if (data.code === 66666) {
        return data;
      } else {
      }
    }, (respond => {        //错误处理
      console.error(respond);
    }));
  },
}
