<template>
  <div>
    <div v-title>当前状态</div>
    <page :currentPage="currentPage">
      <section class="animate monitor-wrapper" ref="section1">
        <header-btn
          :headSrc="'http://p1.music.126.net/4Fx8VLiwwpj1DExmLiG1og==/18538865557829806.jpg?param=200y200'">
        </header-btn>
        <div class="model-data" v-if="model_switch == 'data'">
          <div class="monitor-data">
            <img src="../assets/img/outline1.png" alt="" class="outer1">
            <img src="../assets/img/outline2.png" alt="" class="outer2">
            <div class="data-wrapper">
              <div class="icon-wrapper">
                <img src="../assets/img/icon_hx.png" alt="呼吸">
                <img src="../assets/img/icon_xt.png" alt="心跳">
              </div>
              <div class="data-cont">
                {{hxData}}
                <small>丨</small>
                {{xtData}}
              </div>
              <div class="oldData-cont">
                {{hxData_old}} &nbsp;&nbsp; {{xtData_old}}
              </div>
            </div>
          </div>
          <div class="bi-data">
            <div class="device-status" v-show="device_status">
              <img src="../assets/img/noBreath.png" alt="" v-if="device_status == 'noBreath'">
              <img src="../assets/img/noSignal.png" alt="" v-if="device_status == 'noSignal'">
              <img src="../assets/img/bodyDoing.png" alt="" v-if="device_status == 'bodyDoing'">
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
        <div class="model-error" v-else>
          <img src="../assets/img/model_farWay.png" alt="" class="errTipImg1" v-if="model_switch == 'farWay'">
          <img src="../assets/img/model_sleep.png" alt="" class="errTipImg2"  v-if="model_switch == 'sleep'">
        </div>
      </section>
    </page>
    <page :currentPage="currentPage">
      <section class="animate" ref="section2">
        <x-button class="button" @click.native="unbindShow = true">设备解绑</x-button>
      </section>
    </page>

    <!-- 弹窗 -->
    <reportBtn></reportBtn>
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage"
                     :option="controllerOption"></page-controller>

    <confirm v-model="unbindShow"
             @on-cancel="this.unbindShow = false"
             @on-confirm="unbindClick"
             @on-show=""
             @on-hide="">
      确定解绑吗？
    </confirm>
    <alert v-model="alertShow" @on-show="" @on-hide="">{{alertText}}</alert>
  </div>
</template>

<script>
  import headerBtn from "../components/headerBtn.vue"
  import reportBtn from "../components/reportBtn.vue"
  import Page from '../components/vue-fullpage/Page.vue';
  import PageController from '../components/vue-fullpage/PageController.vue';
  import {XButton, Alert, Confirm} from 'vux'

  import {hxBi_chart} from "../assets/js/Bi.js"

  export default {
    data() {
      return {
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
        alertShow: false,
        alertText: "点击了解绑按钮",
        xtData: "00",
        xtData_old: "20",
        xtText: "心跳正常",
        hxData: "00",
        hxData_old: "30",
        hxText: "呼吸正常",

        device_status: "noSignal",    //设备状态

        //模式切换
        model_switch:"data",
      }
    },
    watch: {
      //自动关闭弹窗
      alertShow(val) {
        console.log(val);
        if (val) {
          setTimeout(() => {
            this.alertShow = false;
          }, 1500)
        }
      },
      //数据补0
      xtData(val) {
        if (val == this.xtData) return;
        this.xtData = this.PrefixInteger(0, 2)
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
      this.$nextTick(()=>{
        hxBi_chart(this,"hxBI");
      })
    },
    methods: {
      //数字前置补0
      PrefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
      },
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
      unbindClick() {
        this.unbindShow = false;
        this.alertShow = true;
      },
    },
    components: {
      headerBtn, reportBtn,
      Page, PageController,
      Alert, Confirm, XButton
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
    /*box-shadow: 0 0 0 20px rgba(53,81,202,0.5);*/
    animation: boxShadow 5s infinite;

    .icon-wrapper {
      img {
        display: inline-block;
        /*width: 16px;*/
        height: 16px;
        margin: 0 10px;
      }
    }
    .data-cont {
      font-size: 32px;
      color: #fff;
      vertical-align: bottom;
      line-height: 44px;
      small {
        font-size: 22px;
        vertical-align: top;
      }
    }

    .oldData-cont {
      font-size: 21px;
      color: #77ffff;
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
  .model-data,.model-error{
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .model-error .errTipImg1{
    display: block;
    width: 60%;
    margin: 30% auto;
  }
  .model-error .errTipImg2{
    display: block;
    width: 70%;
    margin: 30% auto;
  }

  #hxBI{
    width: 100%;
    height: calc(~"100% - 42px");
  }
</style>
