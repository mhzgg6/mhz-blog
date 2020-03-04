<template>
  <div class="footer">
    <div class="con">
      <div class="content">

        <div class="item">
          <h4>老毛~博客</h4>
          <p>Hi~欢迎访问我的个人博客！</p>
          <p>你可以通过一下方式联系我！</p>
          <div class="item_icon">
            <div class="item_icon_info">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconQQ"></use>
              </svg>
              <div>
                <img src="../assets/bottom/qq.jpg" alt="" width="100%" height="100%">
              </div>
            </div>
            <div class="item_icon_info">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconweixin"></use> 
              </svg>
              <div>
                <img src="../assets/bottom/wx.jpg" alt="" width="100%" height="100%">
              </div>
            </div>
            <div class="item_icon_info">
              <a target="_blank" href="https://github.com/mhzgg6">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icongithubb"></use> 
                </svg>
              </a>
            </div>
            
          </div>
        </div>

        <div class="item">
          <h4>Languages</h4>
          <ul>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconh5"></use> 
              </svg>
              <span>HTML5</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconcss"></use> 
              </svg>
              <span>CSS</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconjs"></use> 
              </svg>
              <span>JaveScript</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconVue"></use> 
              </svg>
              <span>Vue</span>
            </li>
          </ul>
        </div>

        <div class="item">
          <h4>Dreams</h4>
          <ul>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icontouxiang"></use> 
              </svg>
              <span>成为一名优秀的程序员</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon50"></use> 
              </svg>
              <span>赚很多money</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconfeiji"></use> 
              </svg>
              <span>环游世界</span>
            </li>
          </ul>
        </div>

        <div class="item">
          <h4>Interests</h4>
          <ul>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconlanqiu"></use> 
              </svg>
              <span>生活的一部分</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconhuahua"></use> 
              </svg>
              <span>静下心来勾勒世界</span>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconfenlei-yingxionglianmeng"></use> 
              </svg>
              <span>曾经是个王者，后来...</span>
            </li>
          </ul>
        </div>

      </div> 
    </div>  

    <div class="count">
      @copyright2019 | 网站运行：200天05小时30分05秒<br>
      渝ICP备18008587号-1
    </div>     
  </div>
</template>

<script>
export default {
  name: 'bottom'
}
</script>

<style lang="scss" scoped>
.footer{
  width: 100%;
  background: #f3f6fd;
  font-size: .36rem;

  .con{
    width: 1200px;
    height: 400px;
    margin: 0 auto;
    background: url("../assets/bottom/bottom.png") no-repeat;
    background-position: center 200px;

    .content{
      width: 1140px;
      padding-top: 40px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .item{
        width: 260px;
        // height: 200px;
        color: #323232;

        h4{
          height: 40px;
          line-height: 40px;
          text-indent: 2em;
          font-size: 18px;
        }

        p{
          line-height: 30px;
          font-size: 14px;
        }

        .item_icon{
          margin-top: 20px;
          position: relative;
          .item_icon_info{
            display: inline-block;
            position: relative;
            svg{
              &:hover{
                color: red;
                + div{
                  display: block;
                  animation: showInfo .5s;
                  animation-fill-mode: forwards;
                }
              }
            }
            >div{
              display: none;
              width: 200px;
              position: absolute;
              left: 20px;
              top: -280px;
              z-index: 2;
              transition: opacity .3s .3s;
              opacity: 0;
              transition-delay: 0; 
            }
            svg{
              font-size: 30px;
              margin-left: 20px;
              cursor: pointer;
            }
          }
        } 

        ul{
          width: 100%;

          li{
            height: 32px;
            margin-left: 2em;
            font-size: 14px;

            svg{
              font-size: 18px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .count{
    color: #323232;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }

  @media screen and (max-width: 720px){
    // background: #323232;
    .con{
      width: 100%; 
      height: 7rem;
      padding: 0 20px;
      box-sizing: border-box;
      background-size: 100%;
      .content{
        width: 100%;
        flex-wrap: wrap;
        .item{
          display: none;
          &:nth-child(1) {
            display: block;
            width: 100%;
            text-align: center;
          }
        }
      }
    }

    .count{
      font-size: .32rem;
    }
  }
}
@keyframes showInfo{
  from{ opacity: 0; }
  to{ opacity: 1; }
} 
</style>
