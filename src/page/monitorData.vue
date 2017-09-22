<template>
  <div>
    <div v-title>当前状态</div>
    <page :currentPage="currentPage">
      <section class="animate monitor-wrapper" ref="section1">
        <reportBtn></reportBtn>
        <header-btn></header-btn>
        <div class="model-data" v-show="model_switch == 'data'">
          <div class="monitor-data">
            <img src="../assets/img/outline1.png" alt="" class="outer1">
            <img src="../assets/img/outline2.png" alt="" class="outer2">
            <div class="data-wrapper">
              <div class="icon-wrapper">
                <img src="../assets/img/icon_hx.png" alt="呼吸" class="icon-wrapper-img">
                <img src="../assets/img/icon_xt.png" alt="心跳" class="icon-wrapper-img">
              </div>
              <div class="data-cont">
                <span :class="hxClass" id="leftData">{{hxData}}</span>
                <small id="middleData">丨</small>
                <span :class="xtClass" id="rightData">{{xtData}}</span>
              </div>
              <div class="oldData-cont">
                {{hxData_old}} &nbsp;&nbsp; {{xtData_old}}
              </div>
            </div>
          </div>
          <div class="bi-data">
            <div class="device-status" :class="{ hidden:device_status == ''}">
              <img src="../assets/img/noBreath.png" alt="" v-show="device_status == 'noBreath'">
              <img src="../assets/img/wayForBed.png" alt="" v-show="device_status == 'wayForBed'">
              <img src="../assets/img/bodyDoing.png" alt="" v-show="device_status == 'bodyDoing'">
            </div>
            <div class="data-section">
              <div class="title">
                <img src="../assets/img/icon_hx2.png" alt="">
                {{hxText}}
              </div>
              <div id="hxBI" class="BI-wrapper"></div>
            </div>
            <div class="data-section">
              <div class="title">
                <img src="../assets/img/icon_xt2.png" alt="">
                {{xtText}}
              </div>
              <div id="xtBI" class="BI-wrapper"></div>
            </div>
          </div>
        </div>
        <div class="model-error" v-show="model_switch != 'data'">
          <img src="../assets/img/model_farWay.png" alt="" class="errTipImg1" v-show="model_switch == 'farWay'">
          <img src="../assets/img/model_sleep.png" alt="" class="errTipImg2" v-show="model_switch == 'sleep'">
          <img src="../assets/img/model_noSignal.png" alt="" class="errTipImg3" v-show="model_switch == 'noSignal'" onclick="location.reload()">
        </div>
      </section>
    </page>
    <page :currentPage="currentPage">
      <section class="animate" ref="section2">
        <x-button class="button" @click.native="unbindShow = true" v-if="currentPage == 2">设备解绑</x-button>
      </section>
    </page>
    <!-- 弹窗 -->
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage"
                     :option="controllerOption"></page-controller>
    <confirm v-model="unbindShow"
             @on-cancel="this.unbindShow = false"
             @on-confirm="unbindClick"
             @on-show=""
             @on-hide="">
      设备解绑后将无法收到您的睡眠数据,<br>确定要解绑设备？
    </confirm>
  </div>
</template>

