/**
 * Created by Chan on 2017/9/5.
 * @dec: 微信端highchart BI相关函数库
 */

module.exports = {
  /*
   *  实时数据- 呼吸图谱
   */
  hxBi_chart: function (Vue, id) {
    Vue.$highcharts.chart(id, {
      chart: {
        type: 'spline',
        backgroundColor: "rgba(255,255,255,0.00)",
        marginRight: 0,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0],
              chart = this;
            var x = 1;
            setInterval(function () {
              x ++; // current time
              var y = 50 + Math.random()*70;
              // cat.push({x:x,y:y});
              series.addPoint([x, y], true, false);
              if(x==99){
                series.update({
                  name: '心跳数据',
                  data: [{x:0,y:60}],
                  marker: {
                    enabled: false
                  }
                })
                x=0;
              };
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        visible:false,
        ceiling:100,
        floor:0,
        minRange:100,
      },
      yAxis: {
        visible:false,
      },
      legend: {
        enabled: false
      },
      plotOptions:{
        dashStyle:"Solid"
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: '心跳数据数据',
        data: [{x:0,y:60}],
        marker: {
          enabled: false
        }
      }]
    });
  },
}


