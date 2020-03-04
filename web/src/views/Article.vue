<template>
  <div class="articleDetail">
    <div class="homeCon">
      <div class="main" v-if="detail">

        <div class="main_nav">
          前端开发&nbsp;&nbsp;>&nbsp;&nbsp;{{detail.data.article.label[0]}}&nbsp;&nbsp;>&nbsp;&nbsp;{{detail.data.article.title}}
        </div>

        <div class="con">

          <div class="con_top">
            <h4>{{detail.data.article.title}}</h4>
          </div>

          <div class="con_info">
            <ul>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconrili"></use> 
                    </svg>
                    <span>{{detail.data.article.updatedAt}}</span>
                </li>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconzuozhe"></use> 
                    </svg>
                    <span>{{detail.data.article.author.username}}</span>
                </li>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconchakan"></use> 
                    </svg>
                    <span>{{detail.data.article.readNum}}阅读</span>
                </li>
            </ul>
          </div>

          <div class="con_bot">
            <!-- {{detail.data.article.content}} -->
            <div class="main_conten" v-html="detail.data.article.content"></div>
            <div class="con_bot_use">
              如果觉得我的文章对您有用，请帮助本站成长
            </div>

            <div class="con_bot_like">
              <ul>
                <li 
                  @click="give_like" 
                  style="background: #1890ff;">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconxihuan"></use> 
                  </svg>
                  赞{{likeNum}}
                </li>
                <li style="background: #f7b10d;">打赏</li>
              </ul>
            </div>

            <div class="con_bot_label">
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconlabel"></use> 
                </svg>
                标签：
              </span>
              <router-link :to="{ name: 'web', query: { type: detail.data.article.label[num] } }" v-for="(label,num) in detail.data.article.label" :key="num">{{label}}</router-link>
            </div>

            <div class="con_bot_link">
              <span>上一篇：</span>
              <a @click="detail.data.prev.title !== prevTitle && prevArticle()">{{detail.data.prev.title}}</a>
            </div>
            <div class="con_bot_link">
              <span>下一篇：</span>
              <a @click="detail.data.next.title !== nextTitle && nextArticle()">{{detail.data.next.title}}</a>
            </div>

          </div>
          
          <comment :id="_id" :isArticle="isArticle"></comment>

        </div>

        <!-- 开始  右边部分 -->
        <div class="right">
          <right-main :ArticleLists='articleData'></right-main>
        </div>
        <!-- 结束  右边部分 -->

      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment'
import RightMain from '../components/RightMain'
export default{
  name: 'articleDetail',
  components:{ Comment, RightMain },
  data() {
    return{
      _id: '',
      label: '',
      prevTitle: '已经是第一篇文章了！！！',
      nextTitle: '已经是最后一篇文章了！！！',
      isArticle: true,
      detail: null,
      contain: '',
      loading: false,
      likeNum: 0,
      articleData: [],
      pos: 0
    }
  },
  methods:{
    //  获取文章详情
    async get_detail(id) {
      let data = {}
      data._id = id
      data.type = this.label
      let res = await this.request.api_get_articleDetail(data)
      this.detail = res
      this.likeNum = this.detail.data.article.likeNum
      this.$getTime([this.detail.data.article])
    },
    //  获取文章列表
    async get_article_list(page, size) {
      let data = {}
      data.page = page
      data.size = size
      let res = await this.request.api_get_article(data)
      this.articleData = res.data
    },
    //  点赞
    async give_like() {
      let data = {}
      data._id = this._id
      let res = await this.request.api_get_giveLike(data)
      if(res.data.status == 1) {
        this.likeNum ++
      }
    },
    //  阅读量增加
    async add_read_num(id) {
        let data = {}
        data._id = id

        let res = await this.request.api_get_addReadNum(data)
    },
    //  上一篇文章
    prevArticle() {
      let id = this.detail.data.prev.id
      let label = this.detail.data.prev.label

      this.link(id, label)
    },
    //  下一篇文章
    nextArticle() {
      let id = this.detail.data.next.id
      let label = this.detail.data.next.label

      this.link(id, label)
    },
    //  文章详情跳转
    link(id, label) {
      this.add_read_num(id)
      this.$router.push({
        name: 'articleDetail',
        query: {
          id,
          label
        }
      })
    },
    // 获取滚动条与顶端距离
    scroll(event) {
      this.pos = event.target.scrollTop
    }
  },
  created() {
    this._id = this.$route.query.id
    this.label = this.$route.query.label
    this.get_detail(this._id)
    this.get_article_list(1,5)
  }
}
</script>
  
