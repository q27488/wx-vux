/**
 Author: YijunChen
 Create:2017/8/1
 Detail:多边形蜘蛛图
 log: 2017/8/1  不再依赖jQuery，纯js实现
 use: import spiderChart from 'spiderChart.js'
 */

function SpiderChart(options) {
  this.options = {
    id: "",                    //容器Id
    canvasId: 'spiderChart', // canvas的ID
    level: ["优质", "良好", "略差", "不及格"], //蜘蛛图框 级数,由第0个为最中心
    levelColor: ["#9ecaac", "#65cd87", "#2aa151", "#236639"], //蜘蛛图框 颜色,默认为 #ddd
    labelSize: "14",                    //label块的大小
    labelColor: "#fff",                 //label块的字体文字颜色，
    dataLineColor: "#f0730d",           //数据线的颜色
    dataLineWidth: "3",                 //数据线的宽度
    series: [{
      name: "这是第1个label",
      level: 0,
    }, {
      name: "这是第2个label",
      level: 1,
    }, {
      name: "这是第3个label",
      level: 2,
    }, {
      name: "这是第4个label",
      level: 3,
    }, {
      name: "这是第5个label",
      level: 4,
    },]
  }

  if (Object.prototype.toString.call(options) === '[object Object]') { // 判断传入参数类型
    for (var i in options) { // 根据传入的参数，修改默认参数值
      this.options[i] = options[i]
    }
  } else {
    this.options.id = options
  }


  this._init();
}

SpiderChart.prototype = {
  //版本号
  version: '1.1.0',

  // 初始化方法
  _init: function () {
    "use strict";
    var parent = this;

    //设置最外层Div的css
    var con = document.getElementById(this.options.id);
    con.innerHTML = "";
    con.style.boxSizing = "border-box";
    con.style.paddingTop = "6%";
    con.style.textAlign = "center";


    //新建并设置label
    this.options.level.forEach(function (val, index) {
      var span = document.createElement('span');
      span.style.display = "inline-block";
      span.style.width = parent.options.labelSize + "px";
      span.style.height = parent.options.labelSize + "px";
      span.style.verticalAlign = "top";
      span.style.marginRight = "10px";
      span.style.backgroundColor = parent.options.levelColor[index] ? parent.options.levelColor[index] : "#ddd";

      var labelDiv = document.createElement('div');
      labelDiv.style.display = "inline-block";
      labelDiv.style.height = parent.options.labelSize + "px";
      labelDiv.style.lineHeight = parent.options.labelSize + "px";
      labelDiv.style.verticalAlign = "middle";
      labelDiv.style.margin = "0% 10px 0";
      labelDiv.style.fontSize = "12px";
      labelDiv.style.color = parent.options.labelColor;

      labelDiv.appendChild(span);
      var labelText = document.createTextNode(parent.options.level[index]);
      labelDiv.appendChild(labelText);

      // var labelText = parent.options.level[index];
      // var labelDiv = '<div style="display: inline-block;margin: 3% 10px 0;fontSize: 12px; verticalAlign: middle;height:'+
      //     parent.options.labelSize  +'px;lineHeight:'+ parent.options.labelSize +'px;color: '+ parent.options.labelColor +'">'+
      // + labelSpan + labelText + '</div>';
      con.appendChild(labelDiv);
    })

    //创建canvas DOM
    var canvas = document.createElement('canvas');
    canvas.id = this.options.canvasId;
    if(con.offsetWidth / con.offsetHeight > 3/2 ){
      this.options.width = con.offsetWidth > 0 ? (con.offsetWidth * 0.6) : '100';
    }else{
      this.options.width = con.offsetWidth > 0 ? con.offsetWidth : '100';
    }

    this.options.height = con.offsetHeight > 0 ? (con.offsetHeight * 0.88) : '30';
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    canvas.innerHTML = '您的浏览器版本不支持canvas';
    con.appendChild(canvas);


    drawCanvas(parent.options, this.options.canvasId,
      this.options.width, this.options.height);
  }
}
//绘制canvas
function drawCanvas(params, canvasId,
                    canvasWidth, canvasHeight
) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');

  // !确定多边形蜘蛛图 的点
  // console.log(params.series)
  // console.log(params.level)
  var polygonSize = params.series.length; //多少边形
  var polygonLevel = params.level.length; //多少层
  var polygonTextArr = []; //label文字 所在位置数组
  var dataLineArr = []; //用于绘制数据的位置数据
  //绘制canvas
  var originPoint = {x: params.width / 2, y: params.height / 2 + 10}; //圆点
  var radius = params.width / 4; //半径

  // console.log(window.devicePixelRatio);
  //针对retain屏消除锯齿
  if (window.devicePixelRatio) {
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.width = canvasWidth * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    // console.log("retain");
  } else {
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  //清空canvas块
  // context.clearRect(0, 0, canvasWidth, canvasHeight);

  //绘制多层多边形
  for (var i = 0; i < polygonLevel; i++) {
    var index = (polygonLevel - i) / (polygonLevel);
    drawPolygon(originPoint, polygonSize, radius * index, params.levelColor[i],context);
  }


  //计算提示文字位置
  for (var i = 0; i < polygonSize; i++) {
    var P = "";
    var angle = i * Math.PI * 2 / polygonSize - Math.PI * 2 / 360 * 18;
    //在顶角的位置radius 减小一点
    if (i == polygonSize - 1) {
      var P = getArcPoint(originPoint, radius + 14, angle);
    } else {
      var P = getArcPoint(originPoint, radius + 24, angle);
    }
    polygonTextArr.push(P);
  }
  //绘制多边形-label提示
  for (var i = 0; i < polygonSize; i++) {
    // drawLine(originPoint,polygonLineArr[i],"green");
    drawText(polygonTextArr[i], params.series[i].name,params.labelColor,context);
  }

  //多边形中心放射线
  drawLine(originPoint, polygonSize, radius, params.levelColor[0],1,context);

  //计算数据线的位置点
  for (var i = 0; i < polygonSize; i++) {
    var dataLevel = params.series[i].level;
    var angle = i * Math.PI * 2 / polygonSize - Math.PI * 2 / 360 * 18;
    var P = getArcPoint(originPoint, radius * (dataLevel / polygonLevel), angle);
    dataLineArr.push(P);
  }
  //绘制数据的线
  for (var i = 0; i < polygonSize; i++) {
    if (dataLineArr[i + 1]) {
      drawDataLine(dataLineArr[i], dataLineArr[i + 1], params.dataLineColor, params.dataLineWidth,context);
    } else {
      drawDataLine(dataLineArr[i], dataLineArr[0], params.dataLineColor, params.dataLineWidth,context);
    }
  }
}

