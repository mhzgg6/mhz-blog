<template>
  <div class="about">
      <div class="main">

        <div class="total">
          <h1>博客统计</h1>
          <div class="total_con" v-if="totalList">
            <div class="total_con_item" >
              <NumberGrow :value='100'></NumberGrow>
              <h4>文章总数</h4>
              <span></span>
            </div>
            <div class="total_con_item" >
              <NumberGrow :value='200'></NumberGrow>
              <h4>访客总数</h4>
            </div>
            <div class="total_con_item" >
              <NumberGrow :value='100'></NumberGrow>
              <h4>评论总数</h4>
            </div>
            <div class="total_con_item" >
              <NumberGrow :value='1000'></NumberGrow>
              <h4>运行天数</h4>
            </div>
          </div>
        </div>
        
        <div class="timeline">
          <div class="timeline_item" v-for="(item,i) in webCourse" :key="i">
            <div class="timeline_itemLeft">
              <a href="#">
                <img :src=item.author.avater alt="" @mouseenter="enter(i)" @mouseleave="leave(i)" :class="[listIndex == i?'cover':'']">
              </a>
            </div>
            <div class="timeline_itemRight">
              <div @mouseenter="enter(i)" @mouseleave="leave(i)" class="timeline_itemRight_con" :class="[listIndex == i?'enter':'']">
                <p>{{item.updatedAt}}</p>
                <p>{{item.content}}</p>
              </div>
            </div>
          </div>
          
          <div class="block">
            <!-- <span class="demonstration">共{{allCount}}条</span> -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"         
                :current-page.sync="currentPage"
                :page-size="5"
                layout="prev, pager, next, jumper"
                :total="allCount">
            </el-pagination>
          </div>
        </div>


      </div>
  </div>
</template>

<script>
  import NumberGrow from '../components/NumberGrow'
  export default {
    name: 'about',
    data() {
      return {
        totalList: [],
        webCourse: [],
        total: 0,
        isEnter: false,
        listIndex: -1,
        currentPage: 1,
        allCount: 4
      }
    },
    avater() {
      return this.$store.state.user.avater
    },
    components: {
      NumberGrow
    },
    methods: {
      //  分页
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.get_blog_time(val, 5)
      },
      //  博客统计
      async get_blog_total() {
        let res = await this.request.api_get_total()
        this.blogTotal = res.data
        this.$getTime(this.blogTotal.newArticleTime)
      },
      //  博客统计
      async get_blog_time(page, size) {
        let data = {}
        data.page = page
        data.size = size
        let res = await this.request.api_get_time(data)
        this.webCourse = res.data.links
        this.allCount = res.data.allCount
        this.$getTime(this.webCourse)
      },
      enter(i) {
        this.listIndex = i
      },
      leave() {
        this.listIndex = -1
      }
    },
    created() {
      this.get_blog_total()
      this.get_blog_time(1,5)
      this.total = this.totalList.commentTotal
    }
  }
</script>
<style lang="scss">
// .block{
//     width: 1030px;
//     height: 60px;
//     background: #fff;
//     margin-top: 20px;
//     margin-left: 170px;
//     .el-pagination{
//         height: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//   @media screen and (max-width: 720px){
//     width: 100%;
//     margin-left: 0;
//   }
// }
</style>
<style lang="scss" scoped>
.main{
  width: 100%;
  background: #e9eaed;
  .total{
    width: 1200px;
    margin: 0 auto;
    h1{
      font-size: 30px;
      font-weight: normal;
      line-height: 160px;
      text-align: center;
    }
    .total_con{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .total_con_item{
        width: 280px;
        height: 200px;
        background: #fff;
        border-radius: 5px;
        position: relative;
        &:nth-child(1) {
          h3{
            color: #56c4c5;
          }
        }
        &:nth-child(2) {
          h3{
            color: #fecd76;
          }
        }
        &:nth-child(3) {
          h3{
            color: #8de0c6;
          }
        }
        &:nth-child(4) {
          h3{
            color: #bb75fd;
          }
        }
        h3{
          line-height: 50px;
          margin-top: 40px;
          text-align: center;
          font-size: 30px;
        }
        h4{
          line-height: 40px;
          text-align: center;
          color: #636565;
        }
        span{
          display: block;
          position: absolute;
          top: 10px;
          left: 10px;
          width: 6px;
          height: 6px;
          border: 4px solid #e2edfe;
          border-radius: 50%;
        }
      }
    }
  }

  /* 开始  时间线 */
  .timeline{
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    &:first-child{
      margin-top: 20px;
    }
    .timeline_item {
      div{
        display: inline-block;
      }
      .timeline_itemLeft{
        position: relative;
        &:before{
          content: "";
          position: absolute;
          top: 24px;
          right: -16px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #9466ff;
          -webkit-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
        }
        &:after{
          content: "";
          position: absolute;
          top: 24px;
          right: -14px;
          width: 8px;
          height: 8px;
          border: 3px solid #f0f2f7;
          border-radius: 50%;
          background: #9466ff;
          -webkit-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
        }
      
        a{
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fff;
          margin: 0 30px 0 20px;
          img{
            width: 50px;
            height: 50px;
            margin: 5px;
            border-radius: 50%;
          }
          img.cover{
            animation: avater .5s;
          }
        }
      } 
      .timeline_itemRight{
        width: 1089px;
        border-left: 1px solid #fff;
        .timeline_itemRight_con{
          width: 1030px;
          margin-left: 60px;
          margin-bottom: 30px;
          background: #fff;
          font-size: 14px;
          font-weight: normal;
          position: relative;
          &:before{
            content: "";
            position: absolute;
            top: 30px;
            left: -20px;
            border: 10px solid transparent;
            border-right-color: #f9f0ea;
          }
          p{
            line-height: 30px;
            background: #f9f0ea;
            border: 2px solid #fff;
            padding: 0 20px;
            border-radius: 5px;
            &:nth-child(2){
              padding: 20px;
            }
          }
        }
        .timeline_itemRight_con.enter{
          animation: snake .5s;
          animation-fill-mode: forwards;
        }
      }
    }
    .block{
      width: 1030px;
      margin-left: 170px;
    }
  }

  @media screen and (max-width: 720px){
    padding: 20px;
    box-sizing: border-box;
    .total{
      width: 100%;
      h1{
        font-size: .4rem;
      }
      .total_con{
        flex-wrap: wrap;
        .total_con_item{
          width: 20%;
        }
      }
    }
    .timeline{
      width: 100%;
      .timeline_item{
        // margin-bottom: 20px;
        .timeline_itemLeft{
          a{
            margin-right: 20px;
          }
        }
        .timeline_itemRight{
          width: calc(100% - 122px);
          .timeline_itemRight_con{
            width: 100%;
            margin-left: 20px;
          }
        }
      }
      .block{
        width: 100%;
        margin-left: 0;
      }
    }
  } 
}
@keyframes snake {
  from{ transform: translateY(0) }
  to{ transform: translateY(-5px) }
}
@keyframes avater {
  from{ transform: rotate(0) }
  to{ transform: rotate(360deg) }
}
</style>
