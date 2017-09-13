/**
 @Author: Chan
 @Create: 2017/9/12
 @des:  上下分布的柱形图
 @use: import cylindricalBi.js
 */
function cylindricalBi(options) {
  this.options = {
    id: "",           //cavas ID
    width:320,
    height:320,
    lineX1: 80,		  //第一条X轴
    lineX2: 80 + 30,	//第二条X轴
    borderHeight: 50,	//柱的高度
    xSpace: 50,	    //文字间隔
    dataWidth: 270,  //x轴总宽度（320-50）
    startTime: 100,	  //开始的时间戳,必须项
    endTime: 250,	    //结束的时间戳,必须项
    text: ["清醒", "浅睡", "中睡", "深睡"],
    colors: ['#111', '#ccc', '#0ae', '#0aa'],
    timeSpace: ['01:00', '02:00', '03:00', '04:00', '05:00'],
    //type: -1-清醒，1-浅睡，2-中睡，3-深睡
    data: [
      {
        type: 0,
        begin: 100,
        end: 110,
      },
      {
        type: -1,
        begin: 115,
        end: 120,
      },
      {
        type: -2,
        begin: 120,
        end: 145,
      },
      {
        type: -3,
        begin: 145,
        end: 155,
      },
      {
        type: -2,
        begin: 155,
        end: 175,
      },
      {
        type: -1,
        begin: 175,
        end: 185,
      },
      {
        type: 0,
        begin: 210,
        end: 250,
      },
    ]
  }

  if (Object.prototype.toString.call(options) === '[object Object]') { // 判断传入参数类型
    for (var i in options) { // 根据传入的参数，修改默认参数值
      this.options[i] = options[i]
    }
  } else {
    return console.error("scoreAnimation:请输入正确的ID")
    // this.options.id = options
  }
  ;
  var canvas = document.getElementById(this.options.id);
  var cx = canvas.getContext('2d');
  var ops = this.options;
  var img=new Image();			//绘制icon
  var imgFlag = true;				//进入睡眠标志图标
  var diffTime= ops.endTime - ops.startTime; //时间戳差值

  //针对retain屏消除锯齿
  if (window.devicePixelRatio) {
    canvas.style.width = ops.width + "px";
    canvas.style.height = ops.height + "px";
    canvas.height = ops.height * window.devicePixelRatio;
    canvas.width = ops.width  * window.devicePixelRatio;
    cx.scale(window.devicePixelRatio, window.devicePixelRatio);
  } else {
    canvas.style.width = ops.width  + "px";
    canvas.style.height = ops.height + "px";
    canvas.width = ops.width ;
    canvas.height = ops.height;
  }

  //轴
  drawLine(cx,0,0,0,300,1,'#fff');
  drawLine(cx,0,ops.lineX1,270,ops.lineX1,1,'#fff');
  drawLine(cx,0,ops.lineX2,270,ops.lineX2,1,'#fff');
  //刻度-Y
  cx.font = " 12px"; // 字体大小，样式
  cx.fillStyle = "#fff"; // 颜色
  cx.textAlign = "center"; // 位置
  cx.textBaseline = "middle";
  drawLine(cx,-10,30,0,30,1,'#fff');
  cx.fillText("清醒",20,30);
  for (var i = 1; i < ops.text.length ; i++) {
    drawLine(cx,-10,ops.lineX2+ops.borderHeight * i,0,ops.lineX2+ops.borderHeight*i,1,'#fff');
    cx.fillText(ops.text[i],20,ops.lineX2+ops.borderHeight*i);
  }
  //刻度-X
  for (var i = 0; i < ops.timeSpace.length; i++) {
    cx.fillText(ops.timeSpace[i],90 + ops.xSpace*i,ops.lineX2-15);
  }
  //绘制数据
  ops.data.forEach(function(item,index){
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    var color = "#fff";
    startX = 51 + (item.begin - ops.startTime)/diffTime * ops.dataWidth;
    // console.log("startX:",startX)
    endX = 51 + (item.end - ops.startTime)/diffTime * ops.dataWidth;
    // console.log("endX:",endX)
    if(item.type == 0){			//清醒
      startY = 80-1;
      endY = 30;
      color = ops.colors[0];
    }else{							//其他  -1浅睡，-2中睡，-3深睡
      startY = 110+1;
      endY = 110 + (item.type * -1) * 50;
      color = ops.colors[item.type * -1];
    }
    if(imgFlag){
      img.onload = function(){
        cx.drawImage(img,endX -12,startY - 24);
      };
      img.src="./static/sleepImg.png";
      imgFlag =!imgFlag;
    }
    drawRect(cx,startX,startY,endX,endY,color)
  })
}

function x(x) {
  return x + 50;
}

function g(grade) {
  return 15 * grade;
}

//画线
function drawLine(cx,b_x, b_y, e_x, e_y, width, color) {
  cx.strokeStyle = color;
  cx.lineWidth = width;
  cx.beginPath();
  cx.moveTo(x(b_x), b_y);
  cx.lineTo(x(e_x), e_y);
  cx.closePath();
  cx.stroke();
}

//绘制块
function drawRect(cx, startX, startY, endX, endY, color) {
  cx.beginPath();
  cx.moveTo(startX, startY);
  cx.lineTo(startX, endY);
  cx.lineTo(endX, endY);
  cx.lineTo(endX, startY);
  cx.fillStyle = color; //设置填充填的样式
  cx.fill(); //执行填充
  cx.beginPath();
}


module.exports = cylindricalBi;
