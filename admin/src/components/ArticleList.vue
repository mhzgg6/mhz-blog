<template>
  <div class="article_list">
    <el-table
      :data="articleData"
      style="width: 100%">

      <el-table-column
        prop="updatedAt"
        label="日期"
        width="180">
      </el-table-column>

      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>

      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>

      <el-table-column
        prop="label"
        label="标签"
        width="180">
      </el-table-column>

      <el-table-column
        prop="img"
        label="封面图"
        width="180">
      </el-table-column>

      <el-table-column
        prop="likeNum"
        label="赞"
        width="60">
      </el-table-column>

      <el-table-column
        prop="readNum"
        label="阅读"
        width="60">
      </el-table-column>

      <el-table-column
        prop="commentNum"
        label="评论"
        width="60">
      </el-table-column>

      <el-table-column width="200" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <!-- 删除文章 -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="block">
      <span class="demonstration">共{{allCount}}条</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"         
        :current-page.sync="currentPage"
        :page-size="3"
        layout="prev, pager, next, jumper"
        :total="allCount">
      </el-pagination>
    </div>
    <div>dd</div>
  </div>
</template>

<script>
import marked from 'marked'
var rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false
})
export default {
  name: 'article_list',
  data() {
    return{
      articleData: [],
      currentPage: 1,
      allPage: 0,
      allCount: 0
    }
  },
  computed: {
    show_content() {
      return marked(this.articleData[0].content)
    }
  },
  methods: {
    async get_allPage() {
      let res = await this.request.api_get_articleAllPage()
      this.allPage = res.data.allPage
      this.allCount = res.data.allCount
      console.log('allPage',res.data.allPage) 
    },
    //  获取文章列表
    async get_article_list(page, size) {
      let data = {}
      data.page = page
      data.size = size
      let res = await this.request.api_get_article(data)
      this.articleData = res.data
      console.log(this.articleData[0], '数组')
      marked(this.articleData[0].content, { sanitize: true })
      this.get_time(this.articleData)
      console.log(res)
    },
    //  转换时间
    get_time(arr) {
      for(var i = 0; i < arr.length; i ++) {
        var str = arr[i].updatedAt
        var re_str = new Date(str).toLocaleString()
        var year = re_str.split(' ')[0]
        var time = re_str.split(' ')[1].slice(2)
        var year_time = year + " " + time
        arr[i].updatedAt = year_time
      }
    },
    //  删除文章
    handleDelete(index, article) {
      console.log(index, article._id)
      let title = article.title
      let data = {}
      data._id = article._id
      this.$confirm(`此操作将从数据库删除标题为${title}的文章, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await  this.request.api_post_deleteArticle(data)
          if(res.data.status == 1){
            this.$router.go(0)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
      })
    },
    //  分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`,'1');
      this.get_article_list(val, 3)
    }
  },
  created() {
    this.get_article_list(1, 3)
    this.get_allPage()
  },
  // mounted() {
  //   console.log(this.articleData[0], '数组')
  //   console.log(this.show_content, 'jisuan')
  // },
}
</script>

<style lang="less">
.article_list{
  width: 100%;
  height: 100%;
  .block{
    .el-pagination{
      padding: 0;
    }
  }
}
</style>
