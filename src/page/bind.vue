<template>
  <div class="container">
    <div v-title>有宁睡眠</div>
    <header-btn></header-btn>
    <bind-btn></bind-btn>
    <div class="text">
      绑定设备后，方可实时知晓您的健康数据 <br>
      赶快去绑定设备吧！
    </div>
  </div>
</template>

<script>
  import headerBtn from "@/components/headerBtn.vue"
  import bindBtn from "@/components/bindBtn.vue"

  export default {
    mounted() {
      localStorage.removeItem("zkzk_wx_headImg");
      this.$http({
        url: 'jssdk-config',
        method: 'post',
      }).then((res) => {
        console.log(res);
        if (res.body.code == 66666) {
          this.$wechat.config({
            debug: res.body.debug,
            appId: res.body.appId,
            timestamp: res.body.timestamp,
            nonceStr: res.body.nonceStr,
            signature: res.body.signature,
            jsApiList: [res.body.jsApiList]
          })
          //保存头像信息
          if (res.body.headImg) {
            localStorage.setItem("zkzk_wx_headImg", res.body.headImg);
          }
        } else if (res.body.code == 10015) {
          this.$store.commit("SHOW_ALERT",{msg:"未登录，请先登录后重试"});
          this.alertShow = true;
        }else{
          this.$store.commit("SHOW_ALERT",{msg:res.msg});
          this.alertShow = true;
        }
      })
    },
    methods: {
    },
    components: {
      headerBtn,
      bindBtn
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
