# wx-vux

> 微信移动端项目，使用vue的移动UI框架[vux](https://vux.li/)

## Build Setup

``` bash
# 安转依赖包
npm install

# 服务与热重载在 localhost:8080
npm run dev

# 建立生产与压缩
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目目录说明
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── node_modules       // npm包资源 
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── db.json            // mock数据json文件
├── .babelrc           // babel配置文件
├── .gitignore         // 忽略上传git配置
├── src                // 生产目录
│   ├── assets       // 图片/css资源
│   ├── components   // 各种组件
│   ├── page	        // 页面
│   │   ├── bind.vue              // 绑定页面
│   │   ├── hotelService.vue      // 酒店服务           
│   │   ├── monitorData.vue       // 实时数据
│   │   ├── noReport.vue          // 没有睡眠报告
│   │   ├── pay.vue               // 支付页面
│   │   ├── sleepReport.vue       // 睡眠报告
│   │   ├── sleepTrack.vue        // 睡眠足迹
│   ├── router	        // 路由配置文件
│   ├── vuex	       	  // vuex配置文件
│   ├── App.vue        // 主页面 
│   └── main.js        // Webpack 预编译入口

</pre>

## 个性化样式定制说明
执行完`npm install`加载完依赖包后，需要去一下路径修改依赖包的源代码，以实现定制化样式
1.  `node_modules/vux/src/component/alert/index.vue`添加:  
```
<style scoped>
  .weui-dialog .weui-dialog__ft{
    display: none;
  }
</style>
```
隐藏alert的确定按钮

## 更新日志
> 2017/09/13：  

   1.UI界面与交互基本完成  
   2.使用express与body-parse，读取db.json的假数据
     `npm install body-parse --save` 修改`build/dev-server.js`与`config/index.js`,详情见这2个文件.

