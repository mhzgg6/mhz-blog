const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const workSchema = new Schema({
    content: String,
    title: String,
    label: Array,
    img: String,
    author: {
        type: ObjectId,
        ref: 'users'
    },      //   关联用户的表
    likeNum: {
        type: Number,
        default: 0
    },
    readNum: {
        type: Number,
        default: 0
    },
    commentNum: {
        type: Number,
        default: 0
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: 'created'
    }
})

module.exports = workSchema