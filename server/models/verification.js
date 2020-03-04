const { db }= require('../Schemas/config')
const verificationSchema = require('../Schemas/verification')

//  通过 db 对象创建操作Article数据库的模型对象
const Verification = db.model('verifications', verificationSchema)

module.exports = Verification