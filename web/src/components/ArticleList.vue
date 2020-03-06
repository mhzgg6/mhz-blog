<template>
    <div class="list">
        <!-- 没有文章数据 -->
        <div v-if="listData.length == 0" class="list_none">宝贝，当前还没数据哦！！！</div>

        <!-- 文章列表 -->
        <div v-else class="article" v-for="(article, index) in listData" :key="index" @mouseenter="enterList(index)" @mouseleave="leaveList">
            <div class="article_left">
                <img  @click="link(index)" v-lazy=article.img alt="" width="100%">
            </div>

            <div class="article_right">
                <h2 @click="link(index)">{{article.title}}</h2>

                <div class="infor">
                    <ul>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconrili"></use> 
                            </svg>
                            <span>{{article.updatedAt}}</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconzuozhe"></use> 
                            </svg>
                            <span>{{article.author.username}}</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconchakan"></use> 
                            </svg>
                            <span>{{article.readNum}}阅读</span>
                        </li>
                    </ul>
                </div>
                
                <p>{{article.describe}}</p>
                <div class="lable">
                    <span v-for="(lable, num) in article.label" :key="num">
                        {{lable}}
                    </span>
                </div>
                <div class="hand">
                    <ul class="clearfix">
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconpinglun"></use> 
                            </svg>
                            <span @click="link(index)">{{article.commentNum}}条评论</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconxihuan"></use> 
                            </svg>
                            <span>{{article.likeNum}}点赞</span>
                        </li>
                        <li>
                            <!-- <router-link :to="{name:'articleDetail', params: {id: listData[index]._id}}">阅读全文</router-link>  -->
                            <!-- @click="link(index)">阅读全文</router> -->
                            <button @click="link(index)">阅读全文</button>
                        </li>
                    </ul>
                </div>

                <div v-if="!type.val" class="article_sort">
                    0{{index + 1}}
                </div>

            </div>

            <!-- hover 进度条 -->
            <div v-show="index == listIndex" class="load" :class="[isEnter?'enter':'']"></div>
        </div>
        <div v-if="type.isPaging" class="block">
            <!-- <span class="demonstration">共{{allCount}}条</span> -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"         
                :current-page.sync="currentPage"
                :page-size="5"
                layout="prev, pager, next, jumper"
                :total="allCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import getTime from '../../unit/getTime'
export default {
    name: 'list',
    props: ['type'],
    data() {
        return{
            listData: [],
            isEnter: false,
            listIndex: -1,
            cur: 0,
            currentPage: 1,
            allCount: 4
        }
    },
    created() {
    },
    mounted() {
    },
  methods: {
    enterList(index) {
      this.isEnter = true
      this.listIndex = index
    },
    leaveList() {
      this.isEnter = false 
    },
    //  分页
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
        this.get_label_article(this.type.val, val, 5)
    },
    //  不同标签获取文章列表
    async get_label_article(label, page, size) {
      let data = {}
      data.label = label
      data.page = page
      data.size = size
      let res = await this.request.api_get_categoryArticle(data)
      this.listData = res.data.data
      this.allCount = res.data.allCount
      this.$getTime(this.listData)
    },
    //  获取最热/热文章
    async get_hot_article() {
        let res = await this.request.api_get_hotArticle()
        this.listData = res.data.data
        this.$getTime(this.listData)
    },
    //  获取最热/热文章
    async get_new_article() {
        let res = await this.request.api_get_newArticle()
        this.listData = res.data.data
        this.$getTime(this.listData)
    },
    //  获取文章列表
    async get_article_list(page, size) {
      let data = {}
      data.page = page
      data.size = size
      let res = await this.request.api_get_article(data)
      this.listData = res.data
      this.$getTime(this.listData)
    },
    //  阅读量增加
    async add_read_num(id) {
        let data = {}
        data._id = id

        let res = await this.request.api_get_addReadNum(data)
    },
    //  文章详情跳转
    link(index) {
      let id = this.listData[index]._id
      let label = this.listData[index].label[0]

      this.add_read_num(id)
      this.$router.push({
        name: 'articleDetail',
        query: {
          id,
          label
        }
      })
    }
  },
  watch: {
    type: {
        handler(val){
            switch(val.page){
                case "hot": 
                    this.get_hot_article()
                    break;
                case "new":
                    this.get_new_article()
                    break;
                default:
                    this.get_label_article(val.val, 1, 5)
            }
        },
        immediate: true,
        deep: true
    },
    $route(val) {
        this.currentPage = 1        
    }
  }
}
</script>

