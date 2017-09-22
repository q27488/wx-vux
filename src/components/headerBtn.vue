<template>
    <div class="container" @click.stop="headClick">
      <img src="../assets/img/headImg.png" alt="" class="headImg" v-if="!headSrc">
      <img :src="headSrc" alt="" class="headImg" v-if="headSrc">
    </div>
</template>

<script>
    export default {
        props:{
          headSrc:{
            type:String,
            default:""
          }
        },
//        data() {
//            return {
//                msg: "this is layout"
//            }
//        }
        methods:{
          headClick(){
            console.log("点了一下头像");
            this.$store.commit("SHOW_ALERT", {msg: "输入alert提示"});
            this.$router.push({name:"sleepTrack"})
          }
        }
    }
</script>

<style scoped lang="less">
  .container{
    position: absolute;
    right: 15px;
    top: 15px;
    display: inline-block;
    width: 44px;
    height:44px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 9;
  }
  .container .headImg{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
