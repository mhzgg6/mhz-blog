<template>
  <div class="editArticle">
    <!-- 开始    内容部分 -->
    <h5>新增文章</h5>

    <div class="article article_title">
      <el-row>
        <el-col>
          <span>
            <el-tooltip class="item" effect="dark" content="必填" placement="top-start">
              <i>*</i>
            </el-tooltip>
            标题：
          </span>
        </el-col>
        <el-col>
          <el-input v-model="title" placeholder="文章标题" @blur="blur_title"></el-input>
        </el-col>
      </el-row>
    </div>

    <div class="article article_image">
      <el-row>
        <el-col>
          <span>
            <el-tooltip class="item" effect="dark" content="必填" placement="top-start">
              <i>*</i>
            </el-tooltip>
            封面：
          </span>
        </el-col>
        <el-col>
          <!-- 图片预览 -->
          <label for="avater" class="cover_article">
            <img :src="isUpload?articleSrc:default_image" alt="" width="100%" height="100%">
          </label>
          <input @change="show_image($event)" id="avater" type="file" ref="image_btn" multiple="multiple">
        </el-col>
      </el-row>
    </div>
    
    <div class="article article_labels">
      <el-row>
        <el-col>
          <span>
            <el-tooltip class="item" effect="dark" content="必填" placement="top-start">
              <i>*</i>
            </el-tooltip>
            标签：
          </span>
        </el-col>
        <el-col>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="article article_textarea">
      <el-row>
        <el-col>
          <span>
            <el-tooltip class="item" effect="dark" content="必填" placement="top-start">
              <i>*</i>
            </el-tooltip>
            描述：
          </span>
        </el-col>
        <el-col>
          <el-input
            @blur="blur_describe"
            type="textarea"
            :rows="2"
            placeholder="文章描述"
            v-model="describe">
          </el-input>
        </el-col>
      </el-row>
    </div>

    <div class="article article_content">
      <el-row>
        <el-col>
          <span>
            <el-tooltip class="item" effect="dark" content="必填" placement="top-start">
              <i>*</i>
            </el-tooltip>
            内容：
          </span>
        </el-col>
        <el-col>
          <mavon-editor @imgAdd="editorAddImg" @change="get_con" ref="md" v-model="value"/>
        </el-col>
      </el-row>

      <div class="submit">
        <el-button type="primary" @click="addArticle">添加文章</el-button>
      </div>
    </div>
    <!-- 结束    内容部分 -->
  </div>
</template>

<script>
// import marked from 'marked'
// var rendererMD = new marked.Renderer()
// marked.setOptions({
//   renderer: rendererMD,
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false
// })
export default {
  name: 'editArticle',
  data() {
    return {    
      title: '',                //  文章标题
      imageUrl: '',       
      dynamicTags: [],          //  标签列表
      describe: '',             //  文章描述
      value: '',                //  mavon-editor 值
      avaterFormdata: '',       //  头像的foemdata数据  传到后端处理
      isUpload: false,          
      default_image: 'https://s2.ax1x.com/2019/11/07/MFYwGT.png',
      articleSrc: '',         
      inputVisible: false,
      inputValue: '',
      articleImg: '',           //  文章封面图片
    }
  },
  // computed: {
  //   show_content() {
  //     return marked(this.input, { sanitize: true })
  //   }
  // },
  methods: {
    get_con(){
      console.log(this.$refs.md.d_value,'值')
      console.log(this.$refs.md.d_render,'值')
    },
    //  title失去焦点
    blur_title() {
      if(!this.title) {
        this.$message({
          message: '请添加标题哦',
          type: 'warning'
        })
      }
    },
    //  title失去焦点
    blur_describe() {
      if(!this.describe) {
        this.$message({
          message: '请添加文章描述哦',
          type: 'warning'
        })
      }
    },
    //  预览图片
    async show_image(e) {
      let file = e.target.files[0]
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg' 
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!isJPG){
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if(!isLt2M){
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if(isLt2M && isJPG){
        let url = URL.createObjectURL(file)
        this.isUpload = true
        this.articleSrc = url

        let param = new FormData()//创建form对象
        param.append('file',file)//通过append向form对象添加数据
        this.avaterFormdata = param
        // console.log(param.get('file'))//FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // console.log(this.avaterFormdata)

        //  测试上传图片
        let res = await this.request.api_post_img(param)
        this.articleImg = res.data.url
        // console.log(res,this.articleImg,'封面')
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    //  处理编辑器添加图片
    async editorAddImg(pos, $file) {
      //  第一步 将图片上传到服务器
      var formData = new FormData()
      formData.append('file',$file)
      //  测试上传图片
      let res = await this.request.api_post_img(formData)
      let url = res.data.url
      this.$refs.md.$img2Url(pos, url)
    },
    //  添加文章
    async addArticle() {
      let data = {}
      data.title = this.title
      data.img = this.articleImg
      data.label = this.dynamicTags
      data.describe = this.describe
      data.content = this.$refs.md.d_render
      data.author = this.$store.state.user._id
      data.name = this.dynamicTags[0]
      let res = await this.request.api_post_addArticle(data)
      // let resute = await this.request.api_article_category({name: 'vue'})
      let status = res.data.status
      if(status == 1){
        this.title = ''
        this.dynamicTags = []
        this.describe = ''
        this.value = ''
      }
      // console.log(res, resute)
    },
    //  添加作品
    // async addArticle() {
    //   let data = {}
    //   data.title = this.title
    //   data.img = this.articleImg
    //   data.label = this.dynamicTags
    //   data.content = this.$refs.md.d_render
    //   data.author = this.$store.state.user._id

    //   let res = await this.request.api_post_works(data)
    //   console.log(res,'作品')
    // },
    test() {
      console.log(this.value)
    },
  }  
}
</script>

<style>
.article .el-col:nth-child(1){
  width: 100px;
}
.article .el-col:nth-child(2){
  width: calc(100% - 100px);
}
.article .el-col span i{
  color: red;
}
/* 头像部分 */
.article_image input {
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
}
.article_image .cover_article{
  border: 1px dashed #d9d9d9;
  position: absolute;
  left: 100px;
  top: 0;
  width: 200px;
  height: 200px;
  background: #fff;
  z-index: 1;
}
/* 标签 */
.article_labels .el-tag{
  margin-right: 20px;
}
</style>

<style lang="scss" scoped>
.editArticle {
  width: 100%;
  background: #fff;
  h5{
    line-height: 40px;
    text-align: center;
  }
  .article_title{
    margin: 20px 0;
    span{
      line-height: 40px;
    }
  }
  .article_image{
    margin: 20px 0;
  }
  .article_labels{
    margin: 20px 0;
  }
  .article_textarea{
    margin: 20px 0;
  }
  .article_content{
    margin-bottom: 100px;
    .submit{
      height: 60px;
      button{
        margin: 20px 20px 0 0;
        float: right;
      }
    }
    .markdown-body{
      min-height: 500px;
    }
  }
}
</style>
