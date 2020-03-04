<template>
  <div class="top" id="topFixed" :class="{'is_fixed': isFixed}">

    <!-- 开始  顶部联系部分 -->
    <div class="con">
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
          <input type="text" placeholder="请输入您需要的内容" v-model="serachText">
          <button @click="serach">提交</button>
        </div>
      </div>
    </div>
    <!-- 结束  顶部联系部分 -->

    <div class="nav" id="scrollBar">
      <!-- 开始  网站logo部分 -->
      <div class="nav_logo clearfix">
        <div class="nav_logo_img">
          <a href="/">
            <img src="../assets/top/logo.jpg" alt="" width="100%" height="100%">
          </a>
        </div>
      </div>
      <!-- 结束  网站logo部分 -->

      <!-- 开始  导航部分 -->
      <ul :class="[isMusic?'music_nav':'']">
        <li :class="{ 'on': liIndex == i }" v-for="(list,i) in navList" :key="i" @mouseenter="playMusic(i)">
          <router-link @click.native="toggleLi(i)" :to="(list.skillList.length?$route.fullPath:list.link)">
            <span>
              {{list.span}}
              <svg v-if="list.skillList.length !== 0" class="icon" aria-hidden="true">
                <use xlink:href="#iconxiangxia"></use> 
              </svg>
            </span>
            <span>
              {{list.span}}
              <svg v-if="list.skillList.length !== 0" class="icon" aria-hidden="true">
                <use xlink:href="#iconxiangxia"></use> 
              </svg>
            </span>
          </router-link>
          <p></p>
          <audio :src=list.audioSrc ref="music"></audio>
          <div  v-if="list.skillList.length !== 0" class="nav_list_skill">
            <router-link :class="{ 'active': skillIndex == i+','+j }" @click.native="toggleSkill(i,j)" :to="list.skillLink[j]" v-for="(skill,j) in list.skillList" :key="j">{{skill}}</router-link>
          </div>
        </li>
      </ul>
      <!-- 结束  导航部分 -->

      <!-- 开始  搜索部分 -->
      <div class="nav_search">
        <div class="nav_search_left">
          <span v-if="!isMusic">
            <svg class="icon" aria-hidden="true" @click="addMusic()">
              <use xlink:href="#iconziyuan"></use> 
            </svg>
          </span>
          <span v-show="isMusic" @click="addMusic()">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span>
            <svg class="icon" aria-hidden="true" @click="showSearch()">
              <use xlink:href="#iconsousuo"></use> 
            </svg>
          </span>
        </div>
        
        <div class="nav_search_right" v-show="!isLogin">
          <a @click="linkLogin(0)">登陆</a>
          <a @click="linkLogin(1)">注册</a>
        </div>
        
        <div class="nav_search_my" v-show="isLogin">
          <div class="my_avater">
            <img @click="personal" :src="avater" alt="" width="100%" height="100%">
          </div>
          <div @click="logout" style="font-size: 16px;cursor: pointer;">注销</div>

          <!-- 开始  个人设置 -->
          <div v-show="showSetting" class="person-setting">
            
                <router-link @click.native="showSetting = false" to="/blog/user/setting">修改头像</router-link>

          </div>
          <!-- 结束  个人设置 -->
          <div></div>
        </div>

      </div>
      <!-- 搜索  部分结束 -->
    </div>

    <!-- 开始 移动端导航 -->
    <div class="moble-nav">
      <!-- <h2 @click="show_moble_nav">ssssssssssssssssssssssss</h2> -->
      <div class="moble_logo">
        <a href="/">
          <img src="https://s2.ax1x.com/2020/01/05/lDpJ9x.png" alt="">
        </a>
      </div>

      <div class="moble_btn">
        <span v-if="isLogin" class="moble_avater">
          <img @click="personal" :src="avater" alt="" width="100%" height="100%">
          <!-- 开始  个人设置 -->
          <div v-show="showSetting" class="person-setting">
            
                <router-link @click.native="showSetting = false" to="/blog/user/setting">修改头像</router-link>

          </div>
        </span>
        <span @click="logout" v-if="isLogin">
          注销
        </span>
        <span v-if="!isLogin" @click="linkLogin(0)">登陆</span>
        <span v-if="!isLogin" @click="linkLogin(1)">注册</span>
        <span @click="show_moble_nav">
          <svg class="icon" aria-hidden="true" @click="addMusic()">
            <use xlink:href="#iconicon-shuanglieliebiao"></use> 
          </svg>
        </span>
      </div>

      <div :class="{ 'is_show_moble': showMobleNav === true }" class="moble_list">
        <li v-for="(moble, m) in navList" :key="m">
          <router-link @click.native="show_moble_nav" :to="(moble.skillList.length?$route.fullPath:moble.link)">
            {{moble.span}}
            <svg v-if="moble.skillList.length !== 0" class="icon" aria-hidden="true">
              <use xlink:href="#iconxiangxia"></use> 
            </svg>
          </router-link>
          
          <div v-if="moble.skillList.length !== 0" class="skill_moble"> 
            <router-link @click.native="show_moble_nav" :to="moble.skillLink[h]" v-for="(skillMoble,h) in moble.skillList" :key="h">{{skillMoble}}</router-link>
          </div>
        </li>
      </div>

      <div @click="show_moble_nav" :class="{ 'is_show_moble': showMobleNav === true }" class="moble_mask" v-show="showMobleNav">

      </div>
    </div>
    <!-- 结束 移动端导航 -->
    
  </div>
