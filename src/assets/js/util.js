/**
 * Created by Chan on 2017/1/1.
 * @dec: descrition
 */
module.exports = {
  /***********************
   *  minutes => HHMM
   ***********************/
  minutes2hour: function (min) {
    var min = parseInt(min);
    if (min == 0) {
      return '0h0min';
    }
    var hours = "";
    var minutes = "";
    var str = "";
    if (min) {
      hours = parseInt(min / 60);
      minutes = min - hours * 60;
      str = hours + "h" + minutes + "min";
      return str;
    }
  },
  /***********************
   *  时间戳 转 指定时间格式
   ***********************/
  dateFormat: function (date, type) {
    if (!date) {
      return "0000-00-00";
    }
    var date = new Date(date);
    let time = "0000-00-00";
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    let hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    let min = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    let second = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    time = year + "-" + month + "-" + day
    if (type == "hh:mm") {
      time = hour + ":" + min;
    }
    return time;
  },
  /*  昨夜心率呼吸图谱-数组组装
     *  @params {data:XX,time:时间戳}
     *  rrData:心率集合     hhData:呼吸集合
     */
  update_xinlvHuxi_BI: function (rrDatas, hhDatas) {
    var data = {
      time: [],
      xlData: [],
      hxData: [],
    };
    if (rrDatas && hhDatas) {
      hhDatas.forEach(function (val, index) {
        //提取时间，格式： HH:MM:SS
        if (index != 0) {
          data.time.push((new Date(val.time + 60001)).format('h:m'));
        } else {
          data.time.push((new Date(val.time)).format('h:m'));
        }
        data.xlData.push(val.data);
      });
      rrDatas.forEach(function (val, index) {
        //提取时间，格式： HH:MM:SS
        // data.hxData.push(parseInt(Math.random()*50));
        data.hxData.push(val.data);
      });
      // while (data.time.length < 401) {
      //    data.time.push(stamp2time(rrDatas[rrDatas.length - 1].time).substr(10, 5));
      // }
      return data;
    };
  },/*  昨夜心率呼吸图谱-数组组装
     *  @params {data:XX,time:时间戳}
     *  rrData:心率集合     hhData:呼吸集合
     */
  update_doing_BI: function (bodyData) {
    var data = {
      time: [],
      doingData: [],
    };
    if (bodyData) {
      bodyData.forEach(function (val, index) {
        //提取时间，格式： HH:MM:SS
        if (index != 0) {
          data.time.push((new Date(val.time + 60001)).format('h:m'));
        } else {
          data.time.push((new Date(val.time)).format('h:m'));
        }
        data.doingData.push(val.data);
      });
      return data;
    };
  },
}

Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours() > 9 ?this.getHours() : "0"+this.getHours(),
    "m+": this.getMinutes() > 9 ?this.getMinutes() : "0"+this.getMinutes(),
    "s+": this.getSeconds() > 9 ?this.getSeconds() : "0"+this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
