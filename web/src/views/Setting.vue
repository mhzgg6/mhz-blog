<template>
  <div class="personal_setting">
    <div class="setting-main">
      <h3>个人资料</h3>
      <ul>
        <li class="item">
          <p>用户名</p>
          <div>
            {{userInfo.username}}
          </div>
          <div @click="editor_personal">
            修改
          </div>
        </li>
        <!-- 上传头像 -->
        <li class="item">
          <p>头像</p>
          <div class="avater">
            <img :src=userInfo.avater alt="">
          </div>
          <div>
            <!-- <input @change="show_image($event)" id="avater" type="file" ref="image_btn" multiple="multiple">
            <label for="avater">
              重新选择
            </label> -->
            <button @click="openCropper">修改头像</button>
          </div>
        </li>
        <li class="item">
          <p>是否管理员</p>
          <div>
            {{userInfo.isAdmin}}
          </div>
          <div @click="editor_personal">修改</div>
        </li>
        <li class="item">
          <p>等级</p>
          <div>
            {{userInfo.level}}
          </div>
        </li>
        <li class="item">
          <p>评论数量</p>
          <div>
            {{userInfo.commentNum}}
          </div>
        </li>
      </ul>
    </div>
    <!-- 头像裁剪 开始-->
    <div class="avater_cover" v-if="showAvaterTailor">
      <div class="avater_editor">
        <div class="avater_editor_title">上传头像</div>
        <div class="avater_editor_main">
          <!-- 右边头像预览 -->
          <div class="preview_avater" v-html="previewSrc">
            <!-- <img :src=previewSrc alt="" width="100%" height="100%"> -->
            <!-- <span>头像预览</span> -->
          </div>
          <!-- 右边头像预览 -->
          <!-- 左边头像编辑 -->
          <div class="cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :info="option.info"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
              alt="Source Image"
              >
            </vueCropper>
          </div>
          <!-- 左边头像编辑 -->
        </div>
        <div class="btn_cropper">
          <input @change="show_image($event)" id="avater" type="file" ref="image_btn" multiple="multiple">
          <label for="avater">
            修改头像
          </label>
          <span>
            <svg @click="scale_avater(1)" class="icon tip" aria-hidden="true">
              <use xlink:href="#iconfangda"></use>
            </svg>
          </span>
          <span>
            <svg @click="scale_avater(-1)" class="icon tip" aria-hidden="true">
              <use xlink:href="#iconsuoxiao"></use>
            </svg>
          </span>
          <span>
            <svg @click="rotate_left" class="icon tip" aria-hidden="true">
              <use xlink:href="#iconziyuan1"></use>
            </svg>
          </span>
        </div>
        <div class="avater_editor_select">
          <button @click="finish">确定上传</button>
          <button @click="showAvaterTailor = false">取消</button>
        </div>
      </div>
      
    </div>
    
    <!-- 头像裁剪 结束 -->
  </div>
</template>

<script>
export default{
  name: 'personal_setting',
  data() {
    return{
      isUpload: false,            //  是否上传头像
      previewSrc: '',                //  预览头像
      showAvaterTailor: false,     //  头像裁剪是否打开
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1,1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      userInfo: {}
    }
  },
  computed: {
    id() {
      return this.$store.state.user._id
    }
  },
  methods:{
    //  获取文章详情
    async get_userinfo() {
      let data = {}
      data.id = this.id

      let res = await this.request.api_get_userinfo(data)
      this.userInfo = res.data.userinfo
      this.previewSrc = this.userInfo.avater

    },
    openCropper() {
      this.showAvaterTailor = true
      this.option.img = this.userInfo.avater
    },
    //  裁剪图片
    async show_image(e) {
      let file = e.target.files[0]
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg' 
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!isJPG){
        this.$Alert.info({
          content: '宝贝 上传jpg/png/jpeg格式哦!'
        })
      }
      if(!isLt2M){
        this.$Alert.info({
          content: '宝贝 图片大小不能超过 2MB!'
        })
      }
      if(isLt2M && isJPG){
        let url = URL.createObjectURL(file)
        this.option.img = url
        // this.previewSrc = url
      }
    },
    //  上传图片
    finish() {
      this.$refs.cropper.getCropBlob(async (data) => {
        let param = new FormData()//创建form对象
        param.append('file',data)//通过append向form对象添加数据
        //  测试上传图片
        let res =  await this.request.api_post_img(param)
        this.showAvaterTailor = false
        this.isUpload = true
        this.avaterSrc = res.data.url
        this.avaterImg = res.data.url

        if(res.data.status == 1) {
          this.change_user_avater()
        }
      })
    },
    //  预览
    realTime(data) {
      // let url = URL.createObjectURL(data.url)
      this.previewSrc = data.html
    },
    //  星座旋转
    rotate_left() {
      this.$refs.cropper.rotateLeft()
    },
    scale_avater(scale) {
      this.$refs.cropper.changeScale(scale)
    },
    //  修改头像
    async change_user_avater() {
      let data = {}
      data.id = this.id
      data.avater = this.avaterImg

      let res = await this.request.api_post_avater(data)
      if(res.data.status == 1) {
        this.$Alert.info({
          content: res.data.msg
        })
        this.get_userinfo()
        this.$store.commit('changeAvater',{
          avater: this.avaterImg 
        })
      }
    },
    editor_personal() {
      this.$Alert.info({
        content: '不想写了'
      })
    }
  },
  created() {
    this.get_userinfo()
  }
}
</script>


