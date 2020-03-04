<template>
  <div id="index" @mouseenter="el_enter" @mousemove="el_move" @mousedown="isAdd && add_progress($event)">
    <div class="index_con">
      <div class="load_text" v-show="!isShow">Welcome My Blog</div>
      <div class="snow" v-for="(item, i) in arr" :key="i"></div>
      <div class="con" v-show="isShow">
        <div class="nav_logo">
          <img src="../assets/top/logo.png" alt="">
        </div>
        <div class="nav_link">
          <router-link to="/blog/home">HOME</router-link>
        </div>
      </div>
      <div class="nav" v-show="isShow" :style="{backgroundImage: 'url(' + bgSrc + ')'}">
        <p class="staggered-rise-in">I’m a multidisciplinary programmer based in Chongqing, focused on Web</p>
        <p class="staggered-rise-in">H5/Web Design。</p>
      </div>

      <div class="bottom" v-show='isShow'>
        <div class="process">
          <div class="process_item" :style="'width:' + wLength + '%'"></div>
        </div>
      </div>
    </div>
    <!-- 开始 鼠标交互-->
    <div v-show="isShow" class="cursor cursor-a" ref="cursor_a"></div>
    <div v-show="isShow" class="cursor cursor-b" ref="cursor_b">
      <div class="cursor-v" :class="[turnCursor == true?'scale_down':'scale_up']"></div>
      <div class="badge">
        <h1 class="text-cursor" :class="[turnCursor == true?'unshow':'show']" style="transition: all 1000ms ease-out;">
          <span class="char" v-for="(letter,index) in letterArr" :key="index" :class="'char'+index">{{letter}}</span>
        </h1>
      </div>
    </div>
    <!-- 结束 鼠标交互 -->
  </div>
</template>

<script>
export default{
  name: 'index',
  data() {
    return {
      isShow: false,
      timer: null,
      timer1: null,
      wLength: 0,      // 进度条长度
      x: 0,
      y: 0,
      initX: 0,        // 鼠标初始位置
      initY: 0,        // 鼠标初始位置
      isAdd: false,    //  是否添加背景切换
      turnCursor: false,   // 鼠标是否按下
      bgSrc: 'http://cdn.mhzgg.com/index-blue.png',
      arrBg: [
        'http://cdn.mhzgg.com/index-pink.png',
        'http://cdn.mhzgg.com/index-orange.png',
        'http://cdn.mhzgg.com/index-dark-blue.png'
      ],
      letterArr: ["C","l","i","c","k","","&","","H","o","l","d"],
      arr: []
    }
  },
  methods: {
    //  首屏字母
    showText() {
      //3s
      this.timer = setTimeout(() => {
        this.isShow = true
        this.isAdd = true
        let staggeredRiseInTexts = document.querySelectorAll(".staggered-rise-in");
        staggeredRiseInTexts.forEach(text => {
          let letters = text.textContent.split("");
          text.textContent = ""
          letters.forEach((letter, i) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.style.animationDelay = `${i / 20}s`;
            text.append(span)
          })
        })
      },3000)
    },
    //  切换背景
    add_progress(e) {
      e.preventDefault()
      var curX = e.clientX
      var curY = e.clientY 

      document.onmousedown = () => {
        this.turnCursor = true

        if(this.wLength <= 100) {
          this.timer1 = setInterval(() => {
            this.wLength += .5

            if(this.wLength == 25) {
              this.bgSrc = this.arrBg[0]
            }else if(this.wLength == 50) {
              this.bgSrc = this.arrBg[1]
            }else if(this.wLength == 75) {
              this.bgSrc = this.arrBg[2]
            }
            else if(this.wLength == 100) {
              clearInterval(this.timer1)
              this.$router.push({
                path: '/blog/home'
              })
              return
            }
          },50)
        }
      }
      
      document.onmousemove = (e) => {
        // curX = e.clientX
        // curY = e.clientY
        // if(this.wLength < 100) {
        //   this.$refs.cursor_a.style.left = curX + 'px'
        //   this.$refs.cursor_a.style.top = curY + 'px'
        //   this.$refs.cursor_b.style.left = curX + 'px'
        //   this.$refs.cursor_b.style.top = curY + 'px'
        // }
      }

      document.onmouseup = (e) => {
        document.onmousedown = null
        document.onmousemove = null
        this.turnCursor = false

        clearInterval(this.timer1)
      }

    },
    cursor_follow(x, y) {
      this.$refs.cursor_a.style.left = x + 'px'
      this.$refs.cursor_a.style.top = y + 'px'
      this.$refs.cursor_b.style.left = x + 'px'
      this.$refs.cursor_b.style.top = y + 'px'
    },
    el_enter(e) {
      this.initX = e.clientX
      this.initX = e.clientY
      this.cursor_follow(this.initX,this.initY)
    },
    el_move(e) {
      this.initX = e.clientX
      this.initY = e.clientY
      this.cursor_follow(this.initX,this.initY)
    }
  },
  created() {
    this.arr.length = 199
  },
  mounted() {
    this.showText()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    clearInterval(this.timer1)
  },
}
</script>

