const Article = require('../models/article')
const Comment = require('../models/comment')

//  添加文章
exports.addArticle = async ctx => {
    //  拿到数据
    const data = ctx.request.body  

    await new Promise((resolve, reject) => {
        new Article(data)
            .save((err, data) => {
                if(err)return reject(err)
                resolve(data)
            })
    })
    .then(data => {
        ctx.body = {
            msg: '添加文章成功',
            status: 1
        }
    })
    .catch(err => {
        ctx.body = {
            msg: '添加文章失败',
            status: 0
        }
    })
}

//  获取文章总页数
exports.allPage = async ctx => {
    const allPage = await Article
        .find()
        .countDocuments()
        .then(data => {
            //  后期可以改 前端传值
            page = Math.ceil(data/3)
            ctx.body = {
                allPage: page,
                allCount: data,
                status: 1
            }
        })
        .catch(err => {
            ctx.body = {
                status: 0,
                msg: '获取总页数失败'
            }
        })
}

//  获取文章列表
exports.articleList = async ctx => {
    
    let size = parseInt(ctx.query.size) || 5
    let page = parseInt(ctx.query.page) || 1
    page --

    const data = await Article
        .find({},{"title": 1,"img": 1,"updatedAt": 1,"label":1})                 //  查找所有
        .sort('-created')       //  排序 以创建时间倒叙
        .skip(size * page)      //  跳过多少条
        .limit(size)            //  需要多少条数据
        .populate({
            path: 'author',
            select: '_id username avater'
        })
        .then(data => {
            data._id = data[0]._id
            ctx.body = data
        })
        .catch(err => {
            ctx.body = {
                msg: '获取文章列表失败'
            }
        })
}

//  通过不同标签获取文章
exports.keyArticle = async ctx => {

    const type = ctx.query.type
    let size = parseInt(ctx.query.size) || 5
    let page = parseInt(ctx.query.page) || 1
    page --
    const data = await Article
        .find({"label":{$in:[type]}},{"content": 0})                 //  查找所有
        .sort('created')       //  排序 以创建时间倒叙
        .skip(size * page)      //  跳过多少条
        .limit(size)            //  需要多少条数据
        .populate({
            path: 'author',
            select: '_id username avater'
        })
    const allCount = await Article
        .find({"label":{$in:[type]}})                 //  查找所有
        .countDocuments()
    ctx.body = {
        data,
        allCount
    }
}

// 获取文章详情页面
exports.detail = async ctx => {

    //  取到文章id
    const _id = ctx.query.id
    const type = ctx.query.type

    //  查找文章本身数据
    const article = await Article
        .findById(_id)
        .populate('author', 'username')
        .then(data => data) 
    const nextArticle = await Article
        .find({"label":{$in:[type]}})                 //..类型
        .find({ '_id': { '$gt': _id } })        //..id
        .sort({_id: 1})                            //..顺序 
        .limit(1)
    const prevArticle = await Article
        .find({"label":{$in:[type]}})           //..类型
        .find({ '_id': { '$lt': _id } })        //..id
        .sort({_id: -1})                            //..顺序 
        .limit(1)
    let next = {}
    let prev = {}
    if(!prevArticle[0]) {
        prev = {
            title: '已经是第一篇文章了！！！',  
            id: '',
            label: ''
        }
    }else{
        prev = {
            title: prevArticle[0].title,
            id: prevArticle[0]._id,
            label: prevArticle[0].label[0] 
        }
    }
    if(!nextArticle[0]) {
        next = {
            title: '已经是最后一篇文章了！！！',
            id: '',
            label: ''
        }
    }else{
        next = {
            title: nextArticle[0].title,
            id: nextArticle[0]._id,
            label: nextArticle[0].label[0]
        }
    }
    ctx.body = {
        status: 1,
        article,
        next,
        prev
    }
}   

//  获取文章标签集合
exports.articleLabel = async ctx => {
    const label = await Article
        .find({label: 1})
        .limit(5)  
        .populate({
            path: 'author',
            select: '_id username avater'
        })
    ctx.body = {
        status: 1,
        label
    }
}

//  获取最热文章
exports.hotArticle = async ctx => {

    const data = await Article
        .find({},{"content": 0})
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

//  获取最新文章
exports.newArticle = async ctx => {

    const data = await Article
        .find({},{"content": 0})
        .sort({"created": -1})
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

//  后台: 删除文章
exports.deleteArticle = async ctx => {
    const data = ctx.request.body

    let res = {
        status: 1,
        msg: '删除文章成功'
    }
    await Article
        .findById(data._id)
        .then(data => data.remove())
        .catch(err => {
            res = {
                status: 0,
                msg: '删除文章失败'
            }
        })
    ctx.body = res
}