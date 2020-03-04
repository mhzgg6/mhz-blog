const { db }= require('../Schemas/config')
const TimeMachineSchema = require('../Schemas/timeMachine')

//  通过 db 对象创建操作TimeMachine数据库的模型对象
const TimeMachine = db.model('timeMachines', TimeMachineSchema)

module.exports = TimeMachine