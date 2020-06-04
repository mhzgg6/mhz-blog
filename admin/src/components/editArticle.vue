<template>
  <div class="editArticle">
    <!-- 开始    内容部分 -->
    <h4>新增文章</h4>
    <div class="article article_title">
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
            <a-form-item label="文章封面" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
              >
                <!-- @change="uploadAvater" -->
                <img v-if="upload.img" :src="upload.img" alt="avatar" />
                <div v-else>
                  <a-icon :type="upload.loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="文章标签" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
              <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
                    {{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip>
                <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
                  {{ tag }}
                </a-tag>
              </template>
              <a-input
                v-if="inputVisible"
                ref="input"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="inputValue"
                @change="handleInputChange"
                @blur="handleInputConfirm"
                @keyup.enter="handleInputConfirm"
              />
              <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
                <a-icon type="plus" /> New Tag
              </a-tag>
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
            <a-form-item label="文章内容" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
              <mavon-editor 
                v-decorator="[`article_content`,{rules: [{required: true, message: '请填写文章描述!'}],initialValue: value}]"
                @imgAdd="editorAddImg" 
                @change="get_con" 
                ref="md" 
                />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-button type="primary" style="float: right;">提交</a-button>
        </a-col>
      </a-row>
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
import { Row, Col, Form, Input, Button, Tag, Icon, Upload } from "ant-design-vue";
export default {
  name: 'editArticle',
  data() {
    return {    
      upload: {
        loading: false,
        img: ''
      },
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  components:{
    ARow: Row,
    ACol: Col,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    AButton: Button,
    ATag: Tag,
    AIcon: Icon,
    AUpload: Upload
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    get_con(){
      console.log(this.$refs.md.d_value,'值')
      console.log(this.$refs.md.d_render,'值')
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

      }
    },
    async uploadAvater(info) {
      if (info.file.status === 'uploading') {
        this.upload.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        
      }
    },
    async beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        return this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        return this.$message.error('Image must smaller than 2MB!');
      }
      let param = new FormData()//创建form对象
      param.append('file',file)//通过append向form对象添加数据
      await this.request.api_post_img(param)
      .then(res => {
        this.upload.img = res.data.url
        this.upload.loading = false
      })
      .catch(err => {
        this.$message.error("上传失败")
        this.upload.loading = false
      })
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
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
  h4{
    line-height: 40px;
    text-align: center;
  }
  .article_title{
    padding: @content-padding-v @content-padding-h;
  }
}
</style>
