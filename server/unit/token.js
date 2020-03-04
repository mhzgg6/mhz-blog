/*
 * @Author: mhz 
 * @Date: 2019-11-4 14:57
 */

const jwt = require('jsonwebtoken')
const {TOKEN_ENCODE_STR, URL_YES_PASS} = require('./config')

module.exports = {
    //  生成登陆 token
    create_token(str) {
        return jwt.sign({str}, TOKEN_ENCODE_STR, {expiresIn: '2h'})
    },
    /*
      验证登陆 token 是否正确 => 写成中间件
      get 请求与设置的不会被拦截，其余均需要登陆 
    */
    async check_token(ctx, next) {
        let url = ctx.url

        //  方法不为 get    路径不包括 /api/reg /api/login
        if(ctx.method != 'GET' && !URL_YES_PASS.includes(url)){
            var token = ctx.get('Authorization')
            if(token == ''){
                //  直接抛出错误
                ctx.response.status = 401
                ctx.response.body = '宝贝，你还没有登陆，快去登录吧'
                return
            }else{
                try{
                    let payload
                    //  验证 token 是否过期
                    payload = await jwt.verify(token, TOKEN_ENCODE_STR)
                    ctx.response.body = {
                        msg: '已经登陆了哦'

                
                    }
                }catch(err) {
                    ctx.response.status = 401
                     ctx.response.body = "登录已过期请重新登录!!>_<!!"
                     return
                }
                    
            }
        }
        await next()
    }
}
