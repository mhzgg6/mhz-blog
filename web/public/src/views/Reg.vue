<template>
  <div class="login">
    <!-- 左下角圆 -->
    <div class="left_round"></div>
    <!-- 右上角三角形 -->
    <div class="left_triangle"></div>
    <!-- 主体内容 -->
    <div class="con">
      <!-- 左边登陆部分 -->
      <div class="con_left">
        <div class="con_left-logo"></div>
        <div class="con_left-square"></div>
        <div class="con_left-rect"></div>
        <div class="con_left-round"></div>
        <div class="con_left-triangle"></div>
        <div class="con_left-main">
          <p>欢迎回来</p>
          <p>为保持与我们的联系</p>
          <p>请登陆您的个人账号</p>
          <div>
            <router-link to="/">
              <button >登陆</button>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 右边注册部分 -->
      <div class="con_right">
        <div class="con_right-main">
          <p>欢迎注册</p>
          <div class="connact">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconweixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconweixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconweixin"></use>
            </svg>
          </div>
          <p>或者使用您的邮箱进行注册</p>
          <div class="item">
            <div class="item_name">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#iconnavicon-grkh"></use>
              </svg>
              <input type="text" placeholder="用户名" v-model="username">
            </div>
          </div>
          <div class="item">
            <div class="item_password">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#iconmima"></use>
              </svg>
              <input type="text" placeholder="密码" v-model="password">
            </div>
          </div>
          <div class="item">
            <div class="item_email">
              <svg class="icon tip" aria-hidden="true">
                <use xlink:href="#icontubiao209"></use>
              </svg>
              <input type="text" placeholder="邮箱" v-model="email">
            </div>
          </div>
          <div class="item">
            <button @click="registered()">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//  对密码进行加密
import {api_post_reg} from '../assets/axios/index'
const encrypt = require('../../unit/crypto')
export default {
  name: 'reg',
  data() {
    return{
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    async registered() {
      //  用户数据
      let userData = {}
      userData.username = this.username
      userData.password = this.username
      userData.email = this.email

      let data = await this.request.api_post_reg(userData)
      // let data = await this.request.api_get_index()
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background: #eff3f2;
  position: relative;
  overflow: hidden;
  .left_round{
    position: absolute;
    left: -150px;
    bottom: -100px;
    width: 300px;
    height: 300px;
    background: #facb42;
    border-radius: 50%;
  }
  .left_triangle{
    position: absolute;
    right: -80px;
    top: 4%;
    width:0;
    height:0;
    border-top:75px solid transparent;
    border-bottom:340px solid transparent;
    border-right:600px solid #e35e6a;
    transform:rotate(-22deg);
    -ms-transform:rotate(-22deg); 	/* IE 9 */
    -moz-transform:rotate(-22deg); 	/* Firefox */
    -webkit-transform:rotate(-22deg); /* Safari 和 Chrome */
    -o-transform:rotate(-22deg); 	/* Opera */
  }
  .con{
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    position: absolute;
    top: 60px;
    left: 20px;
    background: skyblue;
    border-radius: 10px;
    display: flex;
    .con_left{
      width: 40%;
      height: 100%;
      background: -webkit-linear-gradient(#3bb19f, #51c9a5); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#3bb19f, #51c9a5); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#3bb19f, #51c9a5); /* Firefox 3.6 - 15 */
      background: linear-gradient(#3bb19f, #51c9a5); /* 标准的语法 */
      border-radius: 10px 0 0 10px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .con_left-logo{
        position: absolute;
        left: 20px;
        top: 20px;
        width: 90px;
        height: 40px;
        background: url('../assets/sign_in/logo.png') no-repeat;
      }
      .con_left-square{
        position: absolute;
        right: 70px;
        top: 60px;
        width: 70px;
        height: 70px;
        background: #4cb7a7;
        transform:rotate(36deg);
        -ms-transform:rotate(36deg); 	/* IE 9 */
        -moz-transform:rotate(36deg); 	/* Firefox */
        -webkit-transform:rotate(36deg); /* Safari 和 Chrome */
        -o-transform:rotate(36deg); 	/* Opera */
      }
      .con_left-rect{
        position: absolute;
        right: 150px;
        top: 70%;
        width: 70px;
        height: 20px;
        background: rgba(102,207,180,0.7);
        transform:rotate(70deg);
        -ms-transform:rotate(70deg); 	/* IE 9 */
        -moz-transform:rotate(70deg); 	/* Firefox */
        -webkit-transform:rotate(70deg); /* Safari 和 Chrome */
        -o-transform:rotate(70deg); 	/* Opera */
      }
      .con_left-triangle{
        position: absolute;
        right: -22px;
        top: 37%;
        width:0;
        height:0;
        border-top:67px solid transparent;
        border-bottom:8px solid transparent;
        border-right:100px solid rgba(102,207,180,0.6);
        transform:rotate(-22deg);
        -ms-transform:rotate(-22deg); 	/* IE 9 */
        -moz-transform:rotate(-22deg); 	/* Firefox */
        -webkit-transform:rotate(-22deg); /* Safari 和 Chrome */
        -o-transform:rotate(-22deg); 	/* Opera */
      }
      .con_left-round{
        position: absolute;
        left: -170px;
        bottom: -160px;
        width: 300px;
        height: 300px;
        background: rgba(113,214,185,0.7);
        border-radius: 50%;
      }
      .con_left-main{
        width: 100%;
        height: 40%;
        > p{
          text-align: center;
          line-height: 30px;
          color: #fff;
          &:nth-child(1){
            font-size: 40px;
            line-height: 60px;
          }
        }
        > div{
          width: 100%;
          margin-top: 20px;
          text-align: center;
          button{
            width: 35%;
            height: 40px;
            color: #fff;
            display: inline-block;
            border-radius: 20px;
            border: 2px solid #fff;
            background: transparent;
            cursor: pointer;
          }
        }
      }
    }
    .con_right{
      width: 60%;
      height: 100%;
      background: #fff;
      border-radius: 0 10px 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .con_right-main{
        width: 100%;
        height: 80%;
        text-align: center;
        > p{
          color: #3aaf9f;
          line-height: 40px;
          &:nth-child(1){
            font-size: 40px;
            line-height: 60px;
          }
        }
        .item{
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          > div{
            width: 45%;
            position: relative;
            margin: 0 auto;
            > input{
              width: 100%;
              height: 40px;
              border: none;
              border-radius: 10px;
              background: #eff3f2;
              text-indent: 3rem;
            }
            .tip{
              position: absolute;
              left: 10px;
              top: 8px;
              width: 1.5rem;
              height: 1.5rem;
            }
          }
          > button{
            width: 35%;
            height: 40px;
            color: #fff;
            line-height: 40px;
            background: #71d6b9;
            border: none;
            border-radius: 25px;
            cursor: pointer;
          }

        }
        .connact{
          width: 100%;
          height: 100px;
          line-height: 100px;
          margin: 0;
          .icon{
            width: 2.5rem;
            height: 2.5rem;
            &:nth-child(2){
              padding: 0 20px;
            }
          }
        }
      }
    }
  }
}
</style>
