const User = require('../models/user')
const Article = require('../models/article')
const Comment = require('../models/comment')
const Work = require('../models/work') 
const worksComment = require('../models/worksComment')

//  保存文章评论
exports.saveComment = async ctx => {
    //  拿到评论
    const con = ctx.request.body
    con.from = con.id

    const _comment = new Comment(con) 

    await _comment
        .save()
        .then(data => {
            //  更新当前文章的评论计数器
            Article
                .updateOne({_id: con.article},{$inc: {commentNum: 1}}, err => {
                    if(err)return console.log(err)
                    console.log('评论计数器更新成功',con.article)
                })
            //  更新用户的评论计数器
            User
                .updateOne({_id: con.id},{$inc: {commentNum: 1}}, err => {
                    if(err)return console.log(err)
                    console.log('用户计数器更新成功',con.article)
                })
            ctx.body = {
                msg: '评论成功',
                status: 1
            }
        })
        .catch(err => {
            ctx.body = {
                msg: '评论失败',
                status: 0
            }
        })
}

//  查找文章评论
exports.commentList = async ctx => {
    //  取到文章id
    const _id = ctx.query.id
    let size = parseInt(ctx.query.size) || 5
    let page = parseInt(ctx.query.page) || 1
    page --
    //  获取评论总条数
    const allPage = await Comment
        .find({article: _id})
    let len = allPage.length
    // 查找跟当前文章关联的所有评论
    const comment = await Comment
        .find({article: _id})
        .sort("-created")
        .skip(size * page)      //  跳过多少条
        .limit(size)            //  需要多少条数据
        .populate("from", "username avater isAdmin level")
        .then(data => data)
        .catch(err => {
            console.log(err)
        })
    ctx.body = {
        status: 0,
        comment,
        allPage: len
    }
}

//  保存作品评论
exports.saveWorksComment = async ctx => {
    //  拿到评论
    const con = ctx.request.body
    con.from = con.id
    const _comment = new worksComment(con) 

    await _comment
        .save()
        .then(data => {
            //  更新当前文章的评论计数器
            Work
                .updateOne({_id: con.works},{$inc: {commentNum: 1}}, err => {
                    if(err)return console.log(err)
                    console.log('作品评论计数器更新成功')
                })
            //  更新用户的评论计数器
            User
                .updateOne({_id: con.id},{$inc: {commentNum: 1}}, err => {
                    if(err)return console.log(err)
                    console.log('用户计数器更新成功')
                })
            ctx.body = {
                msg: '评论成功',
                status: 1
            }
        })
        .catch(err => {
            ctx.body = {
                msg: '评论失败',
                status: 0
            }
        })
}

//  查找文章评论
exports.worksCommentList = async ctx => {
    //  取到文章id
    const _id = ctx.query.id
    // 查找跟当前文章关联的所有评论
    const comment = await worksComment
        .find({works: _id})
        .sort("-created")
        .populate("from", "username avater isAdmin level")
        .then(data => data)
        .catch(err => {
            console.log(err)
        })
    ctx.body = {
        status: 0,
        comment
    }
}

//  文章点赞
exports.giveLike = async ctx => {
    const _id = ctx.query.id
    let res = {
        status: 1,
        msg: '点赞成功'
    }
    //  更新当前文章的 likeNum
    await Article
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
//  文章阅读数量
exports.addReadNum = async ctx => {
    const _id = ctx.query.id
    let res = {
        status: 1,
        msg: '阅读数量增加成功'
    }
    //  更新当前文章的 likeNum
    await Article
        .updateOne({_id},{$inc: {readNum: 0.5}}, err => {
            if(err)return console.log(err)
            console.log('阅读数器更新成功')
        })
        .then(data => {
            console.log(data)
            
        })
        .catch(err => {
            res = {
                status: 0,
                msg: '阅读失败'
            }
        })
    ctx.body = res
}

//  博客统计
exports.blogTotal = async ctx => {
    let allLabel = await Article
        .find({}, {"label": 1})
    let labelList = []
    let commentTotal = await Comment
        .find({},{"os": 1})
    let worksCommentTotal = await worksComment
        .find({},{"os": 1})
    let allComment = commentTotal.length + worksCommentTotal.length
    let newArticleTime = await Article
        .find({}, {'updatedAt': 1})
        .sort('-created')
        .limit(1)

    //  获取分类
    for(let i = 0; i < allLabel.length; i ++) {
        // 获取第一个标签
        labelList.push(allLabel[i].label[0]) 
    }
    let label = [...new Set(labelList)]

    ctx.body = {
        status: 1,
        articleTotal: allLabel.length,
        allLabel: label,
        commentTotal: allComment,
        newArticleTime
    }
}