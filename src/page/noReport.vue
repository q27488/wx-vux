<template>
  <div class="wrapper">
    <div v-title>睡眠报告</div>
    <header-btn></header-btn>
    <back-btn></back-btn>
    <img src="../assets/img/noSleepData.png" alt="" class="noReportImg">
  </div>
</template>

<script>
  import headerBtn from "../components/headerBtn.vue"
  import backBtn from "../components/backBtn.vue"

  export default {
    data() {
      return {
        msg: "this is layout"
      }
    },
    components:{
      headerBtn,backBtn
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    position: relative;
    text-align: center;

  }

  .noReportImg {
    display: inline-block;
    width: 70%;
    margin-top: 40%;
  }
</style>
