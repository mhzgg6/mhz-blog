const { Schema } = require('./config')

const FrendLinkSchema = new Schema({
    name: String,
    icon: String,
    link: String
})

module.exports = FrendLinkSchema