<script>
  import headerBtn from "../components/headerBtn.vue"
  import reportBtn from "../components/reportBtn.vue"
  import Page from '../components/vue-fullpage/Page.vue';
  import PageController from '../components/vue-fullpage/PageController.vue';
  import {XButton, Confirm} from 'vux'

  import {hxBi_chart, xtBi_chart} from "../assets/js/Bi.js"
  //http
  import devApi from "../api/devApi"
  //mqtt
  var client = null;
  var clientId = null;
  var connected = false;
  var dataTopicName = null;
  var hostname = "www.yjr913.com";
  var isShowRates = true;
  var mqttTimer = null; //用于3s没收到mqtt 报错：网络服务异常

  export default {
    data() {
      return {
        //mqtt
        mqtt: {
          port: "8084",
          path: "",
          user: "zkzkEmqttdWeb@201612131430",
          pass: "J3ejdVfKVGEE3xJEm4YDRiZdLbEH5dAv3NiV4S@zkzkWeb1431",
          keepAlive: 20,
          timeout: 3,
          ssl: true,
          cleanSession: true,
        },
        mqttTimer: "",       //超过5s未收到MQTT，则报网络异常

        currentPage: 1,
        options: [{
          // the color of background
//          background: 'rgba(229, 199, 46, 1)',
          // the color of text
          color: '#fff',
          // is content center
          isCenter: false,
          // the function before page show
          afterEnter($child) {
            this.$refs.section1.classList.remove('move-left', 'move-right');
          },
          // the function after page show
          beforeLeave($child) {
            let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
            this.$refs.section1.classList.add(moveType);
          }
        }, {
//          background: 'rgba(79, 204, 76, 1)',
          color: '#fff',
          isCenter: true,
          afterEnter($child) {
            this.$refs.section2.classList.remove('move-left', 'move-right');
          },
          beforeLeave($child) {
            let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
            this.$refs.section2.classList.add(moveType);
          }
        }],
        controllerOption: {
          arrowsType: 'no',
          navbar: false,
          loop: false
        },
        unbindShow: false,
        xtData: "--",
        xtData_old: "--",
        xtText: "心跳正常",
        xtClass: "",     //tooHigh / tooLow
        hxData: "--",
        hxData_old: "--",
        hxText: "呼吸正常",
        hxClass: "",

        device_status: "",    //设备状态

        //模式切换
        model_switch: "data",

        //BI
        hxBi_index: 0,
        hxBi_chart: "",
        xtBi_index: 0,
        xtBi_chart: "",

      }
    },
    computed: {
      // 总page数
      pageNum() {
        return this.options.length;
      }
    },
    mounted() {
      this.$children.forEach((child, index) => {
        // 动态设置各个page内的options
        if (child.option === null) {
          let childOption = this.options[index];
          this.$set(childOption, 'index', index + 1);
          child.option = childOption;
        }
      });

      this.$nextTick(() => {
        this.hxBi_chart = hxBi_chart(this, "hxBI");
        console.log(this.hxBi_chart)
        this.xtBi_chart = xtBi_chart(this, "xtBI");
      });
      setInterval(()=>{
        let num = parseInt(Math.random() *100);
        this.updateXtHx(num,num/2);
      },1000)

    },
    methods: {
      //数字前置补0
      PrefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
      },
      //改变页数
      changePage(index) {
        // beforeLeave Hook
        let beforeIndex = this.currentPage - 1;
        let leaveFunction = this.options[beforeIndex].beforeLeave;
        typeof leaveFunction === 'function' && leaveFunction.call(this, this.$children[beforeIndex]);
        // 改变page
        this.currentPage = index;
        // afterEnter Hook
        let nextIndex = index - 1;
        let enterFunction = this.options[nextIndex].afterEnter;
        this.$nextTick(function () {
          typeof enterFunction === 'function' && enterFunction.call(this, this.$children[nextIndex]);
        })
      },
      //解绑按钮
      unbindClick() {
        this.$router.push({name: "bind"})
      },

      updateXtHx(hxNum,xtNum) {
          this.updateBI_hx(hxNum);
          this.updateBI_xt(xtNum);
          if (this.xtData_old != this.xtData) {
            this.xtData_old = this.xtData;
          }
          this.xtData = xtNum;
          if (this.xtData >= 100) {
            console.log("心跳过快");
            this.xtText = "心跳过快";
            this.xtClass = "tooHigh";
          } else if (this.xtData <= 45) {
            console.log("心跳过慢");
            this.xtText = "心跳过慢";
            this.xtClass = "tooLow";
          } else {
            this.xtText = "心跳正常";
            this.xtClass = "";
          }
          if (this.hxData_old != this.hxData) {
            this.hxData_old = this.hxData;
          }
          this.hxData = hxNum;
          if (this.hxData >= 100) {
            console.log("呼吸过快");
            this.hxText = "呼吸过快";
            this.hxClass = "tooHigh";
          } else if (this.hxData <= 45) {
            console.log("呼吸过慢");
            this.hxText = "呼吸过慢";
            this.hxClass = "tooLow";
          } else {
            this.hxText = "呼吸正常";
            this.hxClass = "";
          }
      },
      updateBI_hx(data) {
        let series = this.hxBi_chart.series[0];
        series.addPoint([this.hxBi_index, data], true, false);
        this.hxBi_index++;
        if (this.hxBi_index == 99) {
          this.hxBi_index = 0;
          series.update({
            name: '呼吸数据',
            data: [{x: this.hxBi_index, y: data}],
            marker: {
              enabled: false
            }
          });
        }
      },
      updateBI_xt(data) {
        let series = this.xtBi_chart.series[0];
        series.addPoint([this.xtBi_index, data], true, false);
        this.xtBi_index++;
        if (this.xtBi_index == 99) {
          this.xtBi_index = 0;
          series.update({
            name: '心跳数据',
            data: [{x: this.xtBi_index, y: data}],
            marker: {
              enabled: false
            }
          });
        }
      },
    },
    components: {
      headerBtn, reportBtn,
      Page, PageController,
      Confirm, XButton
    },

  }
