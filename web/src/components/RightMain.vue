<template>
  <div class="right_con">
    <!-- 个人信息 开始 -->
   
    <!-- 标签 开始 -->
    <div class="label item">
      <div class="lable_title">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconlabel"></use> 
          </svg>
          公告
        </span>
      </div>
      <div class="lable_list">
        <router-link :to="{ name: 'web', query: { type: labelList[index] } }" v-for="(lable, index) in labelList" :key="index">
          {{lable}}
        </router-link>
      </div>
    </div>
    <!-- 标签 结束 -->
    <!-- 推荐文章 开始 -->
    <div class="article item">
      <div class="lable_title">
          <span>
            <svg class="icon" aria-hidden="true" style="font-size: 20px;">
              <use xlink:href="#icontuijian"></use> 
            </svg>
            推荐文章
          </span>
      </div>
      <div class="article_list clearfix" v-for="(article, num) in ArticleLists" :key="num">
          <div class="articleImg" @click="link(article._id, article.label[0])">
              <img :src=article.img alt="" width="100%" height="100%">
          </div>
          <div class="articleCon">
              <p>{{article.title}}</p>
          </div>
          <div class="articleTime">
              <span>{{article.updatedAt}}</span>
          </div>
      </div>
    </div>
    <!-- 推荐文章 结束 --> 
    <!-- 友情链接 开始 -->
    <div class="web_link item">
      <div class="lable_title">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyoulian"></use> 
          </svg>
          友情链接
        </span>
      </div>
      <div class="all_link">
        <li v-for="(link,index) in allLinks" :key="index">
          <a :href=link.link target="_blank">
            <img :src=link.icon alt="">
            <p>{{link.name}}</p>
          </a>
        </li>
      </div>
    </div>
    <!-- 友情链接 结束 -->
    <!-- 开始  站点统计 -->
    <div class="web_total item">
      <div class="lable_title">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icontongji"></use> 
          </svg>
          站点统计
        </span>
      </div>
      <ul>
        <li>文章:{{blogTotal.articleTotal}}</li>
        <li>分类:{{blogTotal.allLabel.length}}</li>
        <li>评论:{{blogTotal.commentTotal}}</li>
        <li>最新更新:{{time}}</li>
      </ul>
    </div>
    <!-- 站点统计 结束 -->
  </div>
</template>

<script>
export default {
  name: 'right_con',
  data() {
    return{
      labelList: [
        'html',
        'vue',
        'js',
        '学习',
        '心情随笔',
        '午后杂谈',
        '年末总结'
      ],
      ArticleLists: [],
      type: {
        val: '',
        page: '',
        isPaging: true
      },
      blogTotal: {
        articleTotal: 0,
        allLabel: 0,
        commentTotal: 0,
        newArticleTime: []
      },
      time: '',
      allLinks: []
    }
  },
  methods: {
    //  获取文章列表
    async get_article_list(page, size) {
      let data = {}
      data.page = page
      data.size = size
      let res = await this.request.api_get_article(data)
      this.ArticleLists = res.data
      this.$getTime(this.ArticleLists)
    },
    //  跳转到文章详情页
    link(id, label) {
      this.$router.push({
        name: 'articleDetail',
        query: {
          id,
          label
        }
      })
    },
    //  博客统计
    async get_blog_total() {
      let res = await this.request.api_get_total()
      this.blogTotal = res.data
      this.$getTime(this.blogTotal.newArticleTime)
      this.time = this.blogTotal.newArticleTime[0].updatedAt 
    },
    //  获取友情链接
    async get_friend_link() {
      let res = await this.request.api_get_friendLink()
      this.allLinks = res.data.links 
    }
  },
  created() {
    this.get_article_list(1,5)
    this.get_blog_total()
    this.get_friend_link()
  },
}
</script>

<style lang="scss" scoped>
.right_con{
  width: 340px;
  font-size: 14px;
  .item{
    margin-bottom: 20px;
    width: 100%;
    padding: 0 20px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    .lable_title{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      span{
        display: inline-block;
        border-bottom: 2px solid #1890ff;
        box-sizing: border-box;
        svg{
          margin-right: 5px;
        }
      }
    }
  }
  /* 开始  标签 */
  .label{
    .lable_list{
      padding: 10px 0;
      a{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        color: #6bdedb;
        margin: 8px 20px 8px 0; 
        border-radius: 5px;
        font-size: 14px;
        background: #ebfbfb; 
        cursor: pointer;
      }
    }
  }
  /* 开始    推荐文章 */
  .article{
    .article_list{
      height: 76px;
      width: 100%;
      padding: 10px 20px 10px 0;
      div{
        float: left;
      }
      .articleImg{
        width: 100px;
        height: 76px;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .articleCon{
        width: 180px;
        padding-left: 20px;
        font-size: 14px; 
        p{
          min-height: 56px;
        }
      }
      .articleTime{
        width: 180px;
        padding-left: 20px;
        font-size: 12px;
        color: #aaa; 
      }
    }
  }
  .web_link{
    .all_link{
      li{
        padding-top: 10px;
        display: inline-block;
        text-align: center;
        a{
          width: 75px;
          height: 100%;
          display: inline-block;
          // margin-right: 20px;
          img{
            width: 40px;
            height: 40px;
            vertical-align: middle;
            border-radius: 5px;
          }
          p{
            line-height: 30px;
            color: #2c2d2e;
          }
        }
      }
    }
  }
  // 开始  站点统计
  .web_total{
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 40%;
        padding: 10px 0;
        &:last-child{
          width: 60%;
        }
      }
    }
  }
  @media screen and (max-width: 720px){
    width: 100%;
    margin-top: 20px;
    .item{
      &:nth-child(2) {
        margin-top: 20px;
      }
      .lable_title{
        span{
          font-size: .36rem;
        }
      }
    }

    .article{
      .article_list{
        .articleImg{
          width: 35%;
        }
        .articleCon{
          width: 50%;
          font-size: .32rem;
        }
        .articleTime{
          width: 50%;
          font-size: .32rem;
        }
      }
    }

    .web_link{
      .all_link{
        li{
          width: 25%;
        }
      }
    }

    .web_total{
      font-size: .36rem;
    }
  }
}
</style>
