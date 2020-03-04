<template>
  <div class="home">
    <TopNav></TopNav>

    <div class="main">
      <!-- 轮播图 开始-->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in bannerList" :key="index">
          <img :src="item" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <!-- 轮播图 结束 -->
      
      <!-- 切换文章列表 开始 -->
      <div class="toggle">
        <span :class="[isHot?'active':'']" @click="toggleArticle">近期热门</span>
        <span :class="[isNew?'active':'']" @click="toggleArticle">最新文章</span>
      </div>
      <!-- 切换文章列表 结束 -->

      <!-- 文章列表 开始 -->
      <!-- <div :is="currentView"></div> -->
      <article-list :ArticleLists='articleData'></article-list>
      <!-- 文章列表 结束 -->
    </div>

    <h2>这是主页</h2>
    <div class="user">{{username}}</div>
    <div class="avater">{{avater}}</div>
    <button @click="test">测试路由拦截</button>
    <div>
      <span>标题</span>
      <input type="text" v-model="title">
    </div>
    <div>
      <span>内容</span>
      <input type="text" v-model="content">
    </div>
    <div>
      <span>label</span>
      <input type="text" v-model="label">
    </div>
    <button @click="add_article">发表文章</button>
    <button @click="get_article_list">获取文章列表</button>
  </div>
</template>

<script>
import TopNav from '../components/TopNav'
import ArticleList from '../components/ArticleList'
export default{
  data() {
    return{
      title: '',
      content: '',
      label: '',
      bannerList: [
        'https://s2.ax1x.com/2019/11/21/M5MCut.jpg',
        'https://s2.ax1x.com/2019/11/21/M5MPDP.jpg',
        'https://s2.ax1x.com/2019/11/21/M5MiHf.jpg'
      ],
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      isHot: true,
      isNew: false,
      child1: 'ArticleList',
      child2: 'ArticleList',
      currentView: 'ArticleList',
      articleData: [],
      hotArticle: []
    }
  },
  components: {
    TopNav,
    ArticleList
  },
  computed: {
    avater() {
      return this.$store.state.user.avater
    },
    username() {
      return this.$store.state.user.username 
    }
  },
  methods: {
    toggleArticle(tabItem) {
      if(this.isHot) {
        this.isNew = true
        this.isHot = false
      }else{
        this.isNew = false
        this.isHot = true
      }
      this.currentView = tabItem
    },  
    //  获取文章列表
    async get_article_list() {
      let data = {}
      data.page = 1
      data.size = 5
      let res = await this.request.api_get_article(data)
      console.log(res)
      this.hotArticle = res.data
    },
    async test() {
      let data = {}
      let res = await this.request.api_post_upload(data)
      console.log(res)
    },
    //  添加文章
    async add_article() {
      let data = {}
      data.title = 'js'
      data.content = '阿阿阿阿阿'
      data.label = 'js'
      data.author = this.$store.state.user._id
      let res = await this.request.api_post_addArticle(data)
      console.log(res)
    },
    async get_article_list() {
      let data = {}
      data.page = 1
      data.size = 5
      let res = await this.request.api_get_article(data)
      console.log(res)
    }
  },
  created() {
    this.get_article_list()
    this.hotArticle = this.articleData
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  .main{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .toggle{
      width: 100%;
      height: 40px;
      line-height: 40px;
      span{
        display: inline-block;
        width: 64px;
        height: 40px;
        margin-right: 20px;
        cursor: pointer;
      }
      span.active{
        color: #3c9eff;
        border-bottom: 2px solid #3c9eff;
      }
    }
  }
  .user{
    width: 100%;
    height: 40px;
  }
}
</style>