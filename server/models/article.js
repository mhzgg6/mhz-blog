const { db }= require('../Schemas/config')
const ArticleSchema = require('../Schemas/article')

//  通过 db 对象创建操作Article数据库的模型对象
const Article = db.model('articles', ArticleSchema)

module.exports = Article