<style lang="scss">
.block{
    width: 100%;
    height: 60px;
    background: #fff;
    margin-top: 20px;
    .el-pagination{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

<style lang="scss" scoped>
.list{
    width: 840px;
    min-height: 900px;
    .list_none{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        margin-top: 20px;
        border-radius: 5px;
        text-indent: 2em;
    }
    .article{
        width: 100%;
        // height: 278px;
        margin-top: 20px; 
        border-radius: 5px;
        background: #fff;
        position: relative;
        display: flex;
        &:nth-child(1) {
            .article_sort{
                background-color: rgb(113,104,254);
            }
        }
        &:nth-child(2) {
            .article_sort{
                background-color: rgb(255,101,103);
            }
        }&:nth-child(3) {
            .article_sort{
                background-color: rgb(63,184,81)
            }
        }
        &:nth-child(4) {
            .article_sort{
                background-color: rgb(255,182,9);
            }
        }
        &:nth-child(5) {
            .article_sort{
                background-color: rgb(35,188,183);
            }
        }

        .article_left{
            width: 290px;
            min-height: 220px;
            margin: 24px 30px;
            overflow: hidden;
            img{
                height: 100%;
                cursor: pointer;
                &:hover{
                    opacity: 0.9;
                    transform: scale(1.1);
                    -ms-transform: scale(1.1); /* IE 9 */
                    -webkit-transform: scale(1.1); /* Safari and Chrome */
                    transition-duration: .5s;
                    -ms-transition-duration: .5s; 	/* IE 9 */
                    -moz-transition-duration: .5s;; 	/* Firefox */
                    -webkit-transition-duration: .5s; /* Safari 和 Chrome */
                    -o-transition-duration: .5s; 	/* Opera */
                }
            }
        }

        
        .article_right{
            width: 490px;
            color: #2c2d2e;
            position: relative;
            h2{
                font-size: 16px;
                margin-top: 26px;
                cursor: pointer;
            }
            .infor{
                width: 100%;
                height: 16px;
                margin-top: 14px;
                margin-bottom: 22px;
                ul{
                    font-size: 14px;
                    width: 100%;
                    height: 100%; 
                    display: flex;
                    li{
                        span{
                            margin: 0 22px 0 14px;
                        }
                    }
                }
            }
            p{
                width: 100%;
                min-height: 80px;
                font-size: 14px;
                text-indent: 2em;
                padding-right: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                box-sizing: border-box;
            }
            .lable{
                margin: 12px 30px 10px 0;
                color: #6bdedb;
                font-size: 14px;
                span{
                    display: inline-block;
                    height: 24px;
                    background: #ebfbfb;
                    padding: 0 12px 0 12px;
                    margin-right: 10px; 
                    border-radius: 5px;
                    text-align: center;
                    line-height: 24px;
                }
            }
            .hand{
                width: 460px;
                height: 30px;
                line-height: 30px;
                ul{
                    width: 100%;
                    height: 100%;
                    li{
                        float: left;
                        font-size: 14px;
                        margin-right: 20px;
                        &:last-child{
                            float: right;
                            margin-right: 0;
                            button{
                                // width: 80px;
                                height: 28px;
                                padding: 0 10px;
                                color: #fff;
                                background: #06aaff;
                                border: 1px solid #06aaff;
                                border-radius: 5px;
                                outline: none;
                                cursor: pointer; 
                            }
                        }
                        svg{
                            font-size: 14px;
                            margin-right: 12px;
                        }
                    }
                }
            }
            .article_sort{
                position: absolute;
                right: 0px;
                top: 0px;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                color: #fff;
                border-radius: 0 0 0 100%;
                font-size: 14px;
            }
        }

        .load{
            position: absolute;
            bottom: 0px;
            left: 30px;
            /* width: calc(100% - 55px);*/
            width: 0;
            height: 1px;
            background: #3c9eff;
        }
        .load.enter{
            animation: showWidth 1s;
            animation-fill-mode: forwards;
        }
    }
    @media screen and (max-width: 720px) {
        width: 100%;
        min-height: 0;
        .article{
            margin-top: 0;
            display: flex;
            flex-wrap: wrap;
            padding: 20px 20px 0 20px;
            box-sizing: border-box;
            // border-bottom: 1px solid #ddd;
            // margin-bottom: .133333rem;
            border-radius: 0;
            // background: skyblue;
            &:last-child{
                border-radius: 0 0 5px 5px;
                .article_right{
                    border-bottom: none;
                }
            }
            > div{
                box-sizing: border-box;
            }
            .article_left{
                width: 100%;
                margin: 0;
                img{
                    width: 100%;
                    &:hover{
                        transform: none;
                    }
                }
            }
            .article_right{
                width: 100%;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
                h2{//30px
                  margin: 0;  
                  font-size: .4rem;
                  color: #333;
                  font-weight: normal;
                }
                .infor{
                    margin: .186667rem 0 .186667rem 0;
                    // margin: 0;
                    ul{
                        flex-wrap: wrap;
                        li{
                            font-size: .32rem;
                            line-height: 1;
                            span{
                                margin: 0 .293333rem 0 .186667rem;
                            }
                        }
                    }
                }
                p{
                    font-size: .36rem;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    min-height: auto;
                    text-indent: 0;
                    line-height: 1.8;
                    padding-right: 0;
                }
                .lable{
                    font-size: .266667rem;
                    margin: .16rem .4rem .266667rem 0;
                    span{
                        height: .32rem;
                        padding: 0.16rem .16rem 0.16rem .16rem;
                        margin-right: .133333rem;
                        line-height: .32rem;
                        border-radius: .133333rem;
                    }
                }
                .hand{
                    width: 100%;
                    ul{
                        li{
                            line-height: 30px;
                            font-size: .266667rem;
                        }
                    }
                }
                .article_sort{
                    width: .666667rem;
                    height: .666667rem;
                    line-height: .666667rem;
                }
            }
        }
    }
}

@keyframes showWidth {
    from{width: 0;}
    to{width: calc(100% - 55px);}
}
</style>


