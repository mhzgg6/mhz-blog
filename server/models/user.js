const { db } = require('../Schemas/config')
const UserSchema = require('../Schemas/user')

//  通过db对象创建操作image数据库的模型对象
const User = db.model('users', UserSchema)

module.exports = User