<template>
  <div class="editArticle">
    <!-- 开始    内容部分 -->
    <h5>新增文章</h5>

    <div class="article article_title">


    <!-- <div class="article article_image">
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

          <label for="avater" class="cover_article">
            <img :src="isUpload?articleSrc:default_image" alt="" width="100%" height="100%">
          </label>
          <input @change="show_image($event)" id="avater" type="file" ref="image_btn" multiple="multiple">
        </el-col>
      </el-row>
    </div> -->
    
    <a-form id="form" :form="form" layout="horizontal">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="文章标题" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
            <a-input  
              v-decorator="['username',{
                rules: [{ required:true}],
              }]"
              >
                <!-- initialValue: selected.username -->
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="文章描述" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
            <a-textarea 
              style="resize:none;"
              maxlength="200" 
              placeholder="最多填200个字符!"
              :rows="4" 
              allow-clear
              v-decorator="[`reduceTo`,{rules: [{required: true, message: '请填写文章描述!'}]}]"
              />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="文章描述" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
            <mavon-editor 
              v-decorator="[`article_content`,{rules: [{required: true, message: '请填写文章描述!'}],initialValue: value}]"
              @imgAdd="editorAddImg" 
              @change="get_con" 
              ref="md" 
              />
          </a-form-item>
        </a-col>
      </a-row>
      </a-row>
    </a-form>
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
import { Row, Col, Form, Input, Button } from "ant-design-vue";
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
  components:{
    ARow: Row,
    ACol: Col,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    AButton: Button
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
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

<style lang="less" scoped>
.editArticle {
  width: 100%;
  background: #fff;
  h5{
    line-height: 40px;
    text-align: center;
  }
  .article_title{
    padding: @content-padding-v @content-padding-h;
  }
}
</style>
