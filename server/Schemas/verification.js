const { Schema } = require('./config')

const verificationSchema = new Schema({
    randomNum: String,
    email: String,
    time: Number
},{
    versionKey: false,
    timestamps: {
        createdAt: 'created'
    }
})

module.exports = verificationSchema