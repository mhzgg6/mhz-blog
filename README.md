# mhz-blog
### 个人博客

前端： vue全家桶

后台： node.js koa2 mongoose

数据库： mongodb 

服务器： centOS7 nginx

图片保存/静态资源： 七牛云

web文件夹是博客前端代码，server文件夹是后台服务器代码，admin文件夹是博客后台管理界面代码

后台编辑器是： mavonEditor

博客地址： http://mhzgg.com

### Run

1.clone本仓库到本地

2.开启mongodb服务

3.进入server文件夹，开启node服务

```
cd ./server
npm/cnpm i
node app
```
4.进入web或者admin文件夹

```
cd ./web || ./admin
npm/cnpm i
npm run serve
```
#### 前端界面展示
![show_one](http://cdn.mhzgg.com/show_one.png)

![show_two](http://cdn.mhzgg.com/show_two.png)

#### 后台管理界面展示
![show_three](http://cdn.mhzgg.com/show_three.png)

![show_four](http://cdn.mhzgg.com/show_four.png)

#### ToDo
* 优化代码，减少首屏加载时间
* 前端尽量少使用第三方插件，尽量自己去封装组件
* 二级评论
* 实现搜索功能
* 写文章实时保存
* 完善后台功能