/*  获取圆弧上的点
 *  point - 圆点坐标 point{x:0,y:0}， r-圆弧半径r ， angle-圆弧角度
 */
function getArcPoint(point, r, angle) {
  // var r = ops.arc_radius - 2;
  // var angle = i * Math.PI * 2 / 36; //将360° 分成36分
  // var x = 0,
  //     y = 0;
  // x = Math.sin(angle) * r;
  // y = Math.cos(angle) * r;
  // x = x + ops.position_y / 2;
  // y = y + ops.position_x / 2;
  var disp_x = 0,
    disp_y = 0;
  var P = {};
  disp_y = Math.sin(angle) * r;
  disp_x = Math.cos(angle) * r;
  disp_y = disp_y + point.y;
  disp_x = disp_x + point.x;
  P = {
    x: disp_x,
    y: disp_y
  }
  return P;
}

//绘制多边形
function drawPolygon(originPoint, n, r, color,context) {
  var i, ang;
  ang = Math.PI * 2 / n;
  context.save();
  // ctx.fillStyle = 'rgba(255,0,0,.3)';
  // context.strokeStyle = 'hsl(120,50%,50%)';
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.translate(originPoint.x, originPoint.y);
  context.moveTo(0, -r);
  context.beginPath();
  for (i = 0; i < n; i++) {
    context.rotate(ang);
    context.lineTo(0, -r);
  }
  context.closePath();
  // context.fill();
  context.stroke();
  context.restore();
}
//画线函数
function drawLine(startP, n, r, lineColor, lineWidth,context) {
  var ang = Math.PI * 2 / n;
  // console.log(context)
  context.save();
  context.translate(startP.x, startP.y); //将绘图原点移到画布中点
  context.strokeStyle = lineColor;
  context.lineWidth = lineWidth || 1;

  context.beginPath();
  for (var i = 0; i < n; i++) {
    context.moveTo(0, 0);
    context.rotate(ang) //旋转
    context.lineTo(0, -r);
  }
  context.closePath();
  context.stroke();
  context.restore();
  // context.lineCap = 'square';
}
//绘制文字
function drawText(point, text,labelColor,context) {
  context.font = "14px"; // 字体大小，样式
  context.fillStyle = labelColor; // 颜色
  context.textAlign = "center"; // 位置
  context.textBaseline = "middle";
  context.moveTo(point.x, point.y); // 文字填充位置
  context.fillText(text, point.x, point.y);
}
//绘制数据线
function drawDataLine(startP, endP, lineColor, lineWidth,context) {
  //再画线
  context.save();
  context.strokeStyle = lineColor;
  context.lineWidth = lineWidth || 1;
  context.beginPath();
  context.moveTo(startP.x, startP.y);
  context.lineTo(endP.x - 1, endP.y - 1);
  context.closePath();
  context.stroke();
  context.clearRect(startP.x - 4, startP.y - 4, 8, 8);   //为了实现空心圆
  context.restore();

  //先画点
  context.beginPath();
  context.arc(startP.x, startP.y, lineWidth * 3 / 2, 0, 360, false);
  // context.fillStyle = lineColor; //填充颜色
  // context.fill(); //画实心圆
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor; //填充颜色
  context.stroke(); //画空心圆
  context.closePath();

  //消除最后一个圆圈异常bug
  context.moveTo(endP.x, endP.y);
  context.clearRect(endP.x - 4, endP.y - 4, 8, 8);
  context.beginPath();
  context.arc(endP.x, endP.y, lineWidth * 3 / 2, 0, 360, false);
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor; //填充颜色
  context.stroke(); //画空心圆
  context.closePath();
}


module.exports = SpiderChart

