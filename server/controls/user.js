//  拿到 db 对象创建操作user数据库的模型对象
const User = require('../models/user')
const Verification = require('../models/verification')
const jwt = require('jsonwebtoken')
const { create_token } = require('../unit/token')

//  处理用户注册
exports.reg = async ctx => {
    //  用户注册时 post 发过来的数据
    const user = ctx.request.body
    const username = user.username
    const password = user.password
    const level = user.level
    const isAdmin = user.isAdmin
    const avater = user.avater || 'https://s2.ax1x.com/2020/01/12/lIbNd0.png'
    const email  = user.email
    const time = user.time
    const verificationCode = user.verificationCode

    let msg = {}

    let data = await Verification
    .find({"email":{$in:[email]}},{"time": 1,'email': 1, 'randomNum': 1})
    .sort('-created')       //  排序 以创建时间倒叙
    .limit(1) 
    
    if(data.length == 0) {//    数据库没有 直接注册
        //  先去数据库查询 当前发过来的 username 是否存在
        await new Promise((resolve, reject) => {
            //  去数据库 User 查询
            User.find({username}, (err, data) => {
                if(err)return reject(err)
                //  如果查询没有出错
                if(data.length !== 0){
                    //  查询到数据  用户已经存在
                    return resolve('')
                }
                //  用户名不存在 存到数据库
                const _user = new User({
                    username,
                    password,
                    level,
                    isAdmin,
                    avater
                })

                _user.save((err, data) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                })
            })
        })
        .then(async data => {
            if(data){
                //  注册成功
                msg = {
                    status: 1,
                    msg: '注册成功哦 宝贝'
                }
            }else{
                //  用户名存在
                msg = {
                    status: 0,
                    msg: '用户名已经存在哦 宝贝'
                }
            }    
        })
        .catch(async err => {
            //  注册失败
            msg = {
                status: 0,
                msg: '注册失败 请重试哦 宝贝'
            }
        })
    }else{
        //  判断时间是否过期
        let verifiTime = data[0].time
        let num = data[0].randomNum
        let val = time - verifiTime
        if(val < 600000) {//    10分钟  验证码没过期
            if(verificationCode == num) {//    验证码正确
                //  先去数据库查询 当前发过来的 username 是否存在
                await new Promise((resolve, reject) => {
                    //  去数据库 User 查询
                    User.find({username}, (err, data) => {
                        if(err)return reject(err)
                        //  如果查询没有出错
                        if(data.length !== 0){
                            //  查询到数据  用户已经存在
                            return resolve('')
                        }
                        //  用户名不存在 存到数据库
                        const _user = new User({
                            username,
                            password,
                            level,
                            isAdmin,
                            avater
                        })

                        _user.save((err, data) => {
                            if(err){
                                reject(err)
                            }else{
                                resolve(data)
                            }
                        })
                    })
                })
                .then(async data => {
                    if(data){
                        //  注册成功
                        msg = {
                            status: 1,
                            msg: '注册成功哦 宝贝'
                        }
                    }else{
                        //  用户名存在
                        msg = {
                            status: 0,
                            msg: '用户名已经存在哦 宝贝'
                        }
                    }    
                })
                .catch(async err => {
                    //  注册失败
                    msg = {
                        status: 0,
                        msg: '注册失败 请重试哦 宝贝'
                    }
                })
            }else{
                msg = {
                    status: 0,
                    msg: '宝贝，验证码不正确哟！'
                }
            }
        }else{//    验证码过期
            msg = {
                status: 0,
                msg: '宝贝，验证码过期哟！'
            }
        }
    }
   

    
    
    ctx.body = msg
    //  先去数据库查询 当前发过来的 username 是否存在
}

//  处理用户登陆
exports.login = async ctx => {
    //  用户注册时 post 发过来的数据
    const user = ctx.request.body
    const username = user.username
    const password = user.password


    await new Promise((resolve, reject) => {
        User.find({username}, (err, data) => {
            if(err)return
            if(data.length == 0)return reject('用户名不存在')

            //  用数据库密码和登陆密码判断
            if(data[0].password == password){
                return resolve(data)
            }
            resolve('')
        })
    })
    .then(async data => {
        if(!data){
            //  密码错误
            ctx.body = {
                status: 0,
                msg: '宝贝 密码错误哦'
            }
        }else{
            //  设置token
            const token = create_token(data[0].username)
            ctx.body = {
                status: 1,
                msg: '宝贝 登陆成功哦',
                data: {
                    _id: data[0]._id,
                    avater: data[0].avater,
                    username: data[0].username,
                    token,
                    isLogin: true
                }
            }
        }
    })
    .catch(async => {
        //  登陆失败
        ctx.body = {
            status: 0,
            msg: '宝贝 用户名不存在哦'
        }
    })
}

//  获取用户信息
exports.userinfo = async ctx => {
    const {id} = ctx.query

    const userinfo = await User
        .findById(id)

    ctx.body = {
        status: 1,
        userinfo
    }
}

//  修改头像
exports.userAvater = async ctx => {
    const info = ctx.request.body
    const id = info.id
    const avater = info.avater

    await User
        .findOneAndUpdate({"_id": id},{ $set: { "avater" : avater} })  

    .then(msg => {
        ctx.body = {
            msg: '修改头像成功',
            status: 1
        }
    })
    .catch(error => {
        ctx.body = {
            msg: '修改头像失败',
            status: 1
        }
    })
}