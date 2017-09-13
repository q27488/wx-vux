/**
 * Created by Chan on 2017/9/5.
 * @dec: 微信端highchart BI相关函数库
 */


module.exports = {
  /****************************************
   *  实时数据- 呼吸图谱
   ****************************************/
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
              x++; // current time
              var y = 50 + Math.random() * 70;
              // cat.push({x:x,y:y});
              series.addPoint([x, y], true, false);
              if (x == 99) {
                series.update({
                  name: '心跳数据',
                  data: [{x: 0, y: 60}],
                  marker: {
                    enabled: false
                  }
                })
                x = 0;
              }
              ;
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
        visible: false,
        ceiling: 100,
        floor: 0,
        minRange: 100,
      },
      yAxis: {
        visible: false,
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        dashStyle: "Solid"
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: '心跳数据数据',
        data: [{x: 0, y: 60}],
        marker: {
          enabled: false
        }
      }]
    });
  },
  /****************************************
   *  睡眠报告- 呼吸心跳图谱
   ****************************************/
  xtHxBi_char: function (Vue, id,data) {
    Vue.$highcharts.chart(id, {
      chart: {
        type: 'spline',
        // zoomType: 'x',
        backgroundColor: 'rgba(255,255,255,0)',
        style: {
          color: "#eee",
          fontSize: "11px"
        }
      },
      title: {
        text: '',
        style: {
          color: "#eee",
          fontSize: "28px"
        }
      },
      legend: {
        verticalAlign: 'top',
        itemStyle: {
          color: "#eee"
        },
        y: 30
      },
      xAxis: {
        categories: data.time,
        tickLength: null,
        labels: {
          // overflow: 'justify',
          style: {
            color: "#eee",
            fontSize: "11px"
          },
          // rotation:0
        },
        tickInterval: data.time.length - 1,        //最小间隔
        // softMax: 495, // softMax 是可变的最大值
        // max: 495,
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          overflow: 'justify',
          style: {
            color: "#eee",
            fontSize: "11px"
          }
        },
        // labels: {
        //     formatter: function() {
        //         return this.value + "%";
        //     }
        // },
        tickPositions: [0, 25, 50, 75, 100], // 指定竖轴坐标点的值
        //opposite: true,                    //放在对面
        tickLength: 1,
        alternateGridColor: null,
        minorGridLineWidth: 0,
        gridLineWidth: 1, //null 不出现线条
        gridLineDashStyle: "Dot"
      },
      credits: {
        enabled: false
      },
      tooltip: {
        // enabled:false,
        valueSuffix: ' 次/分钟'
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 3
            }
          },
          marker: {
            enabled: false
          },
        }
      },
      series: [{
        name: '心率',
        color: "#32e3c0",
        // data: [14, 10, 20, 30, 40, 50, 60, 70, 80, 90,14, 10, 20, 30, 40, 50, 60, 70, 80, 90]
        data: data.xlData,
      }, {
        name: '呼吸',
        color: "#4a8bff",
        // data: [90, 80, 70, 60, 50, 40, 30, 20, 10, 55,90, 80, 70, 60, 50, 40, 30, 20, 10, 55]
        data: data.hxData
      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
  },
  /****************************************
   *  睡眠报告- 呼吸心跳图谱
   ****************************************/
  doing_char: function (Vue, id,data) {
    Vue.$highcharts.chart(id, {
      chart: {
        type: 'spline',
        // zoomType: 'x',
        backgroundColor: 'rgba(255,255,255,0)',
        style: {
          color: "#eee",
          fontSize: "11px"
        }
      },
      title: {
        text: '',
        style: {
          color: "#eee",
          fontSize: "28px"
        }
      },
      legend: {
        enabled:false
      },
      xAxis: {
        categories: data.time,
        tickLength: null,
        labels: {
          // overflow: 'justify',
          style: {
            color: "#eee",
            fontSize: "11px"
          },
          // rotation:0
        },
        tickInterval: data.time.length - 1,        //最小间隔
        // softMax: 495, // softMax 是可变的最大值
        // max: 495,
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          overflow: 'justify',
          style: {
            color: "#eee",
            fontSize: "11px"
          }
        },
        // labels: {
        //     formatter: function() {
        //         return this.value + "%";
        //     }
        // },
        tickPositions: [50, 100, 150, 200, 250,300], // 指定竖轴坐标点的值
        //opposite: true,                    //放在对面
        tickLength: 1,
        alternateGridColor: null,
        minorGridLineWidth: 0,
        gridLineWidth: 1, //null 不出现线条
        gridLineDashStyle: "Dot"
      },
      credits: {
        enabled: false
      },
      tooltip: {
        // enabled:false,
        valueSuffix: ' 次/分钟'
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 3
            }
          },
          marker: {
            enabled: false
          },
        }
      },
      series: [{
        name: '体动',
        color: "#32e3c0",
        // data: [14, 10, 20, 30, 40, 50, 60, 70, 80, 90,14, 10, 20, 30, 40, 50, 60, 70, 80, 90]
        data: data.doingData,
      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
  },
}


