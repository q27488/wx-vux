<template>
  <div class="wrapper">
    <div v-title>ＹＯＬＩ惠睡</div>
    <img src="../assets/img/banner.png" alt="" class="banner">
    <div class="content">
      <div class="title">付费后您可以享受以下服务：</div>
      <div class="text">监测您的整晚睡眠情况；</div>
      <div class="text">突发状况及时预警，守护您的睡眠安全；</div>
      <div class="text">睡眠结束后，点击"昨晚睡眠"生成睡眠报告；</div>
      <div class="text">离店时，可在酒店前台领取纸质睡眠报告。</div>
    </div>
    <button class="payBtn" @click="payClick">立即支付</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: "this is layout"
      }
    },
    methods:{
      payClick(){
        console.log("点击了立即支付");
        this.$router.push({name:"monitorData"})
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    background: url("../assets/img/payBck.png") no-repeat bottom;
    background-size: contain;
  }

  .banner {
    display: block;
    width: 100%;
  }

  .content {
    display: block;
    /*position: absolute;*/
    /*bottom: 20%;*/
    margin-top: 10%;
    padding-left: 10%;
    font-size: 13px;
    color: #fff;

    .title {
      line-height: 24px;
    }
    .text {
      line-height: 24px;
    }
    .text:before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 10px;
      background: #345493;
      border-radius: 50%;
    }
  }

  .payBtn {
    display: inline-block;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    width: 120px;
    height: 38px;
    line-height: 38px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 16px;
    background: rgb(42, 83, 163);
  }

  .payBtn:active {
    background: rgba(42, 83, 163, 0.8);
  }
</style>
