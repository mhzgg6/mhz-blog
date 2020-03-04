<template>
  <div class="works">
    <div class="works_con">
      <!-- 轮播图 开始-->
      <!-- swiper1 -->
      <!-- <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="(item,index) in bannerList" :key="index">
          <img :src="item" alt="" width="100%">
        </swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper> -->
      <!-- swiper2 Thumbs -->
      <!-- <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="(item,index) in bannerList" :key="index">
          <img :src="item" alt="" width="100%">
        </swiper-slide>
      </swiper> -->
      <!-- 开始  作品列表 -->
      <section class="works_container">

        <!-- 开始  右边提示 -->
        <div class="works_tips">
          提示消息
        </div>
        <!-- 结束  右边提示 -->

        <div class="works_type">
          <span @click="toggleLabel(index)" v-for="(label, index) in labelList" :key="index" :class="{active:cur==index}">{{label}}</span>
        </div>

        <div v-if="worksList.length == 0" class="list_none">宝贝，当前还没数据哦！！！</div>
        <!-- 作品列表 -->
        <div v-else class="works_list">
          <ul>
            <li v-for="(item, index) in worksList" :key="index">
              <div class="item_img" @click="link(item._id)">
                <img v-lazy=item.img alt="" width="100%" height="100%">
              </div>
              <div class="item_info">
                <p class="item_info_title">{{item.title}}</p>
                <div class="item_info_label">
                  <span v-for="(label, num) in item.label" :key="num">{{label}}</span>
                </div>
                <div class="item_info_total clearfix">
                  <div class="detail">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconchakan"></use> 
                    </svg>
                    <span>{{item.readNum}}</span>
                  </div>
                  <div class="detail">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconpinglun"></use> 
                    </svg>
                    <span>{{item.commentNum}}</span>
                  </div>
                  <div class="detail">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconxihuan"></use> 
                    </svg>
                    <span>{{item.likeNum}}阅读</span>
                  </div>
                </div>
                <div class="item_info_user">
                  <div class="userInfo">
                    <span>
                      <img :src=item.author.avater alt="">
                      {{item.author.username}}
                    </span>
                    <span>{{item.updatedAt}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="block">
          <!-- <span class="demonstration">共{{allCount}}条</span> -->
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"         
              :current-page.sync="currentPage"
              :page-size="6"
              layout="prev, pager, next, jumper"
              :total="allCount">
          </el-pagination>
        </div>
      </section>
      <!-- 结束  作品列表 -->

      <!--开始 右边排序 -->
      <div class="works_right">
        <div class="works_tab">
          <span>热门作品</span>
        </div>
        <div class="hot_works">
          <ul>
            <li v-for="(hot, num) in hotWorks" :key="num">
              <div class="hot_works_ranking">{{num+1}}</div>
              <div class="hot_works_con clearfix">
                <div class="left_img fl">
                  <img :src=hot.img width="100%" height="100%" alt="">
                </div>
                <div class="rigth_info fl">
                  <p>{{hot.title}}</p>
                  <div class="rigth_info_user">
                    <span>
                      <img :src=hot.author.avater width="100%" height="100%" alt="">
                      {{hot.author.username}}
                    </span>
                    <span>{{hot.updatedAt}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结束  右边排序 -->
    </div>
  </div>
</template>

<script>
export default{
  name:"works",
  data() {
    return{
      allCount: 0,
      currentPage: 1,
      cur: 0,
      labelList: ['绘画', '设计'],
      curLabel: '绘画',
      worksList: [],
      hotWorks: [],
      uiList: [],
      drawList: [],
      bannerList: [
        'https://img.zcool.cn/community/0118b85df2e6d3a801219cce2b2f12.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/01b5d85df2e70ba801219cce07b481.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0118b85df2e6d3a801219cce2b2f12.jpg@1280w_1l_2o_100sh.jpg'
      ],
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 3, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 3,
        touchRatio: 0.2,
        loop: false,
        loopedSlides: 3, //looped slides should be the same
        slideToClickedSlide: true,
      }
    }
  },
  components: {

  },
  methods: {
    //  获取作品列表
    async get_works_list(label, page) {
      let data = {}
      data.label = label
      data.page = page
      let res = await this.request.api_get_worksList(data)
      this.worksList = res.data.data
      this.$getTime(this.worksList)
    },
    //  获取最热作品
    async get_hot_works() {
      let res = await this.request.api_get_hotWorks()
      this.hotWorks = res.data.data
      this.$getTime(this.hotWorks)
    },
    //  分页
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.get_works_list(val)
    },
    //  切换
    toggleLabel(index) {
      if(this.cur == index)return
      this.cur = index
      this.curLabel = index == 0?"绘画":"ui设计"
      this.get_works_list(this.curLabel,1)
    },
    //  跳转
    link(id) {
      this.add_read_num(id)

      this.$router.push({
        name: 'worksDetail',
        params: {
          id
        }
      })
    },
    //  增加阅读数量
    async add_read_num(id) {
      let data = {}
      data.id = id
      let res = await this.request.api_get_addWorksReadNum(data)
    }
  },
  created() {
    this.get_works_list("绘画", 1)
    this.get_hot_works()
  },
  // updated() {
  //   this.$nextTick(() => {
  //     const swiperTop = this.$refs.swiperTop.swiper
  //     const swiperThumbs = this.$refs.swiperThumbs.swiper
  //     swiperTop.controller.control = swiperThumbs
  //     swiperThumbs.controller.control = swiperTop
  //   })
  // },
}
</script>

