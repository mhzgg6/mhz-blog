const path = require('path');
const theme = require('./src/assets/theme/theme');
module.exports = {
    devServer: {
                open: true, //浏览器自动打开页面
        //         host: "mhzgg.com", //如果是真机测试，就使用这个IP
        //         port: 8080,
        //         https: false,
        //         hotOnly: false, //热更新（webpack已实现了，这里false即可）
        //         proxy: {
        //             //配置跨域
        //             '/api': {
        //                 target: "http://mhzgg.com:3000/",
        //                 ws:true,
        //                 changOrigin:true,
        //                 pathRewrite:{
        //                     '^/api':'/'
        //                 }
        //             }
        //         }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: theme.blue,
                    javascriptEnabled: true,
                },
            },
        },
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/theme/index.less')]
        }
    }
}