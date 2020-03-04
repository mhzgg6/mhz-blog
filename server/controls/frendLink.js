const FrendLink = require('../models/frendLink')

exports.addLink = async ctx => {
    const data = ctx.request.body

    await new Promise((resolve, reject) => {
        new FrendLink(data)
            .save((err, data) => {
                if(err)return reject(err)
                resolve(data)
            })
    })
    .then(data => {
        ctx.body = {
            msg: '添加友链成功',
            status: 1
        }
    })
    .catch(err => {
        ctx.body = {
            msg: '添加友链失败',
            status: 0
        }
    })
}

exports.friendLink = async ctx => {
    const links = await FrendLink
    
    .find()
    ctx.body = {
        status: 1,
        links
    }
}