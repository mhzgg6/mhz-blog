<template>

  <div class="index">
    <div class="block_slider">
      <div :class="{'show': isFixed}">
        <svg @click="backTop" class="icon tip" aria-hidden="true">
          <use xlink:href="#iconhuojian"></use>
        </svg>
      </div>
    </div>

    

    <!-- <div class="empty"></div> -->
    <top-nav :isFixed=isFixed @opneLogin="acceptStatus"></top-nav>

    <div class="main" :class="{ 'is_moble_nav': showMoble.isMoble == true }">
      <!-- 解决动态路由 参数切换不跳转 -->
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <bottom></bottom>
    <!-- <button @click="login">登陆</button> -->
    <div class="login" :class="{active: showLogin}" v-if="showLogin">
      <div class="login-main">

        <div class="toggle_img">
          <img v-show="pandamIndex == num" v-for="(img, num) in pandamList" :key="num" :src=img alt="">
        </div>

        <div class="toggle_status">
          <span v-for="(label, index) in loginLabel" :key="index" :class="{on:cur==index}" @click="toggleLabel(index)">{{label}}</span>
          <svg @click="cancel" class="icon tip" aria-hidden="true">
            <use xlink:href="#iconguanbi"></use>
          </svg>
        </div>

        <!-- 登陆 -->
        <div class="toggle_login" v-if="cur==0">
          <!-- 用户名 -->
          <div class="item">
            <div class="item_name">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#iconnavicon-grkh"></use>
              </svg>
              <input 
                @focus="pandamIndex = 1" 
                @blur="pandamIndex = 0" 
                type="text" 
                placeholder="用户名" 
                v-model="loginUsername"
                maxlength="10"
                >
            </div>
          </div>
          <!-- 密码 -->
          <div class="item">
            <div class="item_password">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#iconmima"></use>
              </svg>
              <input 
                @focus="pandamIndex = 2" 
                @blur="pandamIndex = 0" 
                type="password" 
                placeholder="密码" 
                v-model="loginPassword"
                maxlength="12"
                >
            </div>
          </div>

          <div class="item">
            <button @click="login">登陆</button>
          </div>
          <p>注册登录即表示同意<a>用户协议、隐私政策</a></p>
        </div>

        <!-- 头像裁剪 开始-->
        <!-- 头像裁剪 结束 -->

        <!-- 注册 -->
        <div class="toggle_login" v-if="cur>0">
          <!-- 用户名 -->
          <div class="item">
            <div class="item_name">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#iconnavicon-grkh"></use>
              </svg>
              <input 
                @focus="pandamIndex = 1" 
                @blur="reg_username_blur" 
                type="text" 
                placeholder="2到10位汉字、字母、数字和_" 
                v-model="regUsername"
                maxlength="10"
                >
            </div>
          </div>
          <!-- 密码 -->
          <div class="item">
            <div class="item_password">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#iconmima"></use>
              </svg>
              <input 
                @focus="pandamIndex = 2" 
                @blur="reg_password_blur" 
                type="password" 
                placeholder="4到12位字母、数字" 
                v-model="regPassword"
                maxlength="12"
                >
            </div>
          </div>
          <!-- 邮箱 -->
          <div class="item">
            <div class="item_email">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#icontubiao209"></use>
              </svg>
              <input 
                type="text" 
                placeholder="qq邮箱" 
                v-model="regEmail"
                maxlength="20"
                >
            </div>
          </div>
          <!-- 验证码 -->
          <div class="item">
            <div class="item_verification">
              <input 
                type="text" 
                v-model="verificationCode"
                maxlength="12"
                >
              <button @click="isGetVerification && get_verification_code()">{{gainVerification}}</button>
            </div>
          </div>

          <div class="item">
            <button @click="registered">注册</button>
          </div>

          <p>注册登录即表示同意<a href="/privacy">用户协议、隐私政策</a></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import encrypt from '../../unit/crypto'
