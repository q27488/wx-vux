<template>
    <div class="wrapper">
      <div v-title>酒店服务</div>
      <header-btn></header-btn>
      <back-btn></back-btn>
      <div class="content">
          <section>
            <img src="../assets/img/hotel_milk.png" alt="" class="hotelImg">
            睡前牛奶
          </section>
          <section>
            <img src="../assets/img/hotel_movie.png" alt="" class="hotelImg">
            休闲影院
          </section>
          <section>
            <img src="../assets/img/hotel_massage.png" alt="" class="hotelImg">
            泰式按摩
          </section>
          <section>
            <img src="../assets/img/hotel_car.png" alt="" class="hotelImg">
            专车接送
          </section>
      </div>
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
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content{
    display: block;
    width: 100%;
    height: calc(~"100% - 80px");
    margin-top: 80px;
    padding: 0 5px;

    section{
      display: flex;
      justify-content:center;
      align-items:center;
      height: calc(~"(100% - 20px)/4");
      width: calc(~"100% - 10px");
      margin-bottom: 5px;
      background: rgba(255,255,255,0.1);
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      .hotelImg{
        display: inline-block;
        width: 49px;
        height: 49px;
        margin-right: 26px;
      }
    }
  }
</style>
