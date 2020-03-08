import Vue from 'vue'
import Router from 'vue-router'
// import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {//  解决滚动条置顶问题
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue'),
      meta: {
        title: "欢迎来到老毛~博客"
      }
    },
    {
      path: '/blog',
      name: 'public',
      component: () => import('./views/Public.vue'),
      children: [
        {
          path: '/blog/home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            title: "首页"
          }
        },
        {
          path: '/blog/web',
          name: 'web',
          component: () => import('./views/Web.vue'),
          meta: {
            title: "前端开发"
          }
        },
        {
          path: '/blog/moodtown',
          name: 'moodtown',
          component: () => import('./views/Moodtown.vue'),
          meta: {
            title: "心情小镇"
          }
        },
        {
          path: '/blog/article/detail',
          name: 'articleDetail',
          component: () => import('./views/Article.vue'),
          meta: {
            title: "文章详情"
          }
        },
        {
          path: '/blog/works',
          name: 'works',
          component: () => import('./views/Works.vue'),
          meta: {
            title: "设计和绘画"
          }
        },
        {
          path: '/blog/worksDetail/:id',
          name: 'worksDetail',
          component: () => import('./views/WorksDetail.vue'),
          meta: {
            title: "作品详情"
          }
        },
        {
          path: '/blog/about',
          name: 'about',
          component: () => import('./views/AboutBlog.vue'),
          meta: {
            title: "关于博客"
          }
        },
        {
          path: '/blog/comment/detail',
          name: 'leaveMessage',
          component: () => import('./views/Common.vue'),
          meta: {
            title: "详情"
          }
        },
        {
          path: '/blog/user/setting',
          name: 'personal_setting',
          component: () => import('./views/Setting.vue'),
          meta: {
            title: "个人设置"
          }
        },
      ]
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/Privacy.vue'),
      meta: {
        title: "用户协议"
      }
    }
  ]
})
