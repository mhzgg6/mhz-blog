<template>
  <!-- 开始  评论部分 -->
  <div class="com">
    <p>共有{{allPage}}条评论</p>
    <div class="comment_con">
      <div class="comment_con_text">
        <textarea maxlength="1000" placeholder="智慧如你，不想发表一点评论咩" v-model="contain"></textarea>
        <span>{{remainNum}}</span>
      </div>

      <!-- 用户未登录 -->
      <div v-if="!isLogin" class="unlogin_text">
        <button @click="show_login">登陆</button>
        后发表评论
      </div>
    </div>

    <div class="comment_submit">
      <span @click="openEmotion">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconbiaoqingyidaosanke"></use> 
        </svg>

        <div v-if="showEmotion" class="emoticon_list">
          <div class="emoticon_list_item" v-for="(item,i) in EmotionList" @click="ClickEmoticon(i)" :key="i">
            <img :src=" 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + i + '.gif'">
          </div>
        </div>
      </span>
      <span>表情</span>
      <button :class="{ send: isSend }" @click="add_comment">发表</button>
    </div>

    <!-- 开始  一级评论 -->
    <section class="commnet">
      <div class="no_comment" v-if="commentList.length == 0">还没有评论哦！！！快来发表评论吧！！！宝贝</div>
      <div v-else class="commnet_list" v-for="(item, index) in commentList" :key="index">
        <div class="commnet_list_left">
          <img :src=item.from.avater alt="" width="100%" height="100%">
        </div>
        <div class="commnet_list_right">
          <div class="comment_info">
            <a>
              {{item.from.username}}
            </a>
            <span class="info_level">
              {{item.from.level}}
            </span>
            <span class="info_admin" title="博主" v-if="item.from.isAdmin">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconhuangguan"></use> 
              </svg>
            </span>
            <span class="info_system">
              {{item.os}}
            </span>
            <span class="info_system">
              {{item.brower}}
            </span>
          </div>
          <div class="comment_content" v-html="(item.content).replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></div>
          <div class="commnet_list_time">
            <time>{{item.updatedAt}}</time>
            <div class="reply">
              <span title="别着急，我会慢慢长大">回复</span>
            </div>
          </div>
        </div>

        <!-- 开始   二级评论 -->
        <!-- <div class="reply">
          <div class="reply_box">
            <textarea></textarea>
          </div>
        </div> -->
        <!-- 结束   二级评论 -->

      </div>

      <div v-if="allPage > 5" class="next_comment">
        <button @click="next_comment">{{text}}</button>
      </div>

    </section>
    <!-- 结束  一级评论 -->

  </div>
  <!-- 结束  评论部分 -->
</template>

