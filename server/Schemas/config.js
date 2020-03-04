const mongoose = require('mongoose')
//  连接mongodb服务器
const db = mongoose.createConnection('mongodb://localhost:27017/pratice', {useNewUrlParser: true, useUnifiedTopology: true })

//  用原生的Promise代替mongoose的Promise
mongoose.Promise = global.Promise

//  导出Schema
const Schema = mongoose.Schema

db.on('error', () => {
    console.log('连接数据库失败')
})
db.on('open', () => {
    console.log('连接数据库成功')
})

module.exports = {
    db,
    Schema
}