export default {
  data () {
    return {
      articleList: null
    }
  },
  methods: {
    //  获取文章列表
    async get_article_list(page, size) {
      let data = {}
      data.page = page
      data.size = size
      let res = await this.request.api_get_article(data)
      this.articleList = res.data
    },
  },
  mounted () {
    this.get_article_list(1,5)
  }
}