<style lang="scss">
.con_bot{
  .main_conten{
    h4,h5{
      height: 32px;
      line-height: 32px;
      color: #06aaff;
      background: #fbfbfb;
      border-left: 4px solid #06aaff;
      box-sizing: border-box;
      text-indent: 1em;
      margin-bottom: 20px;
    }
    p{
      color: #666;
      font-size: 14px;
      line-height: 30px;
      margin: 20px 0;
      vertical-align: middle;
      img{
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }
    }
  } 
  @media screen and (max-width: 720px){
    .main_conten{
      h4,h5{
        font-size: .36rem;
      }
      p{
        font-size: .36rem;
      }
    }
  }
} 
</style>
<style lang="scss" scoped>
.articleDetail{
  width: 100%;
  /* height: 100%; */
  .homeCon{
    width: 100%;
    background: #f6f6f6;
    padding: 20px 0;
    .main{
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .right{
        position: absolute;
        top: 0;
        right: 0;
        width: 340px;
      }

      .main_nav{
        width: 840px;
        height: 40px;
        line-height: 40px;
        text-indent: 2em;
        margin: 10px 0;
        background: #fdfdfe;
      }

      /* 开始 展示设计 */
      .con{
        width: 840px;
        /* border: 1px solid #e6e6e6; */
        background: #fff;
        border-radius: 5px;
        .con_top{
          width: 800px;
          padding: 20px 20px 0 20px;
          color: #666;
          h4{
            text-align: center;
            line-height: 40px;
          }
        }

        .con_info{
          width: 100%;
          height: 16px;
          margin-bottom: 22px;
          ul{
            font-size: 12px;
            width: 100%;
            height: 100%; 
            display: flex;
            justify-content: center;
            li{
              span{
                margin: 0 22px 0 14px;
              }
            }
          }
        }
        .con_bot{
          width: 800px;
          padding: 0 20px;
          h5{
            line-height: 30px;
            border-left: 4px solid #b9d329;
            border-bottom: 1px solid #b9d329;
            background: #fbfbfb;
            font-weight: normal;
            margin: 10px 0;
          }  
          p{
            color: #666;
            font-size: 14px;
            line-height: 30px;
          }        
          .con_bot_use{
            font-size: 14px;
            color: #666;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #e6e6e6;
            border-radius: 2px;
          }
          .con_bot_like{
            width: 100%;
            margin: 25px 0;
            padding: 15px 0;
            ul{
              width: 210px;
              height: 40px;
              line-height: 40px;
              margin: 0 auto;
              li{
                width: 60px;
                height: 100%;
                float: left;
                color: #fff;
                text-align: center;
                cursor: pointer;
                &:nth-child(1) {
                  width: 120px;
                }
                &:nth-child(2) {
                  margin-left: 30px;
                }
              }
            }
          }
          .con_bot_label{
            width: 100%;
            height: 40px;
            margin: 20px 0;
            a{
              padding: 5px 5px;
              color: #6bdedb;
              margin-left: 20px;
              background: #ebfbfb;
            }
          }
          .con_bot_link{
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #666;
            a{
              margin-left: 10px;
              color: #666;
              &:hover{
                color: #06aaff;
                border-bottom: 1px solid #666;
                cursor: pointer;
              }
            }
          }
        }
      }
      /* 开始  右边 */
      .rightBar{
        position: absolute;
        top: 42px;
        right: 0;
        width: 340px;
        /* border: 1px solid black; */
      }
    }
  }
  @media screen and (max-width: 720px){
    .homeCon{
      padding: 10px 20px;
      box-sizing: border-box;
      .main{
        width: 100%;
        font-size: .36rem;
        .main_nav{
          width: 100%;
          text-indent: .5rem;
        }
        .con{
          width: 100%;
          .con_top{
            width: 100%;
            padding: 0;
            h4{
              font-size: .4rem;
            }
          }
          .con_info{
            ul{
              display: flex;
              li{
                font-size: .32rem;
              }
            }
          }
          .con_bot{
            width: 100%;
            box-sizing: border-box;
          }
        }
        .right{
          display: none;
        }
      }
    }
  }
}

</style>