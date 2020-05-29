<template>
  <div class="article_list">
    <!-- <el-table
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
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table> -->
    <div class="table-warp">
      <a-table
        class="data-table"
        :columns="columns"
        :dataSource="datalist"
        rowKey="id"
        :loading="loading"
        :pagination="false"
        >
        <span slot="tags" slot-scope="data">
          <a-tag
            v-for="tag in data.label"
            :key="tag"
          >
            <!-- :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'" -->
            {{ tag }}
          </a-tag>
        </span>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="datalist && datalist.length"
        showSizeChanger
        @showSizeChange="onShowSizeChange"
        :showTotal="total => `总共：${total}条`"
        :total="pagination.total"
        :pageSize="pagination.size"
        v-model="pagination.num"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { Table, Tag, Pagination } from 'ant-design-vue';
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
      allCount: 0,
      pagination: {
        total: 0,
        size: 3,
        num: 1
      },
      columns: [
        {
          title: '序号',
          customRender: (text, row, index) => index + 1,
        },
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '内容',
          dataIndex: 'content',
        },
        {
          title: '封面图',
          dataIndex: 'img',
        },
        {
          title: '日期',
          dataIndex: 'updatedAt',
        },
        {
          title: '标签',
          // dataIndex: 'tags',
          class: 'tag-list',
          scopedSlots: { customRender: 'tags' },
        },
        {
          title: '分类',
          dataIndex: 'label[0]',
        },
        {
          title: '赞',
          dataIndex: 'praiseNum',
        },
        {
          title: '阅读',
          dataIndex: 'readNum',
        },
        {
          title: '评论',
          dataIndex: 'commentNum',
        },
        {
          title: '操作',
          dataIndex: 'do',
        }
      ],
      datalist: [],
      loading: false
    }
  },
  computed: {
    show_content() {
      return marked(this.articleData[0].content)
    }
  },
  components: {
    ATable: Table,
    ATag: Tag,
    APagination: Pagination
  },
  created() {
    this.get_article_list(1, 3)
    this.get_allPage()
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
      // marked(this.articleData[0].content, { sanitize: true })
      this.get_time(this.articleData)
      this.datalist = this.articleData;
      console.log(this.datalist)
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
    },
    onShowSizeChange() {

    },
    onPageChange() {

    }
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
