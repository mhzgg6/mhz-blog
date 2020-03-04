const Article = require('../models/article')
const Comment = require('../models/comment')
exports.serach = async ctx => {
    const keyText = ctx.query.text
    const type = ctx.query.type || "all"
    let result = await Article
        // .find()
        .find({ 'title': /+ keyText +/ })
        .then(data => {
        })
    ctx.body = {
        status: 1,
        result
    }
}