<template>
  <div id="app">
    <router-view></router-view>
    <alert v-model="alertShow" @on-show="" @on-hide="">{{alertMsg}}</alert>
  </div>
</template>

<script>
  import {Alert} from 'vux'
  import * as types from './store/mutation-types'
  export default {
    name: 'app',
    computed: {
      alertShow() {
        return this.$store.getters.getAlert.show
      },
      alertMsg() {
        return this.$store.getters.getAlert.msg
      },
    },
    watch:{
      alertShow(val){
        if(val){
          let time = this.$store.getters.getAlert.time;
          setTimeout(()=>{
            this.$store.commit(types.HIDE_ALERT);
          },time)
        }
      }
    },
    components: {
      Alert
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  body {
    height: 100%;
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background-color: #000;
    background-image: url("./assets/img/backgroundImg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    -ms-touch-action: none; /* 阻止windows Phone 的默认触摸事件 */
  }

  #app {
    height: 100%;
    width: 100%;
  }
</style>
