const { db } = require('../Schemas/config')
const workSchema = require('../Schemas/works')

//  通过db对象创建操作image数据库的模型对象
const Work = db.model('works', workSchema)

module.exports = Work