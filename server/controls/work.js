const Work = require('../models/work')

//  上传个人作品
exports.personalWorks = async ctx => {
    const data = ctx.request.body

    await new Promise((resolve, reject) => {
        new Work(data)
            .save((err, data) => {
                if(err)return reject(err)
                resolve(data)
            })
    })
    .then(data => {
        ctx.body = {
            msg: '上传作品成功',
            status: 1
        }
    })
    .catch(err => {
        ctx.body = {
            msg: '上传作品失败',
            status: 0
        }
    })
}

exports.worksList = async ctx => {
    //  通过不同标签获取文章
    const type = ctx.query.type
    let size = parseInt(ctx.query.size) || 6
    let page = parseInt(ctx.query.page) || 1
    page --
    const data = await Work
        .find({"label":{$in:[type]}},{"content": 0})                 //  查找所有
        .sort('created')       //  排序 以创建时间倒叙
        .skip(size * page)      //  跳过多少条
        .limit(size)            //  需要多少条数据
        .populate({
            path: 'author',
            select: '_id username avater'
        })
    const allCount = await Work
        .find({"label":{$in:[type]}})                 //  查找所有
        .countDocuments()
    ctx.body = {
        data,
        allCount
    }

}

//  获取作品详情
exports.worksDetail = async ctx => {
    const id = ctx.query.id

    const works = await Work
        .findById(id)
        .populate({
            path: 'author',
            select: '_id username avater'
        })
        .then(data => data) 

    ctx.body = {
        status: 1,
        works
    }
}

//  获取最热作品
exports.hotWork = async ctx => {

    const data = await Work
        .find({},{"img": 1,"title": 1,_id: 1,"updatedAt": 1})
        .sort({"readNum": -1})
        .limit(5) 
        .populate({
            path: 'author',
            select: '_id username avater'
        })
    ctx.body = {
        status: 1,
        data
    }
}

//  获取推荐作品
exports.recommendWork = async ctx => {
    const data = await Work
        .find({},{"img": 1,_id: 1})     //..返回指定字段
        .sort({"likeNum": -1})
        .limit(4) 
    ctx.body = {
        status: 1,
        data
    }
}

//  点赞
exports.giveLike = async ctx => {
    const _id = ctx.query.id
    let res = {
        status: 1,
        msg: '点赞成功'
    }
    //  更新当前文章的 likeNum
    await Work
        .updateOne({_id},{$inc: {likeNum: 0.5}}, err => {
            if(err)return console.log(err)
            console.log('评论计数器更新成功')
        })
        .then(data => {
        })
        .catch(err => {
            res = {
                status: 0,
                msg: '点赞失败'
            }
        })
    ctx.body = res
}
//  阅读数量
exports.addReadNum = async ctx => {
    const _id = ctx.query.id
    let res = {
        status: 1,
        msg: '阅读数量增加成功'
    }
    //  更新当前文章的 likeNum
    await Work
        .updateOne({_id},{$inc: {readNum: 0.5}}, err => {
            if(err)return console.log(err)
            console.log('阅读数器更新成功')
        })
        .then(data => {
            
        })
        .catch(err => {
            res = {
                status: 0,
                msg: '阅读失败'
            }
        })
    ctx.body = res
}