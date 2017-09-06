<template>
    <div class="backBtn" @click.stop="backClick">
      返回主页
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
          backClick(){
            console.log("点击了一下返回主页")
            this.$router.push({name:"monitorData"})
          }
      }
    }
</script>

<style scoped lang="less">
  .backBtn{
    display: flex;
    justify-content:center;
    align-items:center;
    box-sizing: border-box;
    position: absolute;
    left: 15px;
    top:15px;
    width: 43px;
    height: 43px;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    background: #4a8bff;
    box-shadow: 0 4px 20px 2px #4a8bff;
    border-radius: 50%;
    text-align: center;
    padding:0 4px;
  }
</style>