</template>

<script>
const path = 'http://cdn.mhzgg.com/'
export default {
  name: 'top',
  props: ['isFixed'],
  data() {
    return {
      navList: [
        {
          audioSrc: path + 'nav_1.mp3',
          span: '首页',
          link: '/blog/home',
          skillList: [],
          skillLink: []
        },
        {
          audioSrc: path + 'nav_2.mp3',
          span: '前端开发',
          link: { name: 'web', query: { type: 'vue' } },
          skillList: ['vue','html','js'],
          skillLink: [
            { name: 'web', query: { type: 'vue' } },
            { name: 'web', query: { type: 'html' } },
            { name: 'web', query: { type: 'js' } }
          ]
        },
        {
          audioSrc: path + 'nav_3.mp3',
          span: '心情随笔',
          link: '/blog/moodtown',
          skillList: [],
          skillLink: []
        },
        {
          audioSrc: path + 'nav_4.mp3',
          span: 'ui设计',
          link: '/blog/works',
          skillList: [],
          skillLink: []
        },
        {
          audioSrc: path + 'nav_5.mp3',
          span: '关于博客',
          link: '',
          skillList: ['时光机','友链申请'],
          skillLink: [
            '/blog/about',
            {name: 'leaveMessage', query: {id: '5e5d0b34cb06f01a7cfb0ce5'}}
          ]
        },
        {
          audioSrc: path + 'nav_6.mp3',
          span: '关于博主',
          link: '',
          skillList: ['自我介绍','作品'],
          skillLink: [
            {name: 'leaveMessage', query: {id: '5e5cdf83cb06f01a7cfb0ce4'}},
            {name: 'leaveMessage', query: {id: '5e5cdf83cb06f01a7cfb0ce4'}}
          ]
        },
        {
          audioSrc: path + 'nav_1.mp3',
          span: '留言板',
          link: { name: 'leaveMessage', query: { id: '5e5bd6d8cb06f01a7cfb0ce0',label: '留言板' } },
          skillList: [],
          skillLink: []
        }
      ],
      liIndex: -1,
      skillIndex: -1,
      isSearch: false,      //  是否开启搜索
      isMusic: false,       //  是否开启导航钢琴模式
      offsetTop: 0,
      loginStatus: {
        val: true,
        index: 0
      },
      serachText: '',       //  搜索文本
      showMobleNav: false,
      showSetting: false
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin
    },
    avater() {
      return this.$store.state.user.avater
    },
    Index() {
      return this.$store.state.liIndex
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
    //  切换注册登陆
    linkLogin(index) {
      this.loginStatus.index = index
      this.$emit('opneLogin', this.loginStatus)
    },
    //  注销登陆
    logout() {
      this.$store.commit('remove',{
        isLogin: false
      })
      this.$router.push({
        path: '/blog/home'
      })
    },
    //  搜索
    async serach() {
      let data = {}
      data.text = this.serachText
      let res = await this.request.api_get_serach(data)
    },
    //  开启音乐
    addMusic(){
      this.isMusic = this.isMusic == true?false:true
    },
    //  播放音乐
    playMusic(i) {
      if(this.isMusic) {
        this.$refs.music[i].play()
      }
    },
    toggleLi(i) {
      this.liIndex = i
    },
    toggleSkill(i,j) {
      this.liIndex = i
      this.skillIndex = i + ',' + j
    },
    show_moble_nav() {
      this.showMobleNav = this.showMobleNav == false?true:false
      this.$store.commit('updateIsMoble', {
        isMoble: this.showMobleNav
      })
    },
    personal() {
      this.showSetting = this.showSetting == false?true:false
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  background: #fff;
  color: #767575;
  font-size: 12px;
  -webkit-box-shadow: 0 4px 4px rgba(0,0,0,.2);
  box-shadow: 0 4px 4px rgba(0,0,0,.2);
  /* 开始 联系 */
  .con{
    border-bottom: 1px solid #eee;
    position: relative;
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
      .search_con{
        width: 721px;
        margin: 40px auto;
        input{
          width: 680px;
          height: 40px;
          outline: 0;
          border: 1px solid #ddd;
          border-right: none;
          border-radius: 5px 0 0 5px;
          text-indent: 1em;
        }
        button{
          width: 40px;
          height: 40px;
          border: 1px solid #1890ff; 
          background: #1890ff;
          border-radius: 0 5px 5px 0;
          cursor: pointer;
        }
      }
    }
    .contact {
      width: 1200px;
      height: 40px;
      margin: 0 auto;
      .contact_email {
        float: left;
        width: 160px;
        height: 100%;
        border-right: 1px solid #eee;
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
      }
      .contact_phone{
        float: left;
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
      }
      .contact_social{
        float: right;
        span{
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-top:14px;
          margin-left:10px;
          cursor: pointer;
        }
      }
    }
  }
  /* 结束 联系 */

  /* 开始  导航连接 */
  .nav{
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    position: relative;
    /* logo */
    .nav_logo{
      float: left;
      width: 300px;
      height: 80px;
      .nav_logo_img{
        width: 94px;
        height: 34px;
        margin: 23px 10px 0;
        cursor: pointer;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    /* 导航 */
    ul{
      float: left;
      width: 700px;
      height: 40px;
      margin-top: 20px;
      li{
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
        a{
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
          span{
            width: 100%;
            height: 100%;
            color: black;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            &:last-child{
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
            .icon{
              font-size: 14px;
              color: #aaa;
              vertical-align: 0;
            }
          }
        }
        p{
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
        .nav_list_skill{
          display: none;
          position: absolute;
          left: 0;
          top: 58px;
          width: 90px;
          background: rgba(255,255,255,0.9);
          -webkit-box-shadow: 0 0 10px rgba(0,0,0,.2);
          box-shadow: 0 0 10px rgba(0,0,0,.2);
          z-index: 999;
          border-top: 4px solid #1890ff;
          &::before{
            height: 0;
            width: 0;
            border: 7px solid transparent;
            position: absolute;
            top: -16px;
            left: 30px;
            border-bottom-color: #1890ff;
          }
          a{
            display: block;
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #767575;
            &:hover{
              background-color: #1890ff;
              color: #fff;
              -webkit-transform: scaleX(1.05);
              transform: scaleX(1.05);
            }
          }
          a.active{
            color: #3c9eff;
          }
        }
        &:hover{
          >a{
            color: #3c9eff;
            -webkit-transform: rotateX(-89deg);
            transform: rotateX(-89deg);
            -webkit-transform: rotateX(0)\9;
            transform: rotateX(0)\9;
            margin-top: 2px;
          }
        }
        &:nth-child(2):hover{
          position: relative;
          .nav_list_skill{
            display: block;
          } 
          p{
            background: #c0ebf7;
          }
        }
        &:nth-child(2) {
          p{
            background: #c0ebf7;
          }
        }
        &:nth-child(3) {
          p{
            background: #69bcf3;
          }
        }
        &:nth-child(4) {
          p{
            background: #79d9f3;
          }
        }
        &:nth-child(5):hover{
          .nav_list_skill{
              display: block;
          } 
          p{
            background: #b9d329;
          }
        }
        &:nth-child(6) {
          p{
            background: #ffae6b;
          }
        }
        &:nth-child(6):hover{
          .nav_list_skill{
              display: block;
          } 
          p{
            background: #ffae5b;
          }
        }
        &:nth-child(7) {
          p{
            background: #c0ebf7;
          }
        }
        &:nth-child(7):hover{
          .nav_list_skill{
              display: block;
          } 
          p{
            background: #c0ebf7;
          }
        }
      }
      li.on{
        a{
          span{
            color: #3c9eff;
            svg{
              color: #3c9eff;
            }
          }
        }
      }
    }
    /* 切换成音乐状态 */
    ul.music_nav{
      li{
        p{
          -webkit-transition: height .25s;
          transition: height .25s;
          z-index: 0;
          opacity: 1;
          display: block;
        }
        &:hover{
          p{
            height: 80px;
          }
        }
      }
    }
    .nav_search{
      float: left;
      width: 200px;
      height: 100%;
      line-height: 80px;
      text-align: center;
      div{
        float: left;
      }
      .nav_search_left {
        span{
          display: inline-block;
          width: 40px;
          height: 100%;
          cursor: pointer;
          i{
            display: inline-block;
            width: 2px;
            height: 15px;
            background: #666;
            margin: 0 2px;
            &:nth-child(1) {
              animation: i_one 1s linear infinite;
            }
            &:nth-child(2) {
              animation: i_two 1s linear infinite;
            }
            &:nth-child(3) {
              animation: i_three 1s linear infinite;
            }
            &:nth-child(4) {
              animation: i_four 1s linear infinite;
            }
          }
          svg{
            font-size: 16px;
          }
        }
      }
      .nav_search_right{
        a{
          display: inline-block;
          width:60px;
          height: 100%;
          font-size: 16px;
          cursor: pointer;
          &:hover{ 
            color: #3c9eff;
          }
        }
      }
      .nav_search_my{
        width: 120px;
        position: relative;
        .my_avater{
          width: 40px;
          height: 40px;
          margin: 15px 20px 0 20px;
          img{
            border-radius: 50%;
            cursor: pointer;
          }
        }
        .person-setting{
          position: absolute;
          left: 0;
          top: 45px;
          width: 100px;
          border-radius: 4px;
          z-index: 1000;
          // ul{
          //   width: 100%;
          //   li{
          //     width: 100%;
          //     color: #fff;
          //   }
          // }
          a{
            display: inline-block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #1890ff;
            color: #fff;
          }
        }
      }
    }
    /* 结束  导航连接 */
  }

  .moble-nav{
    display: none;
  }
// .nav ul li:nth-child(6):hover .nav_list_skill{
//   display: block;
// } 

// .nav_list li i{
//   font-size: 14px;
//   margin-left: 3px;
// }
// .nav_list li:hover{
//   color: #3c9eff;
  @media screen and (max-width: 720px){
    .con{
      display: none;
    }

    .nav{
      display: none;
    }

    .moble-nav{
      height: 60px;
      display: block;
      position: relative;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;

      .moble_logo{
        width: 200px;
        height: 100%;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
          img{
            margin-top: 10px;
          }
        }
      }

      .moble_btn{
        line-height: 60px;
        span{
          display: inline-block;
          // height: 40px;
          margin-right: 10px;
          font-size: .4rem;
          &:last-child{
            margin-right: 0;
          }
        }
        .moble_avater{
          display: inline-block;
          position: relative;
          // margin-top: 10px;
          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .person-setting{
            position: absolute;
            left: 0;
            top: 60px;
            width: 100px;
            z-index: 1000;
            background: #06aaff;
            a{
              display: inline-block;
              width: 100%;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: #fff;
            }
          }
        }
        .icon{
          font-size: 20px;
        }
      }

      .moble_list{
        position: fixed;
        top: 60px;
        right: 0;
        width: 160px;
        height: -webkit-calc(100% - 60px);
        height: calc(100% - 60px);
        padding: 0 20px;
        -webkit-transition: .5s;
        transition: .5s;
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
        z-index: 1000;
        background: #69bcf3;
        li{
          width: 100%;
          a{
            display: inline-block;
            font-size: .4rem;
            color: #fff;
            height: 40px;
            line-height: 40px;
          }
          div{
            width: 100%;
            padding-left: 20px;
            box-sizing: border-box;
            a{
              display: inline-block;
              width: 100%;
              height: 40px;
            }
          }
        }
      }

      .moble_list.is_show_moble{
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }

      .moble_mask{
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        opacity: 0;
        z-index: -1;
      }

      .moble_mask.is_show_moble{
        opacity: 1;
        z-index: 999;
      }

    }
    
  }
}

.is_fixed{
  position: fixed;
  top: 0;
  z-index: 999;
}

.is_fixed .con{
  display: none;
}

@keyframes i_one {
  from{ height: 2px; }
  to{ height: 15px; }
}

@keyframes i_two {
  from{ height: 15px; }
  to{ height: 2px; }
}

@keyframes i_three {
  from{ height: 4px; }
  to{ height: 15px; }
}

@keyframes i_four {
  from{ height: 15px; }
  to{ height: 4px; }
}

</style>
