//  读文件模块
const fs = require('fs')
//  七牛云模块
const qiniu = require('qiniu')
var port = process.env.PORT || '3000'
var uploadHost= `http://192.168.1.15:${port}/`
// var uploadHost= `http://mhzgg.com:${port}/`
exports.addImg = async ctx => {
    const file = ctx.request.files.file
    var fname = file.name
    //得到扩展名
    var extArr = fname.split('.');
    var ext = extArr[extArr.length-1];
    if(ext == 'blob') {
        ext = 'jpg'
    }
    ext = "." + ext

    // 七牛云配置
    var accessKey = 'Tto-u1OBBCHanmUwTVXxWCZiuG3-tlBkaHJAWyZn'
    var secretKey = 'oLF_mw0sjSCsBs_v3_scbWTtALK3Ubzw506JoBkJ'
    var options = {
        // 空间名
        scope: 'blog-mhz',
    }
      
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    var putPolicy = new qiniu.rs.PutPolicy(options)
    var uploadToken = putPolicy.uploadToken(mac)

    //上传到七牛后保存的文件名
    let key = 'upload/' + new Date().getTime() + ext
    //要上传文件的本地路径
    let filePath = file.path;     //如果是表单的数据提交会存储在fields中，图片文件提交会存储在files中 files.file中的file指的是前端设定input的name一般设置为file
    
    //构造上传函数
    // 文件上传（以下四行代码都是七牛上传文件的配置设置）
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;  //设置传输机房的位置根据自己的设置选择
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    formUploader.putFile(uploadToken, key, filePath, putExtra, function(respErr,respBody, respInfo) {
        if (respErr) {
            console.log(respErr)
        }
        if (respInfo.statusCode == 200) {//上传成功
            console.log(respBody);
        } else {//上传失败
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    })
    ctx.body = {
        status: 1,
        url: 'http://cdn.mhzgg.com/' + key
    }
}

//上传到服务端
// exports.addImg = async ctx => {

//     var file = ctx.request.files.file;//得道文件对象
//     var path = file.path;
//     var fname = file.name;//原文件名称
//     var nextPath = path + fname;
//     if(file.size>0 && path){
//         //得到扩展名
//         var extArr = fname.split('.');
//         var ext = extArr[extArr.length-1];
//         if(ext == 'blob') {
//             ext = 'jpg'
//         }
//         var nextPath = path+'.'+ext;
//         fs.renameSync(path, nextPath);

//         //  取文件名
//         var index = nextPath.lastIndexOf("\\")
//         nextPath = nextPath.substring(index + 1, nextPath.length)
//     }
//     //以 json 形式输出上传文件地址
//     ctx.body = `{
//         "fileUrl":"${uploadHost}uploads/${nextPath}",
//         "status": 1
//     }`
// }
