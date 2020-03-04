const { Schema } = require('./config')

const UserSchema = new Schema({
    username: String,
    password: String,
    eamil: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    level: {
        type: String,
        default: 'Lv1'
    },
    avater: {
        type: String,
        default: 'http://localhost:3000/uploads/upload_1387c32544cff81a36dc2c7b271ddde8.jpeg'
    },
    commentNum: {
        type: Number,
        default: 0
    }
})

module.exports = UserSchema