</script>

<style scoped lang="less">
  @topDiv-height: 240px;
  .button {
    display: inline-block;
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    text-align: center;
    outline: 0;
    -webkit-appearance: none;
    border: none;
    border-radius: 5px;
  }

  .button:active {
    color: #fff !important;
    background-color: rgba(255, 255, 255, 0.15) !important;
  }

  .monitor-wrapper {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  //实时数据div
  .monitor-data {
    display: block;
    position: relative;
    margin: 10px auto;
    height: 220px;
    width: 220px;
    /*background: #ccc;*/
    border-radius: 50%;

    .outer1 {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      animation: rotate-clockwise 3s infinite linear;
    }
    .outer2 {
      display: inline-block;
      position: absolute;
      left: 5%;
      top: 5%;
      width: 90%;
      height: 90%;
      animation: rotate-counterclockwise 3s infinite linear;
    }
  }

  .data-wrapper {
    display: inline-block;
    box-sizing: border-box;
    padding: 20px 0;
    width: 60%;
    height: 60%;
    margin: 20%;
    background: #3551ca;
    text-align: center;
    border-radius: 50%;
    /*box-shadow: 0 0 0 14px rgba(53,81,202,0.5);*/
    animation: boxShadow 5s infinite;

    .icon-wrapper {
      img {
        display: inline-block;
        /*width: 16px;*/
        height: 16px;
        margin: 0 14px;
      }
    }
    .data-cont {
      position: relative;
      font-size: 28px;
      color: #fff;
      vertical-align: bottom;
      line-height: 44px;
      small {
        font-size: 22px;
        vertical-align: top;
      }
    }

    .oldData-cont {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }

    .tooHigh {
      color: #ff7e00;
    }
    .tooLow {
      color: #f1ef54;
    }
  }

  @keyframes boxShadow {
    0% {
      box-shadow: 0 0 0 0px rgba(53, 81, 202, 0.5);
    }
    50% {
      box-shadow: 0 0 0 20px rgba(53, 81, 202, 0.5);
    }
    100% {
      box-shadow: 0 0 0 0px rgba(53, 81, 202, 0.5);
    }
  }

  //顺时针旋转动画
  @keyframes rotate-clockwise {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  //逆时针旋转动画
  @keyframes rotate-counterclockwise {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  //BI图谱
  .bi-data {
    display: block;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: calc(~ "100% - @{topDiv-height}");
    /*background: #555;*/
    padding: 0 10px;

    .device-status {
      display: block;
      margin-bottom: 5px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      img {
        display: inline-block;
        height: 50%;
        width: auto;
        vertical-align: middle;
      }
    }

    .data-section {
      height: calc(~"(100% - 65px)/2");
      margin-bottom: 5px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;

      .title {
        box-sizing: border-box;
        padding: 10px;
        color: #fefefe;
        font-size: 14px;
        height: 42px;
        img {
          display: inline-block;
          width: 18px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }

    }
  }

  /*模式切换*/
  .model-data, .model-error {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .model-error .errTipImg1 {
    display: block;
    width: 60%;
    margin: 30% auto;
  }

  .model-error .errTipImg2 {
    display: block;
    width: 70%;
    margin: 30% auto;
  }
  .model-error .errTipImg3 {
    display: block;
    width: 40%;
    margin: 30% auto;
  }

  #hxBI, #xtBI {
    width: 100%;
    height: calc(~"100% - 42px");
  }

  .hidden {
    visibility: hidden !important;
  }
  #leftData{
    display: inline-block;
    width: calc(~"50% - 12px");
    float: left;
    text-align: right;

  }
  #rightData{
    display: inline-block;
    width: calc(~"50% - 12px");
    float: right;
    text-align: left;
  }
  /*#middleData{*/
  /*display: inline-block;*/
  /*width: 2%;*/
  /*text-align: center;*/
  /*}*/
</style>
