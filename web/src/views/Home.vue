<template>
  <div class="home" ref="home">      
    <div class="box"></div>

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
      
      <!-- 展示最新ui -->
      <div class="show_works">
        <swiper :options="swiperOptionUi">
          <swiper-slide v-for="(item,index) in workList" :key="index">
            <img :src="item" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 展示最新ui -->

       <!-- 开始  个人装逼 -->
      <div class="personal">
        <div class="lable_title">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icongonggao"></use> 
            </svg>
            标签集合
          </span>
        </div>
        <p>欢迎各位朋友来到博客!</p>
        <p>博客使用vue+koa+mongodb搭建,图片存放在七牛云，部署在阿里云上面.源码存放在<a target="_blank" href="https://github.com/mhzgg6/mhz-blog/tree/dev">Github</a>，欢迎Star。博客主要用来记录自己的学习、生活的点点滴滴，以及作品。</p>
        <p>欢迎大家一起交流前端、谈谈人生和理想，记得留言哦。</p>
      </div>
      <!-- 个人信息 结束 -->

      <!-- 切换文章列表 开始 -->
      <div class="toggle">
        <span v-for="(title,num) in toggleTitle" :key="num" @click="toggleLabel(num)" :class="{active:cur==num}">{{title}}</span>
      </div>
      <!-- 切换文章列表 结束 -->

      <!-- 文章列表 开始 -->
      <!-- <div :is="currentView"></div> -->
      <article-list :type=type></article-list>
      <!-- 文章列表 结束 -->

      <!-- 右侧部分 开始 -->
      <div class="right">
        <right-main></right-main>
      </div>
      <!-- 右侧部分 开始 -->
    </div>

  </div>
</template>

<script>
import TopNav from '../components/TopNav'
import ArticleList from '../components/ArticleList'
import RightMain from '../components/RightMain'
import Bottom from '../components/Bottom'
export default{
  name: 'home',
  data() {
    return{
      title: '',
      content: '',
      label: '',
      offsetTop: 0,
      bannerList: [
        'http://cdn.mhzgg.com/M5MCut.jpg',
        'http://cdn.mhzgg.com/M5MPDP.jpg',
        'http://cdn.mhzgg.com/M5MiHf.jpg'
      ],
      workList: [
        'http://cdn.mhzgg.com/images_in_ui_illustration_tubik_2x.png',
        'http://cdn.mhzgg.com/information_architecture_illustration_tubik_2x.png',
        'http://cdn.mhzgg.com/research_in_design_illustration_tubik_2x.png',
        'http://cdn.mhzgg.com/tubik_mobile_ecommerce_illustration_2x.png',
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
      swiperOptionUi: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      child1: 'ArticleList',
      child2: 'ArticleList',
      currentView: 'ArticleList',
      articleData: [],
      hotArticle: [],
      toggleTitle: ['近期热门', '最新文章'],
      cur: 0,             //  切换文章列表  默认最热文章
      type: {
        val: '',        //  文章列表请求文章类型
        page: 'hot',     //   是否为首页
        isPaging: false    //  文章列表是否显示分页
      },        
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: false
        },
        scrollPanel: {
          initialScrollY: 10,
          scrollingX: false,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right'
        },
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        bar: {}
      }
    }
  },
  components: {
    TopNav,
    ArticleList,
    RightMain,
    Bottom
  },
  computed: {
    avater() {
      return this.$store.state.user.avater
    },
    username() {
      return this.$store.state.user.username 
    },
    isMoble() {
      return this.$store.state.isMoble
    }
  }, 
  methods: {
    //  获取所有标签
    async get_article_label() {
      let res = await this.request.api_get_articleLabel()
    },
    //  切换标签
    toggleLabel(index) {
      this.cur = index
      this.type.page = index == 0?'hot':'new'
    },
    async test() {
      let data = {}
      let res = await this.request.api_post_upload(data)
    },
    //  添加文章
    async add_article() {
      let data = {}
      data.title = 'js'
      data.content = '阿阿阿阿阿'
      data.label = 'js'
      data.author = this.$store.state.user._id
      let res = await this.request.api_post_addArticle(data)
    },
  },
  created() {
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  background: #e9eaed;
  padding-bottom: 20px;
  .main{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .show_works{
      width: 840px;
      // height: 260px;
      background: #fff;
      margin-bottom: 20px;
      box-sizing: border-box;
      img{
        width: 100%;
      }
    }
    .personal{
      position: absolute;
      top: 304px;
      right: 0;
      width: 340px;
      font-size: 14px;
      margin-bottom: 20px;
      padding: 0 20px;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      padding-bottom: 20px;
      min-height: 260px;
      .lable_title{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        span{
          display: inline-block;
          border-bottom: 2px solid #1890ff;
          box-sizing: border-box;
          svg{
            margin-right: 5px;
          }
        }
      }
      > p{
        line-height: 30px;
        a{
          color: #1890ff;
        }
      }
    }
    .toggle{
      width: 840px;
      height: 40px;
      line-height: 40px;
      background: #fff;
      border-radius: 5px;
      span{
        display: inline-block;
        width: 64px;
        height: 40px;
        font-size: 14px;
        margin-right: 20px;
        box-sizing: border-box;
        cursor: pointer;
        &:nth-child(1) {
          margin-left: 2em;
        }
      }
      span.active{
        color: #3c9eff;
        border-bottom: 2px solid #3c9eff;
      }
    }
    .blog_intro{
      display: none;
    }
    .right{
      position: absolute;
      right: 0;
      top: 620px;
      width: 340px;
    }
    @media screen and (max-width: 720px){
      width: 100%;
      margin: 0;
      box-sizing: border-box;
      padding: 20px;
      font-size: .36rem;
      .swiper-wrapper{
        img{
          width: 100%;
          height: 5rem;
        }
      }
      .show_works{
        display: none;
        width: 100%;
        img{
          width: 100%;
        }
      }
      .personal{
        position: static;
        width: 100%;
      }
      .toggle{
        width: 100%;
        border-radius: 5px 5px 0 0;
      }

      .right{
        position: static;
        width: 100%;
        margin-top: 20px;
        .right_con{
          .item{
            width: 100%;
            padding: 0;
          }
        }
      }
    }
  }
  .user{
    width: 100%;
    height: 40px;
    img{
      width: 100%;
    }
  }
}
</style>