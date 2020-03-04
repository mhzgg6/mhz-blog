import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('./views/Reg.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test.vue')
    },
    {
      path: '/test1',
      name: 'test1',
      component: () => import('./views/test1.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      children: [
        {
          path: '/admin/index',
          name: 'admin_index',
          component: () => import('./components/index.vue'),
        },
        {
          path: '/admin/articlList',
          name: 'article_list',
          component: () => import('./components/ArticleList.vue'),
        },
        {
          path: '/admin/editArticle',
          name: 'editArticle',
          component: () => import('./components/editArticle.vue'),
        }
      ],
      redirect: '/admin/index'
    }
  ]
})
