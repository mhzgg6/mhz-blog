<template>
  <div class="home">
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
export default{
  data() {
    return{
      title: '',
      content: '',
      label: ''
    }
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
      data.size = 2
      let res = await this.request.api_get_article(data)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  .user{
    width: 100%;
    height: 40px;
  }
}
</style>