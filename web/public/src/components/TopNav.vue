<template>
  <div class="top">

    <div class="con" v-show="isScroll">
      <div class="contact clearfix">
        <div class="contact_email">
          <span class="contact_email_icon">
            <img src="../assets/top/phone.png" alt="" width="100%" height="100%">
          </span>
          <span class="contact_email_text">1695934841@qq.com</span>
        </div>

        <div class="contact_phone">
          <span class="contact_phone_icon">
            <img src="../assets/top/phone.png" alt="" width="100%" height="100%">
          </span>
          <span class="contact_phone_text">13648319375</span>
        </div>

        <div class="contact_social">
          <span>
            <img src="../assets/top/github.png" alt="" width="100%" height="100%">
          </span>
          <span>
            <img src="../assets/top/qq.png" alt="" width="100%" height="100%">
          </span>
          <span>
            <img src="../assets/top/wechat.png" alt="" width="100%" height="100%">
          </span>
        </div>
      </div>

      <div class="search" v-show="isSearch">
        <div class="search_con">
          <input type="text" placeholder="请输入您需要的内容">
          <button>提交</button>
        </div>
      </div>
    </div>
    
    <div class="nav" id="scrollBar">
      <div class="nav_logo clearfix">
        <div class="nav_logo_img">
          <a href="/">
            <img src="../assets/top/logo.jpg" alt="" width="100%" height="100%">
          </a>
        </div>
      </div>
      <ul :class="[isMusic?'music_nav':'']">
        <li :class="{on: '/home' === $route.path}" @mouseenter="palyOne()">
          <a href="/home">
            <span>首页</span>
            <span>首页</span>
          </a>
          <p></p>
          <audio src="https://www.weipxiu.com/wp-content/themes/Art_Blog/music/nav_1.mp3" ref="audio_one"></audio>
        </li>
        <li @mouseenter="palyTwo()">
          <a href="javascript:void(0);">
            <span>前端开发
              <i class="iconfont iconxiangxia"></i>
            </span>
            <span>前端开发
              <i class="iconfont iconxiangxia"></i>
            </span>
          </a>
          <p></p>
          <audio src="https://www.weipxiu.com/wp-content/themes/Art_Blog/music/nav_2.mp3" ref="audio_two"></audio>
          
          <div class="nav_list_skill">
            <router-link to="/web/vue.js" :class="{active: '/web/vue.js' === $route.path}">vue.js</router-link>
            <router-link to="/web/js" :class="{active: '/web/js' === $route.path}">js</router-link>
          </div>
        </li>
        <li :class="{on: '/works' === $route.path}" @mouseenter="palyThree()">
          <a href="/works">
            <span>个人作品</span>
            <span>个人作品</span>
          </a>
          <p></p>
          <audio src="https://www.weipxiu.com/wp-content/themes/Art_Blog/music/nav_3.mp3" ref="audio_three"></audio>
        </li>
        <li :class="{on: '/about' === $route.path}" @mouseenter="palyFour()">
          <a href="/about">
            <span>关于博客</span>
            <span>关于博客</span>
          </a>
          <p></p>
          <audio src="https://www.weipxiu.com/wp-content/themes/Art_Blog/music/nav_4.mp3" ref="audio_four"></audio>
        </li>
        <li :class="{on: '/my' === $route.path}" @mouseenter="palyFive()">
          <a href="/my">
            <span>关于博主</span>
            <span>关于博主</span>
          </a>
          <p></p>
          <audio src="https://www.weipxiu.com/wp-content/themes/Art_Blog/music/nav_5.mp3" ref="audio_five"></audio>
        </li>
        <li :class="{on: '/comment' === $route.path}" @mouseenter="palySix()">
          <a href="/comment">
            <span>留言板</span>
            <span>留言板</span>
          </a>
          <p></p>
          <audio src="https://www.weipxiu.com/wp-content/themes/Art_Blog/music/nav_6.mp3" ref="audio_six"></audio>
        </li>
      </ul>
      <div class="nav_search">
        <div class="nav_search_left">
          <span>
          <svg class="icon" aria-hidden="true" @click="addMusic()">
            <use xlink:href="#iconziyuan"></use> 
          </svg>
          </span>
          <span>
            <svg class="icon" aria-hidden="true" @click="showSearch()">
              <use xlink:href="#iconsousuo"></use> 
            </svg>
          </span>
        </div>
        
        <div class="nav_search_right" v-show="isShow">
          <a href="/login">登陆</a>
          <a href="/register">注册</a>
        </div>
        
        <div class="nav_search_my" v-show="isLogin">
          <div class="my_avater">
            <img src="../assets/top/my.jpg" alt="" width="100%" height="100%">
          </div>
          <div style="font-size: 16px;cursor: pointer;">注销</div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script>