<style lang="scss">
.personal_setting{
  background: #e9eaed;
  padding: 20px 0;
  .setting-main{
    width: 1160px;
    margin: 0 auto;
    padding: 0 20px; 
    background: #fff;
    border-radius: 5px;
    h3{
      line-height: 40px;
    }
    ul{
      li{
        position: relative;
        display: flex;
        padding: 10px 0;
        border-top: 1px solid #f1f1f1;
        font-size: 14px;
        > p{
          width: 100px;
          line-height: 70px;
          color: #333;
          // display: inline-block;
        }
        > div{
          line-height: 70px;
          color: #909090;
          &:nth-child(2) {
            width: calc(100% - 160px);
          }
          &:nth-child(3) {
            width: 60px;
            color: #06aaff;
            cursor: pointer;
            position: relative;
            button{
              width: 100%;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background: #06aaff;
              color: #fff;
              outline: none;
              border: 0;
              border-radius: 2px;
              cursor: pointer;
            }
          }
          > input{
            opacity: 0;
          }
          > label{
            position: absolute;
            left: 0;
            top: 20px;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #06aaff;
            color: #fff;
            outline: none;
            border: 0;
            border-radius: 2px;
            cursor: pointer;
          }
        }
        .avater{
          height: 70px;
          img{
            height: 100%;
          }
        }
      }
    }
  }  
  .avater_cover{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;;
    height: 100%;
    background: rgb(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .avater_editor{
      padding: 20px;
      background: #fff;
      border-radius: 5px;
      .avater_editor_title{
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #f1f1f1;
      }
      .avater_editor_main{
        width: 450px;
        padding: 20px 0;
        position: relative;
        .cropper{
          width: 300px;
          height: 300px;
          /* height: calc(100% - 40px); */
          border-radius: 5px;
          z-index: 9999;
          background: #fff;
          margin-right: 30px;
        }
        .preview_avater{
          position: absolute;
          left: 330px;
          top: 20px;
          width: 100px;
          height: 100px;
          .show-preview{
            width: 100%;
            height: 100%;
            border-radius: 50px;
          }
        }
      }
      .btn_cropper{
        height: 40px;
        position: relative;
        border-bottom: 1px solid #f1f1f1;
        input{
          opacity: 0;
          width: 210px;
        }
        label{
          position: absolute;
          left: 0;
          top: 0;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #71d6b9;
          color: #fff;
          outline: none;
          border: 0;
          border-radius: 2px;
          cursor: pointer;
        }
        span{
          display: inline-block;
          width: 30px;
          height: 100%;
          text-align: center;
          .icon{
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
      .avater_editor_select{
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
          height: 30px;
          line-height: 30px;
          text-align: center;
          padding: 0 10px;
          margin-right: 10px;
          background: #71d6b9;
          color: #fff;
          outline: none;
          border: 0;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  } 

  @media screen and (max-width: 720px){
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .setting-main{
      width: 100%;
      box-sizing: border-box;
    }
    .avater_cover{
      .avater_editor{
        width: calc(100% - 80px);
        padding: 0 20px;
        .avater_editor_main{
          width: 100%;
          // display: block;
          .cropper{
            width: 100%;
            margin-top: 20px;
          }
          .preview_avater{
            position: static;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            >div{
              margin: 0 auto;
            }
          }
        }
        .btn_cropper{
          input{
            width: calc(100% - 90px);
          }
        }
      }
    }
  }
}
    



</style>