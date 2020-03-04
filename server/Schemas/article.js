const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const Articlechema = new Schema({
    title: String,
    content: String,
    describe: String,
    label: Array,
    author: {
        type: ObjectId,
        ref: 'users'
    },      //   关联用户的表
    img: {
        type: String,
        default: 'http://localhost:3000/uploads/upload_ff2c1657c55dd38de90bfcf77e0cff97.jpg'
    },
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
    },
    // articleCategory: {//    关联文章分类
    //     type: ObjectId,
    //     ref: 'aticleCategories'
    // }
},{
    versionKey: false,
    timestamps: {
        createdAt: 'created'
    }
})

module.exports = Articlechema