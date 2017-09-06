<template>
  <div class="container">
    <div v-title>有宁睡眠</div>
    <header-btn
      :headSrc="'http://p1.music.126.net/4Fx8VLiwwpj1DExmLiG1og==/18538865557829806.jpg?param=200y200'"></header-btn>
    <bind-btn></bind-btn>
    <div class="text">
      绑定设备后，方可实时知晓您的健康数据 <br>
      赶快去绑定设备吧！
    </div>
    <alert v-model="show" @on-show="" @on-hide="">这是content</alert>
    <confirm v-model="show1"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
    @on-show=""
    @on-hide="">
    <p style="text-align:center;">这是content</p>
    </confirm>
  </div>
</template>

<script>
  import {Alert, Confirm} from 'vux'
  import headerBtn from "@/components/headerBtn.vue"
  import bindBtn from "@/components/bindBtn.vue"

  export default {
    data() {
      return {
        show: false,
        show1: false,
        msg: "this is layout"
      }
    },
    mounted() {
        this.show = true;
        setTimeout(() => {
          this.show = false;
          this.show1 = true;
        }, 1000)
    },
    methods: {
      onCancel() {
        console.log('on cancel')
      },
      onConfirm(msg) {
        console.log('on confirm')
        if (msg) {
//          alert(msg)
        }
      },
    },
    components: {
      headerBtn,
      bindBtn,
      Alert,
      Confirm
    }
  }
</script>


<style scoped lang="less">
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 1px;
  }

  .container .text {
    font-size: 16px;
    color: #d5d5d5;
    text-align: center;
    margin-top: 40%;
  }
</style>
