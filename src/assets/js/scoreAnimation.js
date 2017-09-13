/**
 @Author: Chan
 @Create: 2017/9/7
 @des:  针对公司业务canvas动画
 @use: import scoreAnimation.js
 @others: 2017/8/1  不再依赖jQuery，纯js实现
 */

function scoreAnimation(options) {
  this.options = {
    id: "", //cavas ID
    width: "0", //canvas宽度
    height: "0", // canvas高度
    position_x: "0", //圆的圆点x座标
    position_y: "0", //圆的圆点y座标
    color:"#2aa151",        //主要色调

    circle_radius: "60", //实心圆半径
    circle_bakClr: "#2aa151", //实心圆背景色

    text_font: "bold 28pt PingFang-SC-Medium", //文字字体
    text_color: "#fff",                       //文字颜色
    text_textAlign: "center", //左右居中  start、end、right、center
    text_textBaseline: "middle", //上下居中   top、hanging、middle、alphabetic、ideographic、bottom
    text_tip: "睡眠质量", //提示文字

    arc_color: "#2aa151", //弧的颜色
    arc_bckColor: "rgba(42,161,81,0.2)", //弧的未激活颜色
    arc_lineWidth: "4.0", //弧的宽度
    arc_radius: "40", //弧的半径

    arc_Endcolor: "#2ddd64", //圆弧终点圆点 -颜色
    arc_EndlineWidth: "8", //圆弧终点宽度 -颜色

    present: "50", //数值
  }

  if (Object.prototype.toString.call(options) === '[object Object]') { // 判断传入参数类型
    for (var i in options) { // 根据传入的参数，修改默认参数值
      this.options[i] = options[i]
    }
  } else {
    return console.error("scoreAnimation:请输入正确的ID")
    // this.options.id = options
  };
  var canvas = document.getElementById(this.options.id);
  var context = canvas.getContext('2d');
  var ops = this.options;

  //针对retain屏消除锯齿
  if (window.devicePixelRatio) {
    canvas.style.width = ops.width + "px";
    canvas.style.height = ops.height + "px";
    canvas.height = ops.height * window.devicePixelRatio;
    canvas.width = ops.width * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    console.log("retain");
  } else {
    canvas.style.width = ops.width + "px";
    canvas.style.height = ops.height + "px";
    canvas.width = ops.width;
    canvas.height = ops.height;
  }

  //确定圆心位置
  let circleP = {
    x:ops.position_x = ops.width  /2,
    y:ops.position_y = ops.height / 2 - 40
  }
  drawBck(context, circleP,
    ops.circle_radius,
    ops.arc_bckColor,
    ops.arc_lineWidth);
  drawRing(context, ops.present,
    circleP,
    ops.circle_radius,
    ops.circle_bakClr,
    ops.arc_Endcolor);
  drawAllLine(context,ops.width,
    ops.circle_radius,
    ops.arc_lineWidth,
    ops.circle_bakClr);
}


