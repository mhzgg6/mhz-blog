const { db } = require('../Schemas/config')
const worksCommentSchema = require('../Schemas/worksComment')

//  通过db对象创建操作image数据库的模型对象
const worksComment = db.model('worksComments', worksCommentSchema)

module.exports = worksComment