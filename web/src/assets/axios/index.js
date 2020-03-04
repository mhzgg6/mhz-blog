import axios from 'axios'
import store from '../../store'
import router from '../../router'

import { Loading } from 'element-ui'
let options = {
    body: true,
    fullscreen: true,
    lock: true,
    text: '宝贝，在拼命加载中哦！！！',
    backgroud: 'rgba(0, 0, 0, .6)'
}
let loading
//  调出loading
function startLoading() {
    loading = Loading.service(options)
}
//  关闭loading
function endLoading() {
    loading.close()
}
//  正式地址
// const baseURL = 'http://localhost:3000'
const baseURL = 'http://www.mhzgg.com:3000'

//  全局设置
axios.defaults.timeout = 10000  //  时间超时设置10s
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//  创建一个axios实例
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

//  request拦截器，每次发送请求的时候拦截下来
instance.interceptors.request.use(
    config => {
        startLoading()
        //  每次请求时，检查 vuex 中是否有token，如果有放在headers
        if(store.state.user.token){
            config.headers.Authorization = store.state.user.token
        }
        return config
    },
    err => {
        endLoading()
        return Promise.reject(err)
    }
)

//  response拦截器
instance.interceptors.response.use(
    response => {
        endLoading()
        return response
    },
    err => {
        endLoading()
        let { response } = err
        if( response != null ){
            if(response.status == 401) {
                let msg = response.data || '请重新登陆'
                alert(msg)
                //  清除token
                store.commit('remove')
                //  跳转到登陆页面
                router.replace({
                    path: '/',
                    //  添加一个重定向后缀
                    query: { redirect: router.currentRoute.fullPath }
                })
                return Promise.reject(err.response)
            }
        }else{
            console.log(err)
        }
    }
)

//  添加api请求
const request =  {
    //  用户注册
    api_post_reg(data) {
        return instance.post(`${baseURL}/api/reg`, data)
    },
    //  获取验证码
    api_get_verification(data) {
        return instance.get(`${baseURL}/api/verificationCode?email=${data.email}`)
    },
    //  用户登陆
    api_post_login(data) {
        return instance.post(`${baseURL}/api/login`, data)
    },
    //  获取用户信息
    api_get_userinfo(data) {
        return instance.get(`${baseURL}/api/userinfo?id=${data.id}`)
    },
    //  修改用户头像
    api_post_avater(data) {
        return instance.post(`${baseURL}/api/changeAvater`, data)
    },
    //  添加文章
    api_post_addArticle(data) {
        return instance.post(`${baseURL}/api/addArticle`, data)
    },
    //  获取文章列表
    api_get_article(data) {
        let {page = 1, size = 2} = data
        return instance.get(`${baseURL}/api/article/list?page=${page}&size=${size}`)
    },
    //  获取最热文章
    api_get_hotArticle() {
        return instance.get(`${baseURL}/api/article/hotArticle`)
    },
    //  获取最热文章
    api_get_newArticle() {
        return instance.get(`${baseURL}/api/article/newArticle`)
    },
    //  获取文章详情
    api_get_articleDetail(data) {
        return instance.get(`${baseURL}/api/article/detail?id=${data._id}&type=${data.type}`)
    },
    //  获取文章的所有标签
    api_get_articleLabel() {
        return instance.get(`${baseURL}/api/article/allLabel`)
    },
    //  获取评论
    api_get_commentList(data) {
        return instance.get(`${baseURL}/api/comment/detail?id=${data._id}&page=${data.page}&size=${data.size}`)
    },
    //  获取不同标签文章
    api_get_categoryArticle(data) {
        return instance.get(`${baseURL}/api/article/label?type=${data.label}&page=${data.page}&size=${data.size}`)
    },
    //  提交评论
    api_post_comment(data) {
        return instance.post(`${baseURL}/api/comment`, data)
    },
    //  点赞
    api_get_giveLike(data) {
        return instance.get(`${baseURL}/api/giveLike?id=${data._id}`)
    },
    //  增加文章阅读量
    api_get_addReadNum(data) {
        return instance.get(`${baseURL}/api/addReadNum?id=${data._id}`)
    },
    //  获取不同标签作品
    api_get_worksList(data) {
        return instance.get(`${baseURL}/api/worksList?type=${data.label}&page=${data.page}`)
    },
    //  获取作品详情
    api_get_worksDetail(data) {
        return instance.get(`${baseURL}/api/worksDetail?id=${data.id}`)
    },
    //  添加作品评论
    api_post_addWorksComment(data) {
        return instance.post(`${baseURL}/api/saveWorksComment`, data)
    },
    //  获取作品评论
    api_get_worksCommentList(data) {
        return instance.get(`${baseURL}/api/worksComment/detail?id=${data.id}`)
    },
    //  获取最热作品
    api_get_hotWorks() {
        return instance.get(`${baseURL}/api/hotWorks`)
    },
    //  获取推荐作品
    api_get_recommendWorks() {
        return instance.get(`${baseURL}/api/recommendWorks`)
    },
    //  作品阅读数量增加
    api_get_addWorksReadNum(data) {
        return instance.get(`${baseURL}/api/works/addReadNum?id=${data.id}`)
    },
    //  作品点赞
    api_get_giveWorksLike(data) {
        return instance.get(`${baseURL}/api/works/giveLike?id=${data.id}`)
    },
    //  全文搜索
    api_get_serach(data) {
        return instance.get(`${baseURL}/api/serach?text=${data.text}&type=${data.type}`)
    },
    //  上传图片
    api_post_img(data) {
        return instance.post(`${baseURL}/api/upload`, data)
    },
    //  博客统计
    api_get_total() {
        return instance.get(`${baseURL}/api/blogTotal`)
    },
    //  获取友链
    api_get_friendLink() {
        return instance.get(`${baseURL}/api/friendLink`)
    },
    //  获取网站时间历程
    api_get_time(data) {
        let {page = 1, size = 5} = data
        return instance.get(`${baseURL}/api/gainTime?page=${page}&size=${size}`)
    },
    //  请求主页
    api_get_index() {
        return instance.get(`${baseURL}/api`)
    },
    //  测试路由拦截
    api_post_upload(data) {
        return instance.post(`${baseURL}/api/upload`, data)
    }
}

export default {
    install (Vue, options) {
      Vue.prototype.request = request
    }
}

export {
    request
}