<style lang="scss" scoped>
@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}
#index{
  width: 100%;
  height: 100vh;
  color: #fff;
  background-color: #03030c;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  cursor: none;
  filter: drop-shadow(0 0 10px white);
  .index_con{
    position: relative;
    .load_text {
      position: absolute;
      top: 50%;
      width: 100%;
      line-height: 60px;
      text-align: center;
      font-size: 1rem;
      font-family: Lato, sans-serif;
      letter-spacing: 4px;
      text-transform: uppercase;
      background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 100%);
      background-size: 80%;
      background-repeat: no-repeat;
      // below two lines create text gradient effect
      color: transparent;
      background-clip: text;
      animation: shining 3s linear 1;
      animation-fill-mode: forwards;
    }
    .snow {
      $total: 200;
      position: absolute;
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;

      @for $i from 1 through $total {
        $random-x: random(1000000) * 0.0001vw;
        $random-offset: random_range(-100000, 100000) * 0.0001vw;
        $random-x-end: $random-x + $random-offset;
        $random-x-end-yoyo: $random-x + ($random-offset / 2);
        $random-yoyo-time: random_range(30000, 80000) / 100000;
        $random-yoyo-y: $random-yoyo-time * 100vh;
        $random-scale: random(10000) * 0.0001;
        $fall-duration: random_range(10, 30) * 1s;
        $fall-delay: random(30) * -1s;

        &:nth-child(#{$i}) {
          opacity: random(10000) * 0.0001;
          transform: translate($random-x, -10px) scale($random-scale);
          animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
        }

        @keyframes fall-#{$i} {
          #{percentage($random-yoyo-time)} {
            transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
          }
          
          to {
            transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
          }
        }
      }
    }

    width: 1200px;
    height: 100%;
    .con{
      width: 100%;
      height: 60px;
      padding-top: 40px;
      display: flex;
      .nav_logo{
        width: calc(100% - 100px);
        img{
          margin-top: 10px;
        }
      }
      .nav_link{
        width: 100px;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        a{
          color: #fff;
          font-size: 20px;
        }
      }
    } 
    .nav{
      height: calc(100% - 100px);
      // height: 600px;
      background-size: 100%;
      background-position: 90%;
      background-repeat: no-repeat;
      overflow: hidden;
      p{
        font-size: 20px;
        text-align: center;
        line-height: 40px;
      }
      .staggered-rise-in {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        white-space: pre;
        overflow: hidden;

        > span {
          transform: translateY(100%);
          animation: rise-in 1s forwards;
        }
      }
    }

    .bottom{
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      // height: 100px;
      .process{
        width: 1000px;
        height: 5px;
        margin-left: 100px;
        background: rgba(255,255,255,.1);
        .process_item{
          // width: 100px;
          height: 100%;
          background: #fff;
        }
      }
    }
  }

  .cursor{
    position: fixed;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    z-index: 1000;
    .cursor-v{
      width: 38px;
      transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform, 0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
      height: 38px;
      border-radius: 100%;
      border-style: solid;
      border-width: 1px;
      border-color: white
    }
    .cursor-v.scale_down{
      transform: scale(.7)
    }
    .cursor-v.scale_up{
      transform: scale(1)
    }
    .badge{
      // visibility: hidden;
      margin-top: -204px;
      margin-left: -83.5px;
      position: relative;
      width: 414px;
      transform: rotate(-50deg);
      .text-cursor{
        .char{
          color: white;
          // font: 14px Larsseit, sans-serif;
          font-size: 14px;
          height: 39px;
          position: absolute;
          width: 0px;
          left: 0;
          top: 0;
          transform-origin: bottom center;
        }
        .char0{
          transform: rotate(-5deg);
        }
        .char1{
          transform: rotate(17deg);
        }
        .char2{
          transform: rotate(27deg);
        }
        .char3{
          transform: rotate(37deg);
        }
        .char4{
          transform: rotate(56deg);
        }
        .char5{
          transform: rotate(83deg);
        }
        .char6{
          transform: rotate(82deg);
        }
        .char7{
          transform: rotate(105deg);
        }
        .char8{
          transform: rotate(111deg);
        }
        .char9{
          transform: rotate(134deg);
        }
        .char10{
          transform: rotate(153deg);
        }
        .char11{
          transform: rotate(164deg);
        }
      }
      .text-cursor.show{
        display: block;
        opacity: 1;
      }
      .text-cursor.unshow{
        display: none;
        opacity: 0;
      }
      
    }
  }
  .cursor-a{
    position: fixed;
    background-color: #5C6AFF;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    z-index: 10000;
    transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform, 0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
    user-select: none;
    pointer-events: none;
    z-index: 100000000;
    transform: scale(1);
  }
  .cursor-b{
    position: fixed;
    transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform, 0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
    user-select: none;
    pointer-events: none;
    z-index: 10000000;
    transform: translate(-14px, -14px);
  }
  
  @media screen and (max-width: 720px){
    .index_con{
      .con{
        padding-top: 0px;
        .nav_logo{
          img{
            margin-left: 20px;
          }
        }
      }
      .nav{
        width: 100%;
        height: calc(100% - 60px);
        background-size: 185%;
        background-position: 90%;
        p{
          padding: 0 20px;
          box-sizing: border-box;
        }
        .staggered-rise-in{
          width: 100%;
        }
      }
      .bottom{
        display: none;
      }
    }
    .cursor{
      display: none;
    }
  }
}
@keyframes shining {
  from {
    background-position: -500%;
  }
  to {
    background-position: 500%;
  }
}

@keyframes rise-in {
  to {
    transform: translateY(-12%);
  }
}
</style>
