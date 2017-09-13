<template>
  <div class="wrapper">
    <div v-title>睡眠足迹</div>
    <div class="content">
      <header-btn></header-btn>
      <back-btn></back-btn>
      <div class="track-cont" v-for="(item,index) in data">
        <div class="title" :class="{'first-child':index == 0}">{{item.name}}-{{item.startTime}}-{{item.endTime}}</div>
        <div class="cell" v-for="(itemCell,indexCell) in item.data"
             :class="{'first-child':indexCell == 0,'last-child':indexCell == (item.data.length - 1)}"
             @click="cellClick()">
          昨夜睡眠：{{itemCell.text}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import headerBtn from "../components/headerBtn.vue"
  import backBtn from "../components/backBtn.vue"
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        msg: "this is layout",
        data: [
          {
            name: "维也纳酒店",
            startTime: "2016.10.01",
            endTime: "2016.10.04",
            data: [
              {
                text: "睡眠充足8小时棒棒哒睡眠充足8小时棒棒哒"
              },
              {
                text: "睡眠充足8小时，棒棒哒"
              },
              {
                text: "睡眠充足8小时，棒棒哒"
              },
            ]
          },
          {
            name: "维也纳酒店",
            startTime: "2016.10.01",
            endTime: "2016.10.04",
            data: [
              {
                text: "睡眠充足8小时，棒棒哒"
              },
              {
                text: "睡眠充足8小时，棒棒哒"
              },
              {
                text: "睡眠充足8小时，棒棒哒"
              },
            ]
          },
          {
            name: "维也纳酒店",
            startTime: "2016.10.01",
            endTime: "2016.10.04",
            data: [
              {
                text: "睡眠充足8小时，棒棒哒"
              },
              {
                text: "睡眠充足8小时，棒棒哒"
              },
              {
                text: "睡眠充足8小时，棒棒哒"
              },
            ]
          }
        ]
      }
    },
    methods:{
      cellClick(item){
        this.$router.push({name:"noReport"})
      }
    },
    mounted(){
      let wrapper = document.querySelector('.wrapper')
      let scroll = new BScroll(wrapper,{click:true})
    },
    components: {
      headerBtn, backBtn
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .content {
    text-align: center;
    padding: 80px 5px 10px;
    .title {
      display: block;
      color: #fff;
      font-size: 12px;
      height: 50px;
      line-height: 50px;
      padding-left: 40px;
      text-align: left;
      background: url("../assets/img/icon_moon.png") no-repeat 20px bottom;
      background-size: contain;
      &.first-child {
        background: url("../assets/img/icon_moon_first.png") no-repeat 20px bottom;
        background-size: contain;
      }
    }
    .cell {
      display: block;
      position: relative;
      height: 60px;
      line-height: 60px;
      padding-left: 10px;
      padding-right: 24px;
      margin-top: 1px;
      font-size: 14px;
      color: #fff;
      /*border-radius: 5px;*/
      text-align: left;
      background-color: rgba(255, 255, 255, 0.1);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        right: 10px;
        height: 60px;
        width: 30px;
        background-image: url("../assets/img/icon_cell.png");
        background-repeat: no-repeat;
        background-position: right;
        background-size: 50%;
        float: right;
        vertical-align: middle;
      }
      &:active {
        background-color: rgba(255, 255, 255, 0.2);
      }
      &.first-child {
        border-radius: 5px 5px 0 0;
      }
      &.last-child {
        border-radius: 0 0 5px 5px;
      }
    }
  }
</style>
