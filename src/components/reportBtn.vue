<template>
    <div class="reportBtn" @click.stop="reportClick">
      <p class="text">生成<br>报告</p>
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
          reportClick(){
            console.log("点击了生成报告");
          }
      }
    }
</script>

<style scoped lang="less">
  .reportBtn{
    position: absolute;
    box-sizing: border-box;
    right: 20px;
    bottom: 100px;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;     /*定义元素垂直居中*/
    justify-content: center; /*定义元素水平居中*/
    background: rgba(53,81,202,0.8);
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    /*box-shadow: 0 0 20px 6px rgba(53,81,202,0.8);*/
    animation: reportShadow 3s infinite;
  }

  @keyframes reportShadow {
    0%{
      box-shadow: 0 0 20px 6px rgba(53,81,202,0.8);
    }
    50%{
      box-shadow: 0 0 40px 6px rgba(53,81,202,0.8);
    }
    100%{
      box-shadow: 0 0 20px 6px rgba(53,81,202,0.8);
    }
  }
</style>
