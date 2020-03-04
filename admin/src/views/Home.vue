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
    <button @click="add_comment">提交评论</button>
    <button @click="get_detail">文章详情</button>
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
      data.title = '毛啊毛真的很棒棒呀哎呀呀呀呀呀呀呀'
      data.content = `call：改变当前函数调用对象的this指向 有名函数执行时使用了call。第一个参数需要把此函数this指向给的对象，第二个为实参开始 document.getElementById('box').onclick = function() { fn.call(this, 10); //call改变当前对象的thsdjkkkkkkkkkkkkkkkkkkk`
      data.label = ['vue','午后杂谈','mvvm' ]
      data.author = this.$store.state.user._id
      let res = await this.request.api_post_addArticle(data)
      console.log(res, resute)
    },
    //  添加评论
    async add_comment() {
      let data = {}
      data.content = '哈哈哈哈 我是第一个评论的哦'
      data.id = this.$store.state.user._id
      data.article = "5dde239503df02e0dca81e03"
      let res = await this.request.api_post_comment(data)
      console.log(res,'评论')
    },
    //  获取文章详情
    async get_detail() {
      let data = {}
      data._id = "5ddbcb37b32ab47e184790b5"
      let res = await this.request.api_get_articleDetail(data)
      console.log(res,'文章详情')
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

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  .user{
    width: 100%;
    height: 40px;
  }
}
</style>