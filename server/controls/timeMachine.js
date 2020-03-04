const TimeMachine = require('../models/timeMachine')

exports.addTimeMachines = async ctx => {
    const data = ctx.request.body

    await new Promise((resolve, reject) => {
        new TimeMachine(data)
            .save((err, data) => {
                if(err)return reject(err)
                resolve(data)
            })
    })
    .then(data => {
        ctx.body = {
            msg: '添加网站历程成功',
            status: 1
        }
    })
    .catch(err => {
        ctx.body = {
            msg: '添加网站历程失败',
            status: 0
        }
    })
}

exports.gainTime = async ctx => {
    let size = parseInt(ctx.query.size) || 5
    let page = parseInt(ctx.query.page) || 1
    page --

    const links = await TimeMachine
        .find({})
        .sort('-created')       //  排序 以创建时间倒叙
        .skip(size * page)      //  跳过多少条
        .limit(size)  
        .populate({
            path: 'author',
            select: '_id username avater'
        })
    const all = await TimeMachine
        .find()
    let allCount = all.length
    ctx.body = {
            status: 1,
            links,
            allCount
        }
}