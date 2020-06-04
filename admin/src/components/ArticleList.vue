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
        :loading="pagination.loading"
        >
        <!-- :scroll="{ y: 700 }" -->
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
        <template slot="do" slot-scope="data">
          <a>编辑</a>
          <a-popconfirm
            :title="`确定删除${data.title}这篇文章吗?`"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirm(data._id)"
            @cancel="cancel"
          >
            <!-- @visibleChange="handleVisibleChange" -->
            <a href="#">删除</a>
          </a-popconfirm>
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
import { Table, Tag, Pagination, Button, Input, Popconfirm } from 'ant-design-vue';
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
        page: 1,
        loading: false
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
          class: 'do-list',
          scopedSlots: { customRender: 'do' },
        }
      ],
      deleteVisible: false
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
    AInput: Input,
    APopconfirm: Popconfirm
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
      this.pagination.loading = true
      const data = { ...page }
      await this.request.api_get_article(data)
      .then(res => {
        this.pagination.loading = false
        this.pagination.rows = res.data
      }) 
      
    },
    onShowSizeChange(page, size) {
      this.pagination.size = size
      this.get_article_list({page, size})
    },
    onPageChange(curent, size) {
      this.get_article_list({page: curent, size})
    },
    async confirm(_id) {
      let data = {}
      data._id = _id
      // await this.request.api_post_deleteArticle(data)
      // .then(res => {
      //   if(res.data.status == 1){
      //     this.$message.success('删除成功')
      //     this.get_article_list({page: this.pagination.page, size: this.pagination.size})
      //   }
      // })
      // .catch(err => {
      //   this.$message.error('删除失败');
      // })
    },
    cancel() {
    },
    handleVisibleChange() {
      this.deleteVisible = this.deleteVisible?false:true;
    }
  },
}
</script>

<style lang="less">
.article_list{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
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
  .table-warp{
      flex-shrink: 1;
      padding: 0 @content-padding-h;
      overflow-y: auto;
    .per-table {
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
          td.do-list{
            a{
              color: @primary-color;
              margin-right: 4px;
              cursor: pointer;
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
