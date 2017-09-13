<template>
  <div class="wrapper">
    <div v-title>睡眠报告</div>
    <div class="content">
      <header-btn></header-btn>
      <back-btn></back-btn>
      <!--睡眠得分-->
      <div class="score-content">
        <canvas id="sleepScore" ref="sleepScore"></canvas>
        <div id="startSleep">
          <p class="timeText">{{sleepStartShow}}<small>{{sleepStartUnion}}</small></p>
          <p class="text">开始睡眠</p>
        </div>
        <div id="endSleep">
          <p class="timeText">{{sleepEndShow}}<small>{{sleepEndUnion}}</small></p>
          <p class="text">结束睡眠</p>
        </div>
        <div id="hotelName"><p>{{organizationName}}</p></div>
        <div id="intoTime"><p>{{date}}</p></div>
      </div>
      <!--睡眠时相图谱-->
      <div class="section">
        <div class="title-text">睡眠时相图谱</div>
        <div class="sleepTimeBILegend">
          <div class="legend" v-for="(item,index) in sleepTimeOptions.text">
            <span class="legendSpan" v-bind:style="{background:sleepTimeOptions.colors[index]}"></span>
            {{item}}
          </div>
        </div>
        <canvas id="sleepTimeBI" width="320" height="320"></canvas>
        <div class="sleepInfo">
          <div class="info-section">
            <div class="info-title-moon" @click="changeShowDes('totalSleepTime')">
              <img src="../assets/img/icon_sleepMoon.png" alt="" class="sleepMoon">
              睡眠总长：{{totalSleepTime}}
            </div>
            <div class="info-des info-des-left" v-if="showDes == 'totalSleepTime'">
              从开始睡眠到结束睡眠的时间
            </div>
          </div>
          <div class="info-section">
            <div class="info-title" @click="changeShowDes('deepSleepTime')">深睡时长：{{deepSleepTime}}</div>
            <div class="info-title" @click="changeShowDes('fallAsleep')">入睡时长：{{fallAsleep}}</div>
            <div class="info-des info-des-left" v-if="showDes == 'deepSleepTime'">
              睡眠过程中，呼吸心跳变得很慢，肌肉放松，血压下降，呼吸更有规律，大脑对外界的反应不灵敏，这一阶段为深睡阶段。深睡阶段，脑垂体会释放生长激素，刺激组织生长和肌肉修复。只有进入深睡阶段，人体才开始从睡眠获益。保证一定的深睡时长，才能保证整体睡眠质量。
            </div>
            <div class="info-des info-des-right" v-if="showDes == 'fallAsleep'">
              人体清醒状态下，大脑皮质内神经细胞处于兴奋状态，开始准备入睡时，大脑皮质内神经细胞由兴奋状态转换成抑制状态，当抑制作用在大脑皮质内占优势的时候，人就会进入睡眠状态。这一阶段所需的时间，即称为入睡时长。
            </div>
          </div>
          <div class="info-section">
            <div class="info-title" @click="changeShowDes('middleSleep')">中睡时长：{{middleSleep}}</div>
            <div class="info-title" @click="changeShowDes('leaveBed')">睡中清醒：{{leaveBed}}次</div>
            <div class="info-des info-des-left" v-if="showDes == 'middleSleep'">
              中睡是介于深睡眠状态和浅睡眠状态之间的阶段，这一段睡眠的时长为中睡时长。
            </div>
            <div class="info-des info-des-right" v-if="showDes == 'leaveBed'">
              睡眠过程中由于外界干扰或自身身体原因导致清醒的次数。
            </div>
          </div>
          <div class="info-section">
            <div class="info-title" @click="changeShowDes('shallowSleepTime')">浅睡时长：{{shallowSleepTime}}</div>
            <div class="info-title" @click="changeShowDes('sleepAge')">睡眠年龄：{{sleepAge}}</div>
            <div class="info-des info-des-left" v-if="showDes == 'shallowSleepTime'">
              睡眠过程中，身体呈放松状态，呼吸心跳比清醒状态时慢，体温略微降低，体动相对活跃的阶段为浅睡阶段。这一段睡眠的时长为浅睡时长。
            </div>
            <div class="info-des info-des-right" v-if="showDes == 'sleepAge'">
              综合睡眠时长、睡眠效率两项指标得出的睡眠状态，反推对应的年龄阶段，与实际年龄不完全一致。当睡眠时长达到7-9小时，且睡眠效率较高，则睡眠年龄趋向年轻化；如果睡眠时长不足7小时，且睡眠效率较低，则睡眠年龄趋向老年化。睡眠年龄可以让睡眠者更直观的了解自己的睡眠质量大概处于什么年龄水平。
            </div>
          </div>
          <div class="info-section">
            <div class="info-title" @click="changeShowDes('eyeSleepTime')">清醒时长：{{eyeSleepTime}}</div>
            <div class="info-title" @click="changeShowDes('sleepPresent')">睡眠效率：{{sleepPresent}}</div>
            <div class="info-des info-des-left" v-if="showDes == 'eyeSleepTime'">
              睡中清醒后，保持意识清醒的时长。
            </div>
            <div class="info-des info-des-right" v-if="showDes == 'sleepPresent'">
              睡眠效率是指人每晚的睡眠时长（深睡+中睡+浅睡）/每晚的睡眠总时间的比值。睡眠效率评分可以直观的表现在整晚睡眠过程中，“睡着”状态所占的时间比例。如果入睡较快、夜间很少醒来、或夜醒后能快速重新入睡，表示没有入睡困难、失眠等情况，则睡眠效率评分较高。睡眠效率是评定睡眠质量的重要指标，一般来说，睡眠效率越高，睡眠质量就越好。
            </div>
          </div>
          <div class="BI-des">
            <div class="BI-des-title" @click="changeShowBIDes('sleepTimeBI')">图谱解析</div>
            <div class="BI-des-text" v-if="showBIDes == 'sleepTimeBI'" v-html="sleepdataAnalysis">
            </div>
          </div>
        </div>
      </div>
      <!--心率呼吸图谱-->
      <img src="../assets/img/brLine.png" alt="" class="brLine">
      <div class="section">
        <div class="title-text">心率呼吸图谱</div>
        <div id="xlHxBI" style="width: 100%;height: 300px;"></div>
        <!--<div class="BI-des">-->
          <!--<div class="BI-des-title" @click="changeShowBIDes('xlHxBI')">图谱解析</div>-->
          <!--<div class="BI-des-text" v-if="showBIDes == 'xlHxBI'" v-html="">-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <!--体动图谱-->
      <img src="../assets/img/brLine.png" alt="" class="brLine">
      <div class="section">
        <div class="title-text">体动图谱</div>
        <div id="doingBI" style="width: 100%;height: 300px;"></div>
        <div class="BI-des">
          <div class="BI-des-title" @click="changeShowBIDes('doingBI')">图谱解析</div>
          <div class="BI-des-text" v-if="showBIDes == 'doingBI'" v-html="bodyMoveAnalysis">
          </div>
        </div>
      </div>
      <!--睡眠信息评估图谱-->
      <img src="../assets/img/brLine.png" alt="" class="brLine">
      <div class="section">
        <div class="title-text">睡眠信息评估图谱</div>
        <div id="spiderBI" style="width: 100%;height: 300px;"></div>
        <div class="BI-des">
          <div class="BI-des-title" @click="changeShowBIDes('spiderBI')">图谱解析</div>
          <div class="BI-des-text" v-if="showBIDes == 'spiderBI'" v-html="sleepQualityAnalysis">
          </div>
        </div>
      </div>
      <!--睡眠分析与建议-->
      <img src="../assets/img/brLine.png" alt="" class="brLine">
      <div class="section">
        <div class="title-text">睡眠分析与建议</div>
        <div class="sleep-report" v-html="report"></div>
        <div class="BI-des">
          <div class="BI-des-title" @click="goService()">酒店定制服务推荐</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import headerBtn from "../components/headerBtn.vue"
  import backBtn from "../components/backBtn.vue"

  import scoreAnimation from '../assets/js/scoreAnimation.js'
  import cylindricalBi from '../assets/js/cylindricalBi.js'
  import spiderChart from '../assets/js/spiderChart.js'
  import utils from '../assets/js/util.js'
  import Bi from '../assets/js/Bi.js'
  //http
  import devApi from "../api/devApi"
  export default {
    data() {
      return {
        scroll: "",               //better-Scroll
        //睡眠得分参数
        sleepScoreOptions: {
          id: "sleepScore",
          arc_color: "#4a8bff",
          arc_bckColor: "rgba(74,139,255,0.2)",
          circle_bakClr: "#4a8bff",
          arc_Endcolor: "#4a8bff",
          present:0,
        },
        sleepStart: 0,              //报告开始时间戳
        sleepStartShow: 0,              //报告开始时间戳
        sleepStartUnion:"AM",        //时间单位
        sleepEnd: 0,                //报告结束时间戳
        sleepEndShow: 0,                //报告结束时间戳
        sleepEndUnion:"PM",        //时间单位
        organizationName:"",        //住址名称
        score:0,                    //得分
        date:0,                     //报告时间戳
        //睡眠时相图谱参数
        sleepTimeOptions: {
          id:"sleepTimeBI",
          colors: ['#cdf8f0', '#9af2e0', '#32e3c0', '#0fb191'],
          text: ["清醒", "浅睡", "中睡", "深睡"],
          timeSpace: ['01:00', '02:00', '03:00', '04:00', '05:00'],
          startTime:0,
          endTime:0,
          data:[]
        },
        //睡眠数据
        totalSleepTime: "暂无数据",      //睡眠总长
        deepSleepTime: "暂无数据",       //深睡时长
        fallAsleep: "暂无数据",           //入睡时长
        middleSleep: "暂无数据",         //中睡时长
        leaveBed: "暂无数据",            //睡中清醒
        shallowSleepTime: "暂无数据",    //浅睡时长
        sleepAge: "暂无数据",            //睡眠年龄
        eyeSleepTime: "暂无数据",        //清醒时长
        sleepPresent: "暂无数据",        //睡眠效率

        sleepdataAnalysis:"",     //睡眠时相数据分析
        sleepQualityAnalysis:"",    //睡眠质量分析
        bodyMoveAnalysis:"",        //体动分析

        showDes: "",               //展示那条名词解释
        showBIDes:"",              //展示BI名词解析

        report:"暂无数据",   //睡眠报告
      }
    },
    mounted() {
      devApi.getSleepReport()
        .then((res)=>{
          console.log("res:",res);
          this.date = utils.dateFormat(res.date);   //报告时间
          this.organizationName = res.organizationName;   //酒店名字
          this.score = res.score;                         //得分
          this.sleepStart = res.sleepStart;
          this.sleepEnd = res.sleepEnd;
          this.sleepStartShow = utils.dateFormat(this.sleepStart,'hh:mm');
          this.sleepEndShow = utils.dateFormat(this.sleepEnd,'hh:mm');
          this.sleepScoreOptions.present = res.score;
          this.initScore();

          this.totalSleepTime =utils.minutes2hour(res.totalSleepTime);
          this.deepSleepTime =utils.minutes2hour(res.deepSleepTime);
          this.fallAsleep =utils.minutes2hour(res.fallAsleep);
          this.middleSleep =utils.minutes2hour(res.middleSleep);
          this.leaveBed =res.leaveBed ;
          this.shallowSleepTime =utils.minutes2hour(res.shallowSleepTime);
          this.sleepAge = res.sleepAge == 0 ? "外星人睡眠":res.sleepAge + "岁";
          this.eyeSleepTime =utils.minutes2hour(res.eyeSleepTime);
          this.sleepPresent =0;

          this.sleepdataAnalysis = res.sleepdataAnalysis;
          this.sleepQualityAnalysis = res.sleepQualityAnalysis;
          this.bodyMoveAnalysis = res.bodyMoveAnalysis;

          this.report = res.report;

          /****************
           * 渲染BI数据
           ****************/
          //睡眠时相图谱
          this.sleepTimeOptions.startTime = res.sleepStart;
          this.sleepTimeOptions.endTime = res.sleepEnd;
          this.sleepTimeOptions.data = res.sleepData;
          console.log("aaaaaa",this.sleepTimeOptions)
          //将时间分成6份
          let diff = (this.sleepTimeOptions.endTime - this.sleepTimeOptions.startTime)/6;
          let timeSpace = [];
          for(let i=1;i<6;i++){
            timeSpace.push( utils.dateFormat(this.sleepTimeOptions.startTime + diff*i,'hh:mm') );
          }
          this.sleepTimeOptions.timeSpace = timeSpace;
          this.initSleepTime();
          //睡眠时相图谱END

          //心跳呼吸图谱
          let xtHxData = utils.update_xinlvHuxi_BI(res.rrDatas,res.hhDatas);
          console.log(xtHxData)
          Bi.xtHxBi_char(this,"xlHxBI",xtHxData);
          //心跳呼吸图谱END

          //体动图谱
          let doingData = utils.update_doing_BI(res.bodyMoves);
          Bi.doing_char(this,"doingBI",doingData)
          //体动图谱END

          this.$nextTick(() => {
            let wrapper = document.querySelector('.wrapper')
            this.scroll = new BScroll(wrapper, {click: true})
          })
        });


      this.initSleepSpider();



    },
    methods: {
      //初始化睡眠得分
      initScore() {
        let sleepScore = document.getElementById("sleepScore");
        let Bi_width = sleepScore.offsetWidth;
        this.sleepScoreOptions.width = Bi_width;
        this.sleepScoreOptions.height = Bi_width;
        sleepScore.style.height = Bi_width + "px";
        scoreAnimation(this.sleepScoreOptions);
      },
      //初始化睡眠时相图谱
      initSleepTime() {
        cylindricalBi(this.sleepTimeOptions)
      },
      //初始化睡眠信息评估图谱
      initSleepSpider(){
        this.SpiderChart = new spiderChart({
          id:"spiderBI",
          dataLineColor: "#32e3c0",
          levelColor: ["#e1eeff", "#bfdcfe", "#a0cbfe", "#81baff"], //蜘蛛图框 颜色,默认为 #ddd
          series: [{
            name: "睡眠总长",
            level: 1,
          }, {
            name: "深睡占比",
            level: 2,
          }, {
            name: "睡眠效率",
            level: 3,
          }, {
            name: "入睡速度",
            level: 4,
          }, {
            name: "清醒次数",
            level: 0,
          }],
        })
      },
      //改变-名词解释显示
      changeShowDes(name) {
        if (this.showDes != name) {
          this.showDes = name;
        } else {
          this.showDes = "";
        }
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      //改变BI-名词解释显示
      changeShowBIDes(name) {
        if (this.showBIDes != name) {
          this.showBIDes = name;
        } else {
          this.showBIDes = "";
        }
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      //
      goService(){
        this.$router.push({name:"hotelService"})
      }
    },
    components: {
      headerBtn, backBtn
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .content {
    text-align: center;
    padding: 40px 0 0;
    color: #fff;
  }

  .score-content {
    position: relative;
    display: block;
    width: 100%;
    text-align: left;
    p,small{
      color: #e5e5e5;
      font-size: 12px;
    }
    .timeText{
      color: #fff;
      font-size: 16px;
    }
    #sleepScore {
      width: 100%;
    }

    #startSleep{
      position: absolute;
      bottom: 45%;
      left: 2%;
    }
    #endSleep{
      position: absolute;
      bottom: 24%;
      left: 10%;
    }
    #hotelName{
      position: absolute;
      right: 2%;
      bottom: 40%;
    }
    #intoTime{
      position: absolute;
      right: 12%;
      bottom: 30%;
    }
  }

  .section {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    padding-bottom: 1px;
    .title-text {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: url("../assets/img/sleepTitleBck.png") no-repeat center;
      background-size: contain;
      background-position-y: 0%;
      color: #fff;
      font-size: 14px;
      width: 50%;
      margin: 0 auto;
      height: 30px;
      line-height: 30px;
      text-align: center;
      overflow: auto;
    }

    .sleepTimeBILegend {
      text-align: center;
      padding: 30px 0 20px;
      .legend {
        display: inline-block;
        font-size: 12px;
        color: #fff;
        height: 16px;
        line-height: 16px;
        margin: 0 3%;
      }
      .legendSpan {
        display: inline-block;
        width: 8px;
        height: 8px;
        vertical-align: middle;
      }
    }
  }

  #sleepTimeBI {
    display: block;
    margin: 0 auto;
  }
  #doingBI{
    padding-top: 10%;
  }

  //睡眠数据
  .info-section {
    display: block;
    height: auto;
    width: 100%;
    font-size: 14px;
    color: #fff;
    text-align: center;
    .info-title-moon {
      display: block;
      text-align: left;
      padding-left: 6%;
      height: 30px;
      line-height: 30px;
    }
    .sleepMoon {
      display: inline-block;
      height: 14px;
      width: 14px;
      margin-right: 6px;
    }
    .info-title {
      display: inline-block;
      box-sizing: border-box;
      width: 49%;
      text-align: left;
      padding-left: 6%;
      height: 30px;
      line-height: 30px;
    }

    .info-des {
      position: relative;
      display: block;
      background: rgba(0, 0, 0, 0.2);
      text-align: left;
      padding: 6px 12px;
      margin: 6px 0;
      font-size: 12px;
      color: rgba(254, 254, 254, 0.7);
    }
    .info-des-left {
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 8px solid rgba(0, 0, 0, 0.2);
        top: -16px;
        left: 12%;
      }
    }
    .info-des-right {
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 8px solid rgba(0, 0, 0, 0.2);
        top: -16px;
        left: 60%;
      }
    }

  }
  //睡眠数据END

  //图谱解析
  .BI-des{
    display: block;
    position: relative;
    .BI-des-title{
      text-align: center;
      font-size:14px;
      color: #4a8bff;
      text-decoration: underline;
      margin: 10px 0;
    }
    .BI-des-text{
      display: block;
      text-align: left;
      font-size: 12px;
      color: #c6c6c6;
      padding: 0 15px 10px;
    }
  }
  //图谱解析END

  //睡眠报告
  .sleep-report{
    padding:  30px 15px;
    font-size: 12px;
    color: #fff;
    text-align: left;
  }
  //睡眠报告END

  .brLine{
    display: block;
    width: 80%;
    height:auto;
    margin: 0 auto;
  }
</style>
