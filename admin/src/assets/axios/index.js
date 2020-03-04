import axios from 'axios'
import store from '../../store'
import router from '../../router'

//  测试地址
// const baseURL = 'http://localhost:3000'
//  正式地址
const baseURL = 'http://mhzgg.com:3000'

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
        //  每次请求时，检查 vuex 中是否有token，如果有放在headers
        if(store.state.user.token){
            config.headers.Authorization = store.state.user.token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//  response拦截器
instance.interceptors.response.use(
    response => {
        return response
    },
    err => {
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
    //  用户登陆
    api_post_login(data) {
        return instance.post(`${baseURL}/api/login`, data)
    },
    //  添加文章
    api_post_addArticle(data) {
        return instance.post(`${baseURL}/api/addArticle`, data)
    },
    //  添加文章分类
    api_article_category(data) {
        return instance.post(`${baseURL}/api/articleCategory`, data)
    },
    //  获取文章总页数
    api_get_articleAllPage(){
        return instance.get(`${baseURL}/api/allPage`)
    },
    //  获取文章列表
    api_get_article(data) {
        let {page = 1, size = 2} = data
        return instance.get(`${baseURL}/api/article/list?page=${page}&size=${size}`)
    },
    //  获取文章详情
    api_get_articleDetail(data) {
        return instance.get(`${baseURL}/api/article/detail?id=${data._id}`)
    },
    //  删除文章
    api_post_deleteArticle(data) {
        return instance.post(`${baseURL}/api/deleteArticle`, data)
    },
    //  上传图片
    api_post_img(data) {
        return instance.post(`${baseURL}/api/upload`, data)
    },
    //  提交评论
    api_post_comment(data) {
        return instance.post(`${baseURL}/api/comment`, data)
    },
    //  上传作品
    api_post_works(data) {
        return instance.post(`${baseURL}/api/addWorks`, data)
    },
    //  请求主页
    api_get_index() {
        return instance.get(`${baseURL}/api`)
    },
    //  测试路由拦截
    api_post_upload(data) {
        return instance.post(`${baseURL}/api/upload`, data)
    },
    //  添加友情链接
    api_post_link(data) {
        return instance.post(`${baseURL}/api/addLink`, data)
    },
    //  添加网站历程
    api_post_time(data) {
        return instance.post(`${baseURL}/api/addTimeMachines`, data)
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