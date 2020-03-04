const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
    //  头像 用户名
    //  文章
    //  内容
    content: String,
    os: String,
    brower: String,
    from: {
        type: ObjectId,
        ref: 'users'
    },  //  关联用户表
    article: {
        type: ObjectId,
        ref: 'articles'
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: 'created'
    }
})

module.exports = CommentSchema