// import bus from '../../plug/bus'
export default {
  name: 'top',
  data() {
    return {
      isSearch: false,
      isScroll: true,
      isMusic: false,
      isShow: true,
      isLogin: false
    }
  },
  methods: {
    showSearch(){
      if(this.isSearch == true) {
        this.isSearch = false
      }else{
        this.isSearch = true
      }
    },
    handleScroll () {
      //  滚动  40    con消失   顶部固定布局
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      
      // let offsetTop = document.querySelector('#scrollBar').offsetTop
      // this.isScroll = scrollTop > ( offsetTop - 41 )
      // console.log( this.isScroll )
    },
    addMusic(){
      if( this.isMusic == true) {
        this.isMusic = false
      }else{
        this.isMusic = true
      }
      
    },
    palyOne() {
      if(this.isMusic == true){
         this.$refs.audio_one.play()
      }
    },
    palyTwo() {
      if(this.isMusic == true){
         this.$refs.audio_two.play()
      }
    },
    palyThree() {
      if(this.isMusic == true){
         this.$refs.audio_three.play()
      }
    },
    palyFour() {
      if(this.isMusic == true){
         this.$refs.audio_four.play()
      }
    },
    palyFive() {
      if(this.isMusic == true){
         this.$refs.audio_five.play()
      }
    },
    palySix() {
      if(this.isMusic == true){
         this.$refs.audio_six.play()
      }
    },
    getRouterData(){
      this.isShow = this.$route.params.isShow
      this.isLogin = this.$route.params.isLogin
    }
  },
  created(){
    // var _this = this
    // bus.$on('changeLogin',msg =>{
    //   // this.isShow = msg
    //   console.log( msg )
    // })
    // console.log(bus)
  },
  mounted() {
    // this.getRouterData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  width: 100%;
  background: #fff;
  color: #767575;
  font-size: 12px;
  -webkit-box-shadow: 0 4px 4px rgba(0,0,0,.2);
  box-shadow: 0 4px 4px rgba(0,0,0,.2);
}

.con{
  border-bottom: 1px solid #eee;
  position: relative;
}

.search{
  position: absolute;
  bottom: -201px;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: rgba(255,255,255,.95);
  /* display: none; */
  -webkit-transition: all .8s;
  transition: all .8s;
  z-index: 2;
}

.search_con{
  width: 721px;
  margin: 40px auto;
}

.search_con input{
  width: 680px;
  height: 40px;
  outline: 0;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 5px 0 0 5px;
  text-indent: 1em;
}

.search_con button{
  width: 40px;
  height: 40px;
  border: 1px solid #1890ff; 
  background: #1890ff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.contact {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
}

.contact_email {
  float: left;
  width: 160px;
  height: 100%;
  border-right: 1px solid #eee;
}

.contact_email_icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 8px 8px;
}

.contact_email_text{
  display: inline-block;
  line-height: 40px;
  cursor: pointer;
}

.contact_phone{
  float: left;
}

.contact_phone_icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 8px 8px;
}

.contact_phone_text{
  display: inline-block;
  line-height: 40px;
  cursor: pointer;
}

.contact_social{
  float: right;
}

.contact_social span{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-top:14px;
  margin-left:10px;
  cursor: pointer;
}

/* 开始  导航连接 */
.nav{
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  position: relative;
}

.nav_logo{
  float: left;
  width: 400px;
  height: 80px;
}

