<template>
  <div class="web">
    <div class="web-main">
      <div class="cur_label">
        <p>
          当前分类：{{type.val}}
        </p>
        <span></span>
      </div>

      <!-- 开始文章列表 -->
      <article-list :type="type"></article-list>
      <!-- 结束文章列表 -->

      <!-- 开始右边部分 -->
      <div class="right">
        <right-main></right-main>
      </div>
      <!-- 结束右边部分 -->
    </div>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'
import RightMain from '../components/RightMain'
export default{
  name:"dd",
  data() {
    return{
      cur: 0,
      type: {
        val: '',
        page: 'web',
        isPaging: true
      },
      currentPage: 1,
      allCount: 4
    }
  },
  components: { ArticleList, RightMain },
  methods: {
  },
  created() {
    this.type.val = this.$route.query.type
  },
  watch: {
    $route(val) {
      this.type.val = val.query.type
    },
  },
}
</script>

<style lang="scss" scoped>
.web{
  width: 100%;
  background: #e9eaed;
  padding: 20px;
  .web-main{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .cur_label{
      width: 840px;
      background: #fff;
      padding-top: 10px;
      border-radius: 5px 5px 0 0;
      p{
        width: calc(100% - 40px);
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        margin-left: 20px;
        box-sizing: border-box;
      }
    }
    .right{
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media screen and (max-width: 720px){
    box-sizing: border-box;
    .web-main{
      width: 100%;
      .cur_label{
        width: 100%;
      }
      .right{
        position: static;
      }
    }
  }
}
</style>