<template>
  <div class="container" @click.stop="bindClick">
    <img src="../assets/img/bindBtn.png" alt="">
  </div>
</template>

<script>
  export default {
    methods:{
      bindClick(){
        console.log("点了一下绑定按钮");
        this.$router.push({name:"pay"})
      }
    }
  }
</script>

<style scoped lang="less">
  .container{
    position: absolute;
    right: 45px;
    bottom: 100px;
    display: inline-block;
    width: 98px;
    height:98px;
    border-radius: 50%;
  }
  .container:active{
    opacity: 0.8;
  }
  .container img{
    display: block;
    width: 120%;
    height: 120%;
  }
</style>
