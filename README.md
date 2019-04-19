#iRead

整个项目一共10个页面,使用了vue全家桶，主要实现了小说搜索，小说搜索结果缓存，小说阅读，历史记录，小说排行，小说分类。

项目中的API均来自追书神器，纯属共享学习。使用代理，本地可以完美运行。

[API文档](https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md)

## 本地运行

使用vue-cli工具构建，基本命令如下：
``` bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产模式
npm run build

```
电脑端请开启开发者模式
[在线预览地址](http://106.15.202.184:81)

手机扫码：
<img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/1555670369.png?raw=true" width="100"/>

## 实现功能

- [x] 小说书架
- [x] 分类查询
- [x] 排行榜
- [x] 搜索（搜索历史，自动补全）
- [x] 小说详情
- [x] 阅读历史记录（记录阅读章节）
- [x] 阅读夜间模式


## 屏幕截图

<img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/1.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/2.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/3.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/4.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/5.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/6.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/7.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/8.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/9.png?raw=true" width="280"/> <img src="https://github.com/A-boy-lj/iRead/blob/master/screenshots/10.png?raw=true" width="280"/> 
## 问题
记录在项目中遇到的一些问题，和解决方法
 -  -webkit-box-orient: vertical;在webpack编译后无效
    -  后来在网上查询一番，发现可能是optimize-css-assets-webpack-plugin这个插件的问题，其实解决办法很简单，只需要在这个属性前后加一个特殊注释即可。
/*! autoprefixer: off */
 -webkit-box-orient: vertical;
/* autoprefixer: on */

-  追书api虽开放了接口，但不能够跨域访问
    - 在访问api时需要转发，在本地调试利用了vue的proxyTable
但这种方式仅适用于开发模式，打包后为一个静态文件，这种方式就失效了。
   -  部署到服务器我选择的是Nginx做代理转发，其实也很简单。网上很多问答都能解决这个问题。


