const nodemailer = require('nodemailer')
const Verification = require('../models/verification')

exports.getCode = async (ctx, next) => {
    let email = ctx.query.email
    //  后端判断 Email为标识 获取当前时间是否与数据库最后一条时间间隔 是否超过60s
    let res = await Verification
    .find({"email":{$in:[email]}},{"time": 1,'email': 1, 'randomNum': 1})
    .sort('-created')       //  排序 以创建时间倒叙
    .limit(1)

    let msg = {
        status: 1,
        msg: '宝贝，获取成功哟'
    }

    if(res.length == 0) {//  如果邮箱第一次获取 直接创建
        console.log('没有创建')
        //  生成随机码
        let randomNum = (Math.random() + '').slice(2,8)
        let time = Date.now()
        let data = {}
        data.email = email
        data.randomNum = randomNum
        data.time = time

        //  设置邮箱配置
        const config = {
            host: 'smtp.qq.com',
            port: 465,
            //vsbptuehdrvhdfij
            //jtrsfsdqdjleeaig
            auth: {
                user: '1695934841@qq.com',
                pass: 'jtrsfsdqdjleeaig'
            }
        }
        const transpoter = nodemailer.createTransport(config)
        const mail = {
            from: '来自一位姓毛的帅哥<1695934841@qq.com>',
            subject: '注册验证码',
            to: email,
            text: "宝贝，验证码为：" + randomNum + "，不要告诉别人哦！"
        }

        //  保存到数据库
        await new Verification(data)
            .save()
            
        //  发送验证码到前端
        await transpoter.sendMail(mail, (err, info) => {
            if(err){
                return console.log(err)
            }
            transpoter.close()
            console.log('mail sent:', info.response)
        }) 
    }else{
        let verifiTime = res[0].time
        let curTime = Date.now()
        if(curTime - verifiTime > 60000) {//    1分钟获取一个
            //  生成随机码
            let randomNum = (Math.random() + '').slice(2,8)
            let time = Date.now()
            // let email = ctx.query.email
            let data = {}
            data.email = email
            data.randomNum = randomNum
            data.time = time

            //  设置邮箱配置
            const config = {
                host: 'smtp.qq.com',
                port: 465,
                //vsbptuehdrvhdfij
                //jtrsfsdqdjleeaig
                auth: {
                    user: '1695934841@qq.com',
                    pass: 'jtrsfsdqdjleeaig'
                }
            }
            const transpoter = nodemailer.createTransport(config)
            const mail = {
                from: '来自一位姓毛的帅哥<1695934841@qq.com>',
                subject: '注册验证码',
                to: email,
                text: "宝贝，验证码为：" + randomNum + "，不要告诉别人哦！"
            }

            //  保存到数据库
            await new Verification(data)
                .save()
                
            //  发送验证码到前端
            await transpoter.sendMail(mail, (err, info) => {
                if(err){
                    return console.log(err)
                }
                transpoter.close()
                console.log('mail sent:', info.response)
            }) 
        }else{
            msg = {
                status: 0,
                msg: '宝贝，获取验证码太频繁'
            }
        } 
    }


    ctx.body = msg
    

    
}