import TopNav from '../components/TopNav'
import Bottom from '../components/Bottom'
//  导入图片裁剪
export default{
  components: { TopNav, Bottom },
  data() {
    return{
      cur: 0,
      showLogin: false,
      logining: true,
      showPandam: true,                    //  熊猫是否显示
      loginLabel: ['登陆', '注册'],
      loginUsername: '',                    //  登陆姓名
      loginPassword: '',                    //  登陆密码
      regUsername: '',                      //  注册姓名
      regPassword: '',                      //  注册密码
      regEmail: '',                         //  邮箱
      verificationCode: '',                 //  验证码
      gainVerification: '获取验证码',
      timer: null,
      isGetVerification: true,               // 是否开启获取验证码事件
      pandamList: [
        'https://s2.ax1x.com/2020/01/06/lr23sU.png',
        'https://s2.ax1x.com/2020/01/06/lr2yee.png',
        'https://s2.ax1x.com/2020/01/06/lr22FA.png'
      ],
      pandamIndex: 0,
      isUpload: false,            //  是否上传头像
      avaterSrc: '',              //  头像路径
      default_image: 'https://s2.ax1x.com/2019/11/07/MFYwGT.png',   //  默认头像图片
      avaterImg: '',               //  上传到后端的图片路径
      regular: {
        username: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/,       //  2到10位汉字、字母、数字和_
        password: /^[a-zA-Z0-9]{4,12}$/                    //  4到12位字母、数字
      },
      isFixed: false,             //  顶部是否吸顶
      scrollTop: 0,                //  滚动高度
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
    }
  },
  computed: {
    allLogin() {
      return this.$store.state.showLogin
    },
    showMoble() {
      return this.$store.state.isMoble
    }
  },
  methods: {
    //  登陆
    async login() {
      if(this.loginUsername && this.loginPassword) {
        let user = {}
        user.username = this.loginUsername
        user.password = encrypt(this.loginPassword)
        const res = await this.request.api_post_login(user)
        const status = res.data.status
        const message = res.data.msg
        const data = res.data.data
        if(status == 1) {
          //  存储 token 到 vuex
          this.$store.commit('save', {  
            _id: data._id,
            username: data.username,
            token: data.token,
            avater: data.avater,
            isLogin: true                                                                   
          })
          this.showLogin = false
          this.loginUsername = ''
          this.loginPassword = ''
        }else{
          if(message == "宝贝 用户名不存在哦") {
            this.$Alert.info({
              content: message,
              duration: 1
            })
          }else{
            this.$Alert.info({
              content: message,
              duration: 1
            })
          }
        }
      }else{
        this.$Alert.info({
          content: '宝贝 输入正确信息哦'
        })
      }
    },
    //  注册
    async registered() {
      let uStatus = this.regular.username.test(this.regUsername)
      let pStatus = this.regular.password.test(this.regPassword)
      if(uStatus && pStatus) {
        let time = Date.now()
        //  用户数据
        let userData = {}
        userData.username = this.regUsername
        userData.password = encrypt(this.regPassword)
        userData.avater = this.avaterImg
        userData.email = this.regEmail
        userData.time = time
        userData.verificationCode = this.verificationCode
        let data = await this.request.api_post_reg(userData)
        if(data.data.status == 1) {
          this.regUsername = ''
          this.regPassword = ''
          this.isUpload = false
          this.avaterSrc = ''
          this.avaterImg = ''
          this.regEmail = ''
          this.verificationCode = ''
          this.cur = 0
          
          this.$Alert.info({
            content: '宝贝 注册成功哦'
          })
        }
      }else{
        this.$Alert.info({
          content: '宝贝 输入正确信息哦'
        })
      }
    },
    //  获取验证码
    async get_verification_code() {
      if(this.regEmail) {
        let data = {}
        data.email = this.regEmail
        let res = await this.request.api_get_verification(data)

        let status = res.data.status
        let msg = res.data.msg
        if(status === 1) {
          
          //  开始计时
          let countTime = 60
          this.isGetVerification = false
          this.timer = setInterval(() => {
            countTime --
            this.gainVerification = countTime + 's'
            if(countTime == 0) {
              this.gainVerification = '获取验证码'
              this.isGetVerification = true
              clearInterval(this.timer)
            }
          },1000)
        }else{
          this.$Alert.info({
            content: msg
          })
        }
      }else{
        this.$Alert.info({
          content: '请输入邮箱哦'
        })
      }
    },
    //  
    reg_username_blur() {
      this.pandamIndex = 0
      let uStatus = this.regular.username.test(this.regUsername)

      if(this.regUsername == '') {
        this.$Alert.info({
          content: '用户名没输入哦'
        })
      }else if(uStatus == false) {
        this.$Alert.info({
          content: '请按正确格式输入用户名'
        })
      }
    },
    reg_password_blur() {
      this.pandamIndex = 0
      let pStatus = this.regular.password.test(this.regPassword)

      if(this.regPassword == '') {
        this.$Alert.info({
          content: '密码没输入哦'
        })
      }else if(pStatus == false) {
        this.$Alert.info({
          content: '请按正确格式输入密码'
        })
      }
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
        this.showAvaterTailor = true
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
        this.avaterSrc = res.data.fileUrl
        this.avaterImg = res.data.fileUrl
      })
    },
    //  滚动监听
    handleScroll () {
      let _this = this
      //  滚动  40    con消失   顶部固定布局
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#scrollBar').offsetTop + 40
      _this.scrollTop = scrollTop
      this.isFixed = scrollTop > offsetTop ? true : false
    },
    //  回到顶部
    backTop() {
      let timer = setInterval(() => {
        let speed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + speed
        if(this.scrollTop === 0) {
          clearTimeout(timer)
        }
      },16)
    },
    //  接收顶部组件传来的登陆、注册状态
    acceptStatus(data) {
      this.showLogin = data.val
      this.cur = data.index
    },
    //  切换热门 近期文章
    toggleLabel(index) {
      this.cur = index 
    },
    //  关闭登陆
    cancel() {
      this.showLogin = false
    },
  },
  created() {
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(() => {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
      this.scrollTop = document.querySelector('#topFixed').offsetTop
    })
  },
  destory() {
    clearInterval(this.timer)
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    allLogin(val) {
      this.showLogin = val
    }
  },
}
</script>

