const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const TimeMachineSchema = new Schema({
    content: String,
    author: {
        type: ObjectId,
        ref: 'users'
    }      //   关联用户的表
},{
    versionKey: false,
    timestamps: {
        createdAt: 'created'
    }
})

module.exports = TimeMachineSchema