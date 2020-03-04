const { db } = require('../Schemas/config')
const CommentSchema = require('../Schemas/comment')

//  通过db对象创建操作image数据库的模型对象
const Comment = db.model('comments', CommentSchema)

module.exports = Comment