<style lang="scss" scoped>
.index{
  width: 100%;
  position: relative;
  .block_slider{
    position: fixed;
    bottom: 5%;
    right: 10%;
    z-index: 9999;
    div{
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      background: rgba(204,204,204,.5);
      text-align: center;
      -webkit-transition: .5s;
      transition: .5s;
      -webkit-transform: translateX(100px);
      transform: translateX(300px);
      svg{
        font-size: 40px;
        margin: 10px;
        cursor: pointer;
      }
    }
    div.show{
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  .empty{
    width: 100%;
    height: 121px;
  }

  .main{
    -webkit-transition: .5s;
    transition: .5s;
  }

  .main.is_moble_nav{
    -webkit-transform: translateX(-200px);
    transform: translateX(-200px);
  }

  .login{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    opacity: 0;
    transition: opacity 1s;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-main{
      width: 360px;
      height: 440px;
      background: #fff;
      border-radius: 5px;
      padding: 20px;
      position: relative;
      .toggle_img{
        position: relative;
        img{
          position: absolute;
          left: 64px;
          top: -186px;
          &:nth-child(2){
            top: -198px;
          }
          &:nth-child(3){
            top: -158px;
          }
        }
      }
      .toggle_status{
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 40px 0 20px 0;
        text-align: center;
        font-size: 16px;
        span{
          display: inline-block;
          height: 100%;
          margin-right: 20px;
          box-sizing: border-box;
          cursor: pointer;
        }
        span.on{
          border-bottom: 2px solid #3c9eff;
        }
        svg{
          opacity: 0.4;
          cursor: pointer; 
          &:hover{
            opacity: 1;
          }
        }
      }
      .toggle_login{
        .item{
					width: 100%;
					text-align: center;
					margin-bottom: 20px;
					> div{
						width: 70%;
						position: relative;
						margin: 0 auto;
						> input{
							width: 100%;
							height: 40px;
							border: none;
							border-radius: 10px;
							background: #eff3f2;
							text-indent: 40px;
						}
						.tip{
							position: absolute;
							left: 8px;
							top: 10px;
							width: 20px;
							height: 20px;
						}
					}
          .item_verification{
            margin-left: 15%;
            text-align: left;
            input{
              width: 40%;
              text-indent: 10px;
              margin-right: 20%;
            }
            button{
              width: 40%;
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
          .avater{
            text-align: left;
            input{
              position: relative;
              width: 68px;
              height: 68px;
              overflow: hidden;
            }
            .cover_article{
              border: 1px dashed #d9d9d9;
              position: absolute;
              left: 0;
              top: 0;
              width: 66px;
              height: 66px;
              background: #fff;
              z-index: 1;
            }
            span{
              position: absolute;
              line-height: 68px;
              font-size: 12px;
              color: #a8b6c0;
              text-indent: 20px;
              a{
                color: #3c9eff;
              }
            }
            // .cropper{
            //   width: 100%;
            // }
          }
          .item_prompt{
            line-height: 20px;
            font-size: 12px;
            color: red;
            text-align: left;
            text-indent: 1em;
          }
					> button{
						width: 70%;
						height: 40px;
						color: #fff;
						line-height: 40px;
						background: #71d6b9;
						border: none;
						border-radius: 25px;
            outline: none;
						cursor: pointer;
					}
				}
        p{
          margin-top: 20px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          a{
            color: #3c9eff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .login.active{
    opacity: 1;
  }
  @media screen and (max-width: 720px){
    .login{
      // align-items: flex-end;
      // margin-bottom: .666667rem;
      .login-main{
        width: 84%;

        .toggle_status{
          font-size: .4rem;
        }

        .toggle_login{
          .item{
            div{
              .icon{
                width: .5rem;
                height: .5rem;
              }
              input{
                text-indent: 1rem;
              }
            } 
            button{
              font-size: .4rem;
            }    
          } 
          p{
            font-size: .32rem;
          } 
        }

      }
    }
  }
}
</style>