.nav_logo_img{
  width: 94px;
  height: 34px;
  margin: 23px 10px 0;
  cursor: pointer;
}

.nav_logo_img a{
  display: inline-block;
  width: 100%;
  height: 100%;
}

.nav ul{
  float: left;
  width: 600px;
  height: 40px;
  margin-top: 20px;
}

.nav ul li{
  float: left;
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  -webkit-transition: all 1s;
  transition: all 1s;
  position: relative;
}

.nav ul li > a{
  display: inline-block;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-style: flat\9;
  transform-style: flat\9;
  -webkit-transition: all .5s;
  transition: all .5s;
  -webkit-transform-origin: center center -14px;
  transform-origin: center center -14px;
  height: 100%;
  z-index: 2;
}

.nav ul li > p{
  opacity: 0;
  position: absolute;
  bottom: -19px;
  left: 0;
  width: 100%;
  height: 4px;
  background: #b9d329;
  -webkit-transition: all .5s;
  transition: all .5s;
}

.nav ul li:nth-child(2) > p{
  background: #c0ebf7;
}

.nav ul li:nth-child(3) > p{
  background: #69bcf3;
}

.nav ul li:nth-child(4) > p{
  background: #79d9f3;
}

.nav ul li:nth-child(5) > p{
  background: #ffae5b;
}

.nav ul li:hover > a{
  color: #3c9eff;
  -webkit-transform: rotateX(-89deg);
  transform: rotateX(-89deg);
  -webkit-transform: rotateX(0)\9;
  transform: rotateX(0)\9;
  margin-top: 2px;
}

.nav ul.music_nav li > p{
    -webkit-transition: height .25s;
    transition: height .25s;
    z-index: 0;
    opacity: 1;
    display: block;
}

.nav ul.music_nav li:hover > p{
  height: 80px;
}

.nav ul li.on > a{
  color: #3c9eff;
}

.nav ul li a span{
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.nav ul li a span:last-child{
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transform-origin: bottom;
  transform-origin: bottom;
  -ms-transform-origin: bottom;
  -webkit-transform: rotateX(90deg);
  transform: rotateX(90deg);
  -ms-transform: rotateX(90deg);
}

.nav ul li:nth-child(2) {
  position: relative;
}

.nav_list_skill{
  opacity: 0;
  position: absolute;
  left: 0;
  top: 54px;
  width: 90px;
  background: rgba(255,255,255,0.9);
  z-index: 999;
  border-top: 4px solid #3c9eff;
}

.nav_list_skill::before{
  height: 0;
  width: 0;
  border: 7px solid transparent;
  position: absolute;
  top: -16px;
  left: 30px;
  border-bottom-color: #1890ff;
}

.nav ul li:nth-child(2):hover .nav_list_skill{
  opacity: 1;
} 

.nav_list_skill a{
  display: block;
  width: 100%;
  height: 40px;
  font-size: 14px;
  color: #767575;
  border: 1px solid #eee;
}

.nav_list_skill a:hover{
  color: #3c9eff;
  background: #eee;
}

.nav_list_skill a.active{
  color: #3c9eff;
}

.nav_list li i{
  font-size: 14px;
  margin-left: 3px;
}
.nav_list li:hover{
  color: #3c9eff;
}

.nav_search{
  float: left;
  width: 200px;
  height: 100%;
  line-height: 80px;
  text-align: center;
}

.nav_search div{
  float: left;
}

.nav_search_left span{
  display: inline-block;
  width: 40px;
  height: 100%;
}

.nav_search_left span svg{
  font-size: 16px;
  cursor: pointer;
}

.nav_search_right a{
  display: inline-block;
  width:60px;
  height: 100%;
  font-size: 16px;
  cursor: pointer;
}

.nav_search_right a:hover{
  color: #3c9eff;
}

.nav_search_my{
  width: 120px;
}

.my_avater{
  width: 40px;
  height: 40px;
  margin: 15px 20px 0 20px;
}

.my_avater img{
  border-radius: 50%;
  cursor: pointer;
}

</style>
