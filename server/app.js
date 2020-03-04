const Koa = require('koa')
const router = require('./routers/router')
const body = require('koa-body')
const static = require('koa-static')
const path = require('path')
const {check_token} = require('./unit/token')

const app = new Koa

//  解决跨域问题
// app.use( cors() )
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})
app.use(async (ctx, next)=> {
    // 响应头表示是否可以将对请求的响应暴露给页面
    ctx.set('Access-Control-Allow-Credentials', true)
    // 允许跨域操作的具体域名
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    // 列出将会在正式请求的 Access-Control-Expose-Headers 字段中出现的首部信息
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200
    } else {
      await next()
    }
})



//  处理post请求
app.use( body({
    formidable: {
        //  设置文件的默认目录,不设置则保存在系统临时目录下
        uploadDir: path.resolve(__dirname, './static/uploads'),    
    },
    //  开启文件上传,默认关闭
    multiples: true,
    //  支持文件上传
    multipart: true
}))

//  添加 token 验证
app.use( check_token )

//  开启静态文件访问
app.use( static(
    path.resolve(__dirname, './static')
))

//  注册路由信息
app.use( router.routes() )
   .use( router.allowedMethods() )

app.listen(3000, () => {
    console.log('我成功了，监听再3000端口', __dirname)
})