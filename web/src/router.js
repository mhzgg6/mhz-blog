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
    },
    {
      path: '/blog',
      name: 'public',
      component: () => import('./views/Public.vue'),
      children: [
        {
          path: '/blog/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/blog/web',
          name: 'web',
          component: () => import('./views/Web.vue')
        },
        {
          path: '/blog/moodtown',
          name: 'moodtown',
          component: () => import('./views/Moodtown.vue')
        },
        {
          path: '/blog/article/detail',
          name: 'articleDetail',
          component: () => import('./views/Article.vue')
        },
        {
          path: '/blog/works',
          name: 'works',
          component: () => import('./views/Works.vue')
        },
        {
          path: '/blog/worksDetail/:id',
          name: 'worksDetail',
          component: () => import('./views/WorksDetail.vue')
        },
        {
          path: '/blog/about',
          name: 'about',
          component: () => import('./views/AboutBlog.vue')
        },
        {
          path: '/blog/comment/detail',
          name: 'leaveMessage',
          component: () => import('./views/Common.vue')
        },
        {
          path: '/blog/user/setting',
          name: 'personal_setting',
          component: () => import('./views/Setting.vue')
        },
      ]
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/Privacy.vue')
    }
  ]
})
