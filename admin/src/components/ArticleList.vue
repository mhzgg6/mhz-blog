<template>
  <div class="article_list">
    <div class="top">
      <div class="left">
      </div>
      <div class="right">
        <a-input
          class="inputBox"
          placeholder="身份证、姓名或手机查询"
          style="width: 200px"
          allowClear
        />
          <!-- v-model="keyWord" -->
        <a-button class="searchBt" type="primary">搜索</a-button>
      </div>
    </div>
    <div class="table-warp">
      <a-table
        class="per-table"
        :columns="columns"
        :dataSource="pagination.rows"
        rowKey="id"
        :pagination="false"
        :scroll="{ y: 700 }"
        >
        <template slot="img" slot-scope="data">
          <img :src="data.img" alt="" width="100%">
        </template>
        <template slot="tags" slot-scope="data">
          <a-tag
            v-for="tag in data.label"
            :key="tag"
          >
            <!-- :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'" -->
            {{ tag }}
          </a-tag>
        </template>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="pagination.rows && pagination.rows.length"
        showSizeChanger
        @showSizeChange="onShowSizeChange"
        :showTotal="total => `总共：${total}条`"
        :total="pagination.total"
        :pageSize="pagination.size"
        v-model="pagination.page"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { Table, Tag, Pagination, Button, Input } from 'ant-design-vue';
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
      pagination: {
        rows: null,
        total: 0,
        size: 10,
        page: 1
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
          scopedSlots: { customRender: 'img' },
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
    APagination: Pagination,
    AButton: Button,
    AInput: Input
  },
  created() {
    this.get_article_list({page: this.pagination.page, size: this.pagination.size})
    this.get_allPage()
  },
  methods: {
    async get_allPage() {
      let res = await this.request.api_get_articleAllPage()
      this.pagination.total = res.data.allCount
    },
    async get_article_list(page) {
      const data = { ...page }
      let res = await this.request.api_get_article(data)
      this.pagination.rows = res.data;
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
    onShowSizeChange(page, size) {
      this.pagination.size = size
      this.get_article_list({page, size})
    },
    onPageChange(curent, size) {
      this.get_article_list({page: curent, size})
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
  display: flex;
  flex-direction: column;
  .top {
    padding: @content-padding-v @content-padding-h;
    .left {
      float: left;
      .ant-btn {
        margin-right: 10px;
        color: @primary-color;
        border-color: @primary-color;
      }
    }
    .right {
      float: right;
      .ant-select {
        margin-left: 5px;
      }
      .search-item {
        width: 180px;
        margin: 0 5px 0 0;
        &.scope {
          width: 100px;
        }
      }
      .searchBt {
        background-color: @primary-color;
        border: 0;
        color: @white;
        margin-left: 5px;
      }
    }
  }
  .per-table {
    flex-shrink: 1;
    min-height: 0;
    padding: 0 @content-padding-h;
    overflow-y: auto;
    /deep/table {
      table-layout: fixed;
      tr{
        // height: 100px;
        td,th {
          // white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        td{
            padding: 2px 2px;
        }
        td.tag-list{
          span{
            margin-bottom: @content-padding-v;
          }
        }
      }
      tr.selected{
        background: @primary-2;
      }
    } 
    .table-tr {
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .worstatus {
        width: 16px;
        height: 16px;
        display: inline-block;
      }
    }
  }
  .footer {
    padding: @content-padding-v @content-padding-h;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
}
</style>