//背景
function drawBck(context, circleP, radius, bckColor, lineWidth) {
  var radiusOut1 = radius * 1.2;
  var radiusOut2 = radius * 1.4;

  //发散线条
  var drawLine = function (context, circleP, radius, bckColor) {
    var lineList = [];
    for (var i = 0; i <= 36; i++) {

      var P = {};
      P = getArcPoint(circleP.x, circleP.y, radius - 2, i * Math.PI * 2 / 36);
      lineList.push(P);
    }
    // console.log(lineList);
    context.strokeStyle = bckColor;
    context.fillStyle = "rgb(250,0,0)"
    for (var i = 0; i < lineList.length; i++) {
      context.beginPath();
      context.moveTo(circleP.x, circleP.y);
      context.lineTo(lineList[i].x, lineList[i].y);
      context.stroke();
      context.closePath();
    }
  }
  //绘制外圆
  var drawRingOut = function (context, circleP, radius, bckColor, lineWidth) {
    //最外层圆环
    context.beginPath();
    context.strokeStyle = bckColor;
    context.lineWidth = lineWidth;
    context.arc(circleP.x, circleP.y, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  };

  drawLine(context, circleP, radiusOut1, bckColor);
  drawRingOut(context, circleP, radiusOut1, bckColor, lineWidth)
  drawRingOut(context, circleP, radiusOut2, bckColor, lineWidth / 2)
}

//数字及圆环动画
function drawRing(context, present, circleP, radius,lineColor,endColor) {
  //健壮性校验
  if (!context) {
    return console.error("drawRing:请输入正确的canvas");
  }
  if (!(circleP.x && circleP.y)) {
    return console.error("drawRing:请输入正确的圆心");
  }
  if (isNaN(Math.floor(present))) {
    return console.error("drawRing:请输入数字");
  }

  var present = Math.floor(present);
  var curNum = 0; //初始值
  var radius = radius || 10; //默认半径为10
  var radius_out = radius * 1.2; //外层圆环半径为内实心圆的1.2倍
  var ringTimer = null; //动画定时器

  //绘制指定弧度的圆环，从-90°开始绘制
  //@params:context-canvas对象,
  // 		circleP-圆心位置,
  //		radius-内实心圆半径,
  //		radius_out-外圆环半径,
  //		cur-百分比
  var draw = function (context, circleP, radius, radius_out, cur,color,endColor) {
    context.beginPath();
    context.arc(circleP.x, circleP.y, radius, 0, 360, false);
    context.fillStyle = color; //填充颜色,默认是黑色
    context.fill(); //画实心圆
    context.closePath();

    //在中间写字
    context.font = "bold 28pt PingFang-SC-Medium"; // 字体大小，样式
    context.fillStyle = "#fff"; // 颜色
    context.textAlign = "center"; // 位置
    context.textBaseline = "middle";
    context.moveTo(circleP.x, circleP.y); // 文字填充位置
    context.fillText(parseInt(cur), circleP.x, circleP.y - 10);
    context.font = "normal 12pt PingFang-SC-Medium";
    context.fillText("睡眠质量", circleP.x, circleP.y + 20);


    // 画内圆
    context.beginPath();
    // 绘制一个中心点为（position_x/2, position_y/2），半径为position_y/2-5不与外圆重叠，
    // 起始点-(Math.PI/2)，终止点为((Math.PI*2)*cur)-Math.PI/2的 整圆cur为每一次绘制的距离
    context.lineWidth = "4.0";
    context.strokeStyle = color;
    context.arc(circleP.x, circleP.y, radius_out, -(Math.PI / 2), ((Math.PI * 2) * (cur / 100)) - Math.PI / 2, false);
    context.stroke();

    /*圆弧终点画一高亮点*/
    if (cur == present) {
      var r = radius_out;
      var angle = ((Math.PI * 2) * (cur / 100)) - Math.PI / 2;
      var x = 0,
        y = 0;
      var P = {
        x: 0,
        y: 0
      }
      x = Math.sin(angle) * r;
      y = Math.cos(angle) * r;
      P.x = x + circleP.y;
      P.y = y + circleP.x;

      context.beginPath();
      context.arc(P.y, P.x, 6, 0, 360, false);
      context.fillStyle = endColor; //填充颜色,默认是黑色
      context.fill(); //画实心圆
      context.closePath();

    }
  };
  //draw(context,circleP, radius,radius_out,50);

  timer = setInterval(function () {
    if (curNum > present) {
      clearInterval(timer);
    } else {
      draw(context, circleP, radius, radius_out, curNum,lineColor,endColor);
      curNum += 1;
    }
  }, 10);
}

/*
 * @des:线条动画
 * @param:starP-开始位置，endP-结束位置,timing-步进,
 *		  type：hollow-空心圆/solid-实心圆
 */
function drawLine(context, starP, endP,color, timing, delay, type,lineWidth) {
  // console.log(starP.x)
  // console.log(starP.y)
  // console.log(endP.x)
  // console.log(endP.y)
  if (!(starP.x && starP.y && endP.x && endP.y)) { //健壮性校验
    console.error("请输入正确的开始位置与结束位置");
    return;
  }
  var timing = timing || 50;
  var depart = 10; //将线段分成10份来进行动画，其中每份动画的执行时间为timing
  var adx_addNum = (endP.x - starP.x) / depart; //确定步进
  var ady_addNum = (endP.y - starP.y) / depart;
  var adx_next = starP.x + adx_addNum;
  var ady_next = starP.y + ady_addNum;
  var radius = 4; //空心圆或实心圆半径
  //var radius_ = radius*0.7;		//半径位移，用于修圆心不准
  var timer = null; //用来保存定时器
  var delay = delay || 0; //延时执行时间
  var lineWidth = lineWidth || 1;

  //画实心圆或空心圆函数
  var drawCircle = function (context, type, circleX, circleY, radius) {
    if (!type) {
      // return console.error("请输入正确的type用以绘制圆");
      return;     //没有输入圆的类型就不绘制
    }
    // context.clearRect(circleX - 4, circleY - 4, 8, 8 );
    if (type == "hollow") {
      context.beginPath();
      context.strokeStyle = "#4a8bff";
      context.arc(circleX, circleY, radius, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
    } else if (type == "solid") {
      context.beginPath();
      context.arc(circleX, circleY, radius, 0, 360, false);
      context.fillStyle = "#4a8bff"; //填充颜色,默认是黑色
      context.fill(); //画实心圆
      context.closePath();
    }

  }
  //drawCircle(context,"solid",100,100,20);

  setTimeout(function () {
    timer = setInterval(function () {
      context.beginPath(); // 开始绘制线条
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = 'butt';
      context.moveTo(starP.x, starP.y);
      context.lineTo(adx_next, ady_next);
      context.stroke(); //注意，这里没有closePath(),是为了更好的视觉效果
      adx_next = adx_next + adx_addNum;
      ady_next = ady_next + ady_addNum;

      //以下针对各个方向的线进行了判断，达到条件清除定时器
      if (starP.x == endP.x) { //针对竖线
        if (ady_next > endP.y && (endP.y - starP.y) > 0) {
          clearInterval(timer);
          drawCircle(context, type, endP.x, endP.y , radius);
        } else if (ady_next < endP.y && (endP.y - starP.y) < 0) {
          clearInterval(timer);
          drawCircle(context, type, endP.x, endP.y , radius);
        }
      } else if (starP.y == endP.y) {
        if (adx_next > endP.x && (endP.x - starP.x) > 0) {
          clearInterval(timer);
          drawCircle(context, type, endP.x, endP.y, radius);
        } else if (adx_next < endP.x && (endP.x - starP.x) < 0) {
          clearInterval(timer);
          drawCircle(context, type, endP.x , endP.y, radius);
        }
      } else if ((endP.x - starP.x) < 0) {
        if (adx_next < endP.x && endP.y > starP.y) {
          clearInterval(timer);
          drawCircle(context, type, endP.x , endP.y , radius);
        } else if (adx_next <= endP.x && endP.y < starP.y) {
          clearInterval(timer);
          drawCircle(context, type, endP.x , endP.y , radius);
        }
      } else if ((endP.x - starP.x) >= 0) {
        if (adx_next >= endP.x && (endP.y - starP.y) > 0) {
          clearInterval(timer);
          drawCircle(context, type, endP.x , endP.y , radius);
        } else if (adx_next >= endP.x && (endP.y - starP.y) <= 0) {
          clearInterval(timer);
          drawCircle(context, type, endP.x - 1, endP.y + 3, radius);
        }
      }

    }, timing)
  }, delay);

}

/*根据业务绘制所有的动画*/
function drawAllLine(context,contWidth, radius,lineColor) {
  console.log(radius)
  var P1 = [{
    x: 0,
    y: 0
  }, //start
    {
      x: 0,
      y: 0
    }, //middle
    {
      x: 0,
      y: 0
    }, //end
  ];
  //P1的中点坐标
  P1[1].y = 10;
  P1[1].x = contWidth * 3/4 - 1;
  //P1的开始位置
  P1[0].y = 10;
  P1[0].x = contWidth * 0.8;
  //P1的结束位置，在圆弧上
  var tempP = getArcPoint(contWidth / 2, contWidth / 2  - 40, radius * 1.4 , 30 * Math.PI * 2 / 36);
  P1[2].x = tempP.x ;
  P1[2].y = tempP.y ;
  drawLine(context, P1[0], P1[1],lineColor, 50, 0);
  drawLine(context, P1[1], P1[2],lineColor, 50, 600, "hollow");

  var P2 = [
    {x: 0, y: 0}, //start
    {x: 0, y: 0}, //middle
    {x: 0, y: 0}, //end
  ];

  //P2的结束位置，在圆弧上
  var tempP = getArcPoint(contWidth / 2, contWidth / 2 - 40, radius * 1.4, 3 * Math.PI * 2 / 36);
  P2[2].x = tempP.x;
  P2[2].y = tempP.y;
  //P2的中点坐标
  P2[1].y = P2[2].y + 30;
  P2[1].x = contWidth * 3/4 ;
  //P2的开始坐标
  P2[0].y =  P2[2].y + 30;
  P2[0].x = contWidth * 3/4 +30;
  drawLine(context, P2[0], P2[1],lineColor, 50, 0);
  drawLine(context, P2[1], P2[2],lineColor, 50, 600, "hollow");


  //P3的结束位置，在圆弧上
  var P3 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //middle
    { x: 0, y: 0 }, //end
  ];
  var tempP = getArcPoint(contWidth / 2, contWidth / 2 - 40, radius * 1.4, 7 * Math.PI * 2 / 36);
  P3[2].x = tempP.x;
  P3[2].y = tempP.y;
  //P3的中点坐标
  P3[1].y = P3[2].y + 30 ;
  P3[1].x = contWidth * 3/4 - 50 ;
  //P3的开始坐标
  P3[0].y = P3[2].y + 30 ;
  P3[0].x = contWidth * 3/4 - 30;
  drawLine(context, P3[0], P3[1],lineColor, 50, 0);
  drawLine(context, P3[1], P3[2],lineColor, 50, 600, "hollow");

  var P4 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //middle
    { x: 0, y: 0 }, //end
  ];
  //P4的结束位置，在圆弧上
  var tempP = getArcPoint(contWidth / 2, contWidth / 2 -40, radius * 1.4 - 8, 12 * Math.PI * 2 / 36);
  P4[2].x = tempP.x;
  P4[2].y = tempP.y;
  //P4的中点坐标
  P4[1].y = contWidth * 3/4;
  P4[1].x = P4[2].x - 30;
  //P4的开始坐标
  P4[0].y = contWidth * 3/4;
  P4[0].x = P4[2].x - 50;

  drawLine(context, P4[0], P4[1],lineColor, 50, 0);
  drawLine(context, P4[1], P4[2],lineColor, 50, 600, "solid");


  var P5 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //middle
    { x: 0, y: 0 }, //end
  ];
  //P5的结束位置，在圆弧上
  var tempP = getArcPoint(contWidth / 2, contWidth / 2 -40, radius * 1.4 - 4, 14 * Math.PI * 2 / 36);
  P5[2].x = tempP.x;
  P5[2].y = tempP.y;
  //P5的中点坐标
  P5[1].y = P5[2].y;
  P5[1].x = P5[2].x - radius / 2;
  //P5的开始坐标
  P5[0].y = P5[2].y;
  P5[0].x = P5[2].x - radius;

  drawLine(context, P5[0], P5[1],lineColor, 50, 0);
  drawLine(context, P5[1], P5[2],lineColor, 50, 600, "solid");

  var P6 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  //P6的开始位置，在圆弧90°上
  var tempP = getArcPoint(contWidth / 2, contWidth / 2 -40, radius * 1.4 - 4,  Math.PI * 2 / 4);
  P6[0].x = tempP.x;
  P6[0].y = tempP.y + 1 * window.devicePixelRatio;
  //P6结束位置
  P6[1].x = tempP.x;
  P6[1].y = contWidth * 0.9;
  drawLine(context, P6[0], P6[1],lineColor, 50, 1000);

  //横线

  //P7,P9左横线
  var P7 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  P7[0].x = P6[1].x;
  P7[0].y = P6[1].y - 3 * window.devicePixelRatio;
  //P7结束位置
  P7[1].x = contWidth * 2 / 10;
  P7[1].y = P7[0].y;
  drawLine(context, P7[0], P7[1],lineColor, 50, 1400);

  var P9 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  P9[0].x = P7[1].x + 4 * window.devicePixelRatio;
  P9[0].y = P7[1].y ;
  //P9结束位置
  P9[1].x = contWidth * 1 / 10;
  P9[1].y = P9[0].y;
  drawLine(context, P9[0], P9[1],lineColor, 50, 1800,"",2);


  //P8，P10右横线
  var P8 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  P8[0].x = P6[1].x;
  P8[0].y = P6[1].y - 3 * window.devicePixelRatio;
  //P8结束位置
  P8[1].x = contWidth * 8 / 10;
  P8[1].y = P8[0].y;
  drawLine(context, P8[0], P8[1],lineColor, 50, 1400);
  var P10 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  P10[0].x = P8[1].x - 4 * window.devicePixelRatio;
  P10[0].y = P8[1].y ;
  //P10结束位置
  P10[1].x = contWidth * 9 / 10 ;
  P10[1].y = P10[0].y;
  drawLine(context, P10[0], P10[1],lineColor, 50, 1800,"",2);

  /*最后2条竖线*/
  //P11

  var P11 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  P11[0].x = contWidth * 2 / 3;
  P11[0].y = P6[1].y - 3 * window.devicePixelRatio;
  //P11结束位置
  P11[1].x = contWidth * 2 / 3;
  P11[1].y = contWidth +40;
  drawLine(context, P11[0], P11[1],lineColor, 50, 1600);

  //P12
  var P12 = [
    { x: 0, y: 0 }, //start
    { x: 0, y: 0 }, //end
  ];
  P12[0].x = contWidth * 1 / 3;
  P12[0].y = P6[1].y - 3 * window.devicePixelRatio;
  //P12结束位置
  P12[1].x = contWidth * 1 / 3;
  P12[1].y = contWidth +40;
  drawLine(context, P12[0], P12[1],lineColor, 50, 1600);

}


/*  获取圆弧上的点
 *  @param:x-圆点坐标x ，
 *			y-圆点坐标y ，
 *			r-圆弧半径r ，
 *			angle-圆弧角度
 */
function getArcPoint(x, y, r, angle) {
  var disp_x = 0,
    disp_y = 0;
  var P = {};
  disp_y = Math.sin(angle) * r;
  disp_x = Math.cos(angle) * r;
  disp_y = disp_y + y;
  disp_x = disp_x + x;
  P = {
    x: disp_x,
    y: disp_y
  }
  return P;
}


module.exports = scoreAnimation;