<script>
import * as system from '../../unit/systemTool'
export default {
  props: ['id', 'isArticle'],
  data() {
    return{
      contain: '',
      remainNum: 1000,
      showEmotion: false,
      commentList: [],
      allPage: 0,
      page: 1,
      text: '下一页',
      isSend: false,
      EmotionList:['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
        '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
        '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
        '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
        '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
        '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
        '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
        '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
        '激动', '街舞', '献吻', '左太极', '右太极'],
      os: 'windows7',
      brower: 'chrome'
    }
  },
  computed: {
    avater() {
      return this.$store.state.user.avater
    },
    isLogin() {
      return this.$store.state.user.isLogin
    },
  },
  methods: {
    // 将匹配结果替换表情图片
    emotion (res) {
      let word = res.replace(/\#|\;/gi, '')
      let index = this.EmotionList.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="top">`   
    },
    //  添加文章评论
    async add_article_comment() {
      let data = {}
      data.os = system.GetOs()
      data.brower = system.GetCurrentBrowser()
      data.content = this.contain
      data.id = this.$store.state.user._id
      data.article = this.id

      if(this.contain !== '') {
        let res = await this.request.api_post_comment(data)
        if(res.data.status == 1){
          this.contain = ''
          this.get_comment_list(this.id)
        }
      }
    },
    //  添加作品评论
    async add_works_comment() {
      let data = {}
      data.os = system.GetOs()
      data.brower = system.GetCurrentBrowser()
      data.content = this.contain
      data.id = this.$store.state.user._id
      data.works = this.id
      if(this.contain !== '') {
        let res = await this.request.api_post_addWorksComment(data)

        if(res.data.status == 1) {
          this.contain = ''
          this.get_works_comment(data.works)
        }
        
      }
    },
    //  添加评论
    add_comment() {
      if(this.isArticle){
        this.add_article_comment()
      }else{
        this.add_works_comment()
      }
    },
    //  获取评论
    async get_comment_list(id) {
      let data = {}
      data._id = id
      data.page = this.page
      data.size = 5
      let res = await this.request.api_get_commentList(data)
      this.commentList = res.data.comment
      this.allPage = res.data.allPage
      this.$getTime(this.commentList)

    },
    //  作品评论
    async get_works_comment(id) {
      let data = {}
      data.id = id
      let res = await this.request.api_get_worksCommentList(data)
      this.commentList = res.data.comment
      this.$getTime(this.commentList)
    },
    //  下一页
    async next_comment() {
      this.page ++

      if(this.page > Math.ceil(this.allPage/5)) {
        this.$Alert.info({
          content: '已经最后一页了哦！！！',
          duration: 1
        })
        return
      }

      let data = {}
      data._id = this.id
      data.page = this.page
      data.size = 5
      let res = await this.request.api_get_commentList(data)
      this.$getTime(res.data.comment)
      let arr = this.commentList.concat(res.data.comment)
      this.commentList = arr
    },
    //  显示登陆框
    show_login() {
      this.$store.commit('updateLogin', {
        showLogin: true
      })
    },
    //  开启表情
    openEmotion() {
      this.showEmotion = this.showEmotion == true?false:true
    },
    ClickEmoticon:function (EmoticonNo) {
      var _this = this
      _this.contain += '#' + _this.EmotionList[EmoticonNo] + ';'
    },
  },
  created() {
    if(this.isArticle){
      this.get_comment_list(this.id)
    }else{
      this.get_works_comment(this.id)
    }
  },
  watch: {
    contain: {
      handler(val) {
        this.remainNum = 1000 - this.contain.length
        if(val && this.isLogin) {
          this.isSend = true
        }else{
          this.isSend = false
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
/* 开始评论部分 */
.com{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  p{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .comment_con{
    position: relative;
    .comment_con_text{
      margin-top: 20px;
      margin-bottom: 20px;
      position: relative;
      textarea{
        width: 100%;
        min-height: 100px;
        line-height: 24px;
        padding: 10px 60px 10px 20px;
        color: #444;
        background: #f4f4f4;
        outline: none;
        border: 0;
        border-radius: 5px;
        box-sizing: border-box;
        resize: none;
      }
      span{
        position: absolute;
        right: 16px;
        bottom: 14px;
        font-size: 12px;
        color: #999;
      }
    }
    .unlogin_text{
      width: 100%;
      height: 100%;
      background: #f4f4f4;
      // background: #06aaff;
      border-radius: 5px;
      color: #444;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      button{
        width: 80px;
        height: 40px;
        margin-right: 10px;
        background: #06aaff;
        border: 1px solid #06aaff;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .comment_submit{
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    line-height: 40px;
    font-size: 14px;
    span{
      position: relative;
      &:nth-child(1){
        margin-right: 10px;
      }
      .emoticon_list{
        position: absolute;
        width: 365px;
        height: 240px;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-shadow: 1px 3px 6px #B8B8B8;
        box-shadow: 1px 3px 6px #B8B8B8;
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        z-index: 1;
        .emoticon_list_item{
          padding: 0 5px;
        }
      }
    }
    button{
      float: right;
      display: inline-block;
      width: 100px;
      height: 40px;
      background: #ddd;
      color: #fff; 
      outline: none;
      border: 0;
      border-radius: 5px;
      cursor: not-allowed;
    }
    button.send{
      background: #06aaff;
      cursor: pointer;
    }
  }
  .commnet{
    min-height: 400px;
    .no_comment{
      font-size: 14px;
    }

    .commnet_list{
      width: 100%;
      background: #fff;
      position: relative;
      .commnet_list_left{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 40px;
        height: 40px;
        img{
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
      }
      .commnet_list_right{
        padding: 10px 0 10px 60px;
        .comment_info{
          line-height: 30px;
          a{
            display: inline-block;
            margin-right: 20px;
          }
          span{
            display: inline-block;
            height: 20px;
            line-height: 20px;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;
            vertical-align: middle;
            margin-right: 5px;
          }
          span.info_level{
            padding: 0 4px;
            background: #06aaff;
          }
          span.info_admin{
            padding: 0 2px;
          }
          span.info_system{
            padding: 0 10px; 
            background: linear-gradient(90deg,#5087ec,#d95040,#f2bd42);
          }
        }
        .comment_content{
          line-height: 30px;
        }
        .commnet_list_time{
          display: flex;
          line-height: 30px;
          font-size: 12px;
          border-bottom: 1px solid #f1f1f1;
          color: #a8b6c0;
          .reply{
            span{
              display: inline-block;
              cursor: pointer;
              margin-left: 20px;
            }
          }
        }
      }
      //二级评论
      .reply{
        padding-left: 60px;
        .reply_box{
          textarea{
            width: 100%;
            min-height: 44px;
            line-height: 24px;
            padding: 10px 60px 10px 20px;
            color: #444;
            background: #f4f4f4;
            outline: none;
            border: 0;
            border-radius: 5px;
            box-sizing: border-box;
            resize: none;
          }
        }
      }
      
    }

    .next_comment{
      text-align: center;
      button{
        padding: 0 20px;
        height: 40px;
        color: #fff;
        line-height: 40px;
        background: #71d6b9;
        border: none;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 720px){
    font-size: .36rem;
    button{
      font-size: .36rem;
    }

    .comment_submit{
      span{
        .emoticon_list{
          width: 7.9rem;
        }
      }
    }
    .commnet{
      min-height: 0;
      .commnet_list{
        .commnet_list_right{
          .comment_info{
            a{
              font-size: .36rem;
            }
          }
        }
      }
    }
  }
} 
</style>