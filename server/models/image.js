const { db } = require('../Schemas/config')
const imgSchema = require('../Schemas/image')

//  通过db对象创建操作image数据库的模型对象
const Img = db.model('images', imgSchema)

module.exports = Img