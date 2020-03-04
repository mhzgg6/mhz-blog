const Router = require('koa-router')
const upload = require('../controls/upload')
const user = require('../controls/user')
const article = require('../controls/article')
const comment = require('../controls/comment')
const work = require('../controls/work')
const serach = require('../controls/serach')
const verificationCode = require('../unit/verificationCode')
const link = require('../controls/frendLink')
const addTimeMachine = require('../controls/timeMachine')

const router = new Router

//  访问主页
router.get('/api', async(ctx) => {
    ctx.body = 'index'
})
//  用户注册
router.post('/api/reg', user.reg)
//  获取验证码
router.get('/api/verificationCode', verificationCode.getCode)
//  用户登陆
router.post('/api/login', user.login)
//  获取用户信息
router.get('/api/userinfo', user.userinfo)
//  修改头像
router.post('/api/changeAvater', user.userAvater)
//  添加文章
router.post('/api/addArticle', article.addArticle)
//  获取文章总页数
router.get('/api/allPage', article.allPage)
//  获取文章分页
router.get('/api/article/list', article.articleList)
//  获取不同标签文章
router.get('/api/article/label', article.keyArticle)
//  获取文章详情页面
router.get('/api/article/detail', article.detail)
//  获取文章评论
router.get('/api/comment/detail', comment.commentList)
//  文件上传
router.post('/api/upload', upload.addImg)
//  保存评论
router.post('/api/comment', comment.saveComment)
//  点赞
router.get('/api/giveLike', comment.giveLike)
//  阅读数量
router.get('/api/addReadNum', comment.addReadNum)
//  查找文章所有label
router.get('/api/article/allLabel', article.articleLabel)
//  获取最热文章
router.get('/api/article/hotArticle', article.hotArticle)
//  获取最新文章
router.get('/api/article/newArticle', article.newArticle)

//  上传作品
router.post('/api/addWorks', work.personalWorks)
//  查找作品列表
router.get('/api/worksList', work.worksList)
//  作品详情
router.get('/api/worksDetail', work.worksDetail)
//  保存作品评论
router.post('/api/saveWorksComment', comment.saveWorksComment)
//  查找作品评论
router.get('/api/worksComment/detail', comment.worksCommentList)
//  获取最热作品
router.get('/api/hotWorks', work.hotWork)
//  获取推荐文章
router.get('/api/recommendWorks', work.recommendWork)
//  作品观看
router.get('/api/works/addReadNum', work.addReadNum)
//  作品点赞
router.get('/api/works/giveLike', work.giveLike)
//  全文搜索
router.get('/api/serach', serach.serach)
//  博客统计
router.get('/api/blogTotal', comment.blogTotal)
//  获取友链
router.get('/api/friendLink', link.friendLink)
//  获取友链
router.get('/api/gainTime', addTimeMachine.gainTime)
/*
 *      后台接口
 */
//  删除文章
router.post('/api/deleteArticle', article.deleteArticle)
//  添加友链
router.post('/api/addLink', link.addLink)
//  添加网站历程
router.post('/api/addTimeMachines', addTimeMachine.addTimeMachines)
module.exports = router