<template>
  <div class="worksDetail">      
    <div class="detail_con">
      <div class="user clearfix">
        <!-- 开始  作者信息 -->
        <div class="fl userinfo" v-if="worksList">
          <div class="userinfo_avater">
            <img :src=worksList.author.avater width="100%" height="100%" alt="">
          </div>
          <div class="userinfo_detail">
            <p>{{worksList.title}}</p>
            <div class="userinfo_detail_name">by {{worksList.author.username}}</div>
          </div>
        </div>
        <div class="fl give_like" @click="give_like(id)">
          <button>点赞</button>
        </div>
        <!-- 结束  作者信息 -->
      </div>

      <!-- 开始  展示ui -->
      <div v-if='worksList'>
        <div class="show_img" v-html="worksList.content">
          <!-- <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in bannerList" :key="index">
              <img :src=item alt="" width="100%" height="100%">
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper> -->
        </div>
      </div>
      
      <!-- 结束  展示ui -->


    </div>

    <!-- 开始  评论部分 -->
    <div class="comment">
      <!-- 左边评论部分 -->
      <div class="con_comment">

        <!-- 右边作品信息部分 -->
        <div class="works_info" v-if="worksList">
          <div class="works_info_share">
            <button>分享</button>
          </div>
          <div class="works_info_label">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconzuozhe"></use> 
              </svg>
            </span>
            <span v-for="(label, index) in worksList.label" :key="index">{{label}}</span>
          </div>
          <div class="works_info_color">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconxihuan"></use> 
              </svg>
            </span>
            <span></span>
          </div>
          <div class="works_info_look">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconchakan"></use> 
              </svg>
            </span>
            <span>{{worksList.readNum}} views</span>
          </div>
          <div class="works_info_like">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconxihuan"></use> 
              </svg>
            </span>
            <span>{{likeNum}} likes</span>
          </div>
          <div class="works_info_date">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconrili"></use> 
              </svg>
            </span>
            <span>{{worksList.updatedAt}}</span>
          </div>
          <p>推荐</p>
          <ul class="works_recommend">
            <li v-for="(recommend, index) in recommendList" :key="index">
              <router-link :to="{ name: 'worksDetail', params: { id: recommend._id } }">
                <img :src=recommend.img width="100%" height="100%" alt="">
              </router-link>
            </li>
          </ul>
        </div>

        <p class="hope_like">Hope you like~</p>
        
        <comment :id="id" :isArticle="isArticle"></comment>

      </div>
    </div>
    <!-- 结束  评论部分 -->
  </div>
</template>

<script>
import Comment from '../components/Comment'
export default{
  name: 'worksDetail',
  components: { Comment },
  data() {
    return{
      contain: '',
      id: '',
      isArticle: false,
      likeNum: 0,
      worksList: null,
      recommendList: [],
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      bannerList: [
        'https://img.zcool.cn/community/0118b85df2e6d3a801219cce2b2f12.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/01b5d85df2e70ba801219cce07b481.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0118b85df2e6d3a801219cce2b2f12.jpg@1280w_1l_2o_100sh.jpg'
      ],
    }
  },
  computed: {
    avater() {
      return this.$store.state.user.avater
    },
  },
  methods: {
    //  请求作品
    async get_works_detail(id) {
      let data = {}
      data.id = id
      let res = await this.request.api_get_worksDetail(data)
      this.worksList = res.data.works
      this.likeNum = this.worksList.likeNum
      this.$getTime([this.worksList])
    },
    //  获取推荐作品
    async get_recommend_works() {
      let res = await this.request.api_get_recommendWorks()
      this.recommendList = res.data.data
    },
    //  点赞
    async give_like(id) {
      let data = {}
      data.id = id
      let res = await this.request.api_get_giveWorksLike(data)
      if(res.data.status == 1) {
        this.likeNum ++
      }
    },
  },
  created() {
    this.id = this.$route.params.id
    this.get_works_detail(this.id)
    this.get_recommend_works()
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.show_img{
  width: 100%;
  text-align: center;
  img{
    max-width: 100%;
    vertical-align: middle;
    margin: 20px 0;
  }
}
</style>

<style lang="scss" scoped>
.worksDetail{
  width: 100%;
  background: #e9eaed;
  padding: 20px 0;
  .detail_con{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    .user{
      width: 100%;
      height: 60px;
      padding: 20px 0;
      .userinfo{
        width: 840px;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        .userinfo_avater{
          width: 60px;
          height: 60px;
          margin-left: 20px;
          img{
            border-radius: 50%;
          }
        }
        .userinfo_detail{
          padding: 0 20px;
          p{
            line-height: 30px;
          }
        }
      }
      .give_like{
        width: 360px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button{
          display: block;
          width: 100px;
          height: 40px;
          background: #06aaff;
          color: #fff;
          outline: none;
          border: 0;
          border-radius: 5px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
   
  }
  /* 开始评论部分 */
  .comment{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .con_comment{
      width: 800px;
      background: #fff;
      margin-top: 20px;
      border-radius: 5px;
      p{
        height: 40px;
        line-height: 40px;
        text-indent: 20px;
        font-size: 14px;
        &:nth-child(1){
          width: 760px;
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #ddd;
          margin-left: 20px;
        }
      }
      .comment_con_text{
        margin-top: 20px;
        margin-bottom: 20px;
        input{
          width: 100%;
          min-height: 100px;
          background: #fff;
          outline: none;
          border: 0;
          border-radius: 5px;
          text-indent: 1em;
        }
      }
      
      .comment_submit{
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        button{
          float: right;
          display: inline-block;
          width: 100px;
          height: 40px;
          background: #06aaff;
          color: #fff; 
          outline: none;
          border: 0;
          border-radius: 5px;
        }
      }
      .commnet_list{
        width: 100%;
        background: #fff;
        position: relative;
        .commnet_list_left{
          position: absolute;
          top: 10px;
          left: 10px;
          width: 40px;
          height: 40px;
          img{
            width: 40px;
            height: 40px;
            border-radius: 100%;
          }
        }
      }
      
      .commnet_list_right{
        padding: 10px 0 10px 60px;
        div{
          line-height: 30px;
        }
      }
      .commnet_list_time{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
      }
    }
    // 右边信息部分
    .works_info{
      position: absolute;
      top: 0;
      right: 0;
      width: 340px;
      padding: 10px 10px;
      background: #fff;
      border-radius: 5px;
      div{
        padding-bottom: 15px;
        &:nth-child(6){
          border-bottom: 1px solid #ddd;
        }
        span{
          padding: 10px;
          font-size: 14px;
          color: #999;
          &:nth-child(1){
            padding: 0;
            font-size: 16px;
          }
        }
      }
      .works_info_share{
        width: 100%;
        button{
          display: inline-block;
          height: 24px;
          background: #ebfbfb;
          border: 1px solid #06aaff;
          padding: 0 12px 0 12px;
          margin-right: 10px; 
          border-radius: 5px;
          text-align: center;
          line-height: 24px;
          outline: none;
          cursor: pointer;
        }
      }
      p{
        height: 40px;
        line-height: 40px;
      }
      .works_recommend{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        li{
          width: 160px;
          height: 120px;
          margin-bottom: 20px;
          a{
            display: inline-block;
            width: 100%;
            height: 100%;
            img{
              border-radius: 2px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 720px){
    padding: 20px;
    box-sizing: border-box;

    .detail_con{
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .user{
        .userinfo{
          width: 80%;
        }
        .give_like{
          width: 20%;
        }
      }
    }

    .comment{
      width: 100%;
      .con_comment{
        width: 100%;
        p{
          &:nth-child(1){
            width: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 0 20px;
          }
        }
        .com{
          .commnet{
            min-height: 0;
          }
        }
      }
      .works_info{
        width: 100%;
        position: static;
        padding: 20px;
        box-sizing: border-box;
        .works_recommend{
          li{
            width: 48%;
          }
        }
      }
    }
  }
}
</style>