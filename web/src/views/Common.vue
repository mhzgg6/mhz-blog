<template>
  <div class="leave_msg">
    <div class="web-main">
      <div class="title">
        <div class="content" v-html="details.content"></div>
      </div>

      <comment :id=id :isArticle="isArticle"></comment>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment'
export default{
  name:"leaveMessage",
  data() {
    return{
      isArticle: true,
      id: '',
      type: '',
      details: []
    }
  },
  components: { Comment },
  methods: {
    //  获取文章详情
    async get_detail() {
      let data = {}
      data._id = this.id
      data.type = this.label
      let res = await this.request.api_get_articleDetail(data)
      this.details = res.data.article
      this.$getTime([this.details])
    },
  },
  created() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.get_detail()
  },
}
</script>

<style>
.web-main .title .content h4,h5{
  height: 32px;
  line-height: 32px;
  color: #06aaff;
  background: #fbfbfb;
  border-left: 4px solid #06aaff;
  box-sizing: border-box;
  text-indent: 1em;
  margin-bottom: 20px;
}
.web-main .title .content p{
  color: #666;
  font-size: 14px;
  line-height: 30px;
  margin: 20px 0;
  vertical-align: middle;
}
.web-main .title .content p img{
  display: block;
  max-width: 100%;
  margin: 0 auto;
}
@media screen and (max-width: 720px){
  img{
    max-width: 100%;
  }
}
</style>

<style lang="scss" scoped>
.leave_msg{
  width: 100%;
  background: #e9eaed;
  padding: 20px;
  .web-main{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    background: #fff;
    border-radius: 5px;
    font-size: 14px;
    .title{
      padding: 20px;
      border-bottom: 1px solid #ddd;
      .content{
        overflow: hidden;
        p{
          line-height: 40px;
          text-indent: 20px;
          img{
            vertical-align: middle;
          }
        }
      }
      
    }
  }
  @media screen and (max-width: 720px){
    box-sizing: border-box;
    .web-main{
      width: 100%;
      font-size: .36rem;
      .title{
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>