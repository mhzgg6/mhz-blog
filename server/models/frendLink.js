const { db }= require('../Schemas/config')
const FrendLinkSchema = require('../Schemas/frendLink')

//  通过 db 对象创建操作Article数据库的模型对象
const FrendLink = db.model('links', FrendLinkSchema)

module.exports = FrendLink