<style lang="scss">
.block{
  width: 100%;
  height: 60px;
  background: #fff;
  margin-top: 20px;
  border-radius: 5px;
  .el-pagination{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<style lang="scss" scoped>
.works{
  width: 100%;
  padding: 20px;
  // background: #f4f4f4;
  background: #e9eaed;
  .works_con{
    width: 1200px;
    min-height: 800px;
    margin: 0 auto;
    position: relative;
    .works_tips{
      position: absolute;
      top: 0;
      right: 0;
      width: 340px;
      height: 56px;
      background: #fff;
      border-radius: 5px;
      text-indent: 20px;
      line-height: 30px;
    }
    //  开始右边部分
    .works_right{
      position: absolute;
      top: 76px;
      right: 0;
      width: 340px;
      border-radius: 5px;
      background: #fff;
      font-size: 14px;
      .works_tab{
        width: 100%;
        height: 40px;
        line-height: 40px;
        span{
          padding-left: 20px;
        }
      }
      .hot_works{
        width: 100%;
        ul{
          li{
            height: 66px;
            padding: 20px;
            border-top: 1px solid #f4f4f4;
            display: flex;
            justify-content: space-between;
            .hot_works_ranking{
              width: 30px;
              height: 66px;
              line-height: 66px;
              text-align: center;
            }
            .hot_works_con{
              width: 270px;
              .left_img{
                width: 88px;
                height: 100%;
              }
              .rigth_info{
                width: 162px;
                margin-left: 20px;
                p{
                  width: 162px;
                }
                .rigth_info_user{
                  width: 162px;
                  height: 100%;
                  font-size: 12px;
                  margin-top: 21px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  span{
                    display: inline-block;
                    &:nth-child(1){
                      color: #333;
                    }
                    &:nth-child(2){
                      color: #bbb;
                    }
                    img{
                      border-radius: 50%;
                      width: 24px;
                      height: 24px;
                      vertical-align: middle;
                      margin-right: 10px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
      // .gallery-thumbs {
      //   height: 20%!important;
      //   box-sizing: border-box;
      //   padding: 10px 0;
      //   .swiper-slide {
      //     width: 25%;
      //     height: 100%;
      //     opacity: 0.4;
      //     background: red;
      //   }
      //   .swiper-slide-active {
      //     opacity: 1;
      // }
    .works_container{
      width: 840px;
      .works_type{
        width: 100%;
        height: 56px;
        line-height: 56px;
        text-align: center;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 5px;
        span{
          display: inline-block;
          height: 100%;
          box-sizing: border-box;
          margin-right: 20px;
          cursor: pointer;
          font-size: 14px;
        }
        span.active{
          color: #3c9eff;
          border-bottom: 2px solid #3c9eff;
        }
      }
      .list_none{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        margin-top: 20px;
        border-radius: 5px;
        text-indent: 2em;
      }
      //  开始作品列表
      .works_list{
        width: 100%;
        ul{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li{
            width: 260px;
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;
            .item_img{
              width: 100%;
              height: 200px;
              a{
                display: block;
                width: 100%;
                height: 100%;
                img{
                  border-radius: 5px 5px 0 0;
                }
              }
            }
            .item_info{
              width: 100%;
              padding: 10px 20px;
              box-sizing: border-box;
              .item_info_title{
                height: 40px;
                line-height: 40px;
              }
            }
            .item_info_label{
              margin: 12px 30px 20px 0;
              color: #6bdedb;
              font-size: 14px;
              span{
                display: inline-block;
                height: 24px;
                background: #ebfbfb;
                padding: 0 12px 0 12px;
                margin-right: 10px; 
                border-radius: 5px;
                text-align: center;
                line-height: 24px;
              }
            }
            .item_info_total{
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #bbb;
              .detail{
                float: left;
                margin-right: 20px;
                .icon{
                  margin-right: 10px;
                }
              }
            }
            .item_info_user{
              height: 50px;
              .userInfo{
                width: 100%;
                height: 100%;
                line-height: 50px;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                  display: inline-block;
                  &:nth-child(1){
                    color: #333;
                  }
                  &:nth-child(2){
                    color: #bbb;
                  }
                  img{
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    vertical-align: middle;
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  @media screen and (max-width: 720px){
    box-sizing: border-box;
    font-size: .36rem;
    .works_con{
      width: 100%;
      min-height: 0;

      .works_container{
        width: 100%;
        .works_type{
          margin-bottom: 0;
        }
        .works_list{
          ul{
            li{
              width: 100%;
              margin: 0;
              border-radius: 0;
              &:last-child{
                border-radius: 0 0 5px 5px;
              }
              .item_img{
                padding: 0 20px;
                box-sizing: border-box;
              }
              .item_info{
                p{
                  font-size: .4rem;
                }
                div{
                  font-size: .32rem;
                }
                .item_info_user{
                  .userInfo{
                    span{
                      height: 100%;
                      font-size: .4rem;
                      &:nth-child(2){
                        font-size: .32rem;
                      }
                      img{
                        width: 1rem;
                        height: 1rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .works_tips{
        position: static;
        width: 100%;
        margin-bottom: 20px;
        padding: 20px;
        box-sizing: border-box;
      }

      .works_right{
        position: static;
        width: 100%;
        .works_tab{
          margin-top: 20px;
        }
        .hot_works{
          ul{
            li{
              .hot_works_ranking{
                width: 30px;
              }
              .hot_works_con{
                .left_img{
                  width: 88px;
                }
                .rigth_info{
                  width: calc(100% - 118px);
                }
              }
            }
          }
        }
      }

    }
  }
}
</style>