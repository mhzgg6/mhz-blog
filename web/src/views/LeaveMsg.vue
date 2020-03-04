<template>
  <div class="leave_msg">
    <div class="web-main">
      <div class="title">
        <h4>
          <span>留言板</span>
        </h4>
        <p>欢迎来到我的博客，尽情的留下你的脚印吧
          <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/44.gif" alt="">
        </p>
      </div>

      <comment id="5dfa0c4b8f3e29333c413b1c" :isArticle="isArticle"></comment>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment'
export default{
  name:"leaveMessage",
  data() {
    return{
      isArticle: false
    }
  },
  components: { Comment },
  methods: {
  },
  created() {
  },
}
</script>

<style>
/* .web-main h4,h5{
  height: 32px;
  line-height: 32px;
  color: #06aaff;
  background: #fbfbfb;
  border-left: 4px solid #06aaff;
  box-sizing: border-box;
  text-indent: 1em;
  margin-bottom: 20px;
}
.con_bot .main_conten p{
  color: #666;
  font-size: 14px;
  line-height: 30px;
  margin: 20px 0;
  vertical-align: middle;
}
.con_bot .main_conten p img{
  display: block;
  max-width: 100%;
  margin: 0 auto;
}
@media screen and (max-width: 720px){
  img{
    max-width: 100%;
  }
} */
</style>

<style lang="scss">
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
    .title{
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      h4{
        line-height: 40px;
        text-align: center;
        background: #fff;
        border-radius: 5px 5px 0 0;
        span{
          border-bottom: 2px solid #3c9eff;
        }
      }
      p{
        background: #fff;
        line-height: 40px;
        text-indent: 20px;
        border-radius: 0 0 5px 5px;
        > img{
          vertical-align: middle;
        }
      }
    }
  }
}
</style>