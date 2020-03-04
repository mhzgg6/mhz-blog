<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import mouseClick from '../unit/mouseClick'
export default{
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.clearfix{
  clear: both;
  display: block;
  content: '';
}

.fl{
  float: left;
}

li{
  list-style: none;
}

a{
  text-decoration: none;
}

input{
  outline: none;
}

.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}

// html{
//   width: 100%;
//   height: 100%;
//   overflow-y: auto;
//   overflow-x: hidden;
// }

// body{
//   width: 100vw;
//   height: 100%;
//   overflow: y;
// }
html {//  解决切换页面滚动条消失  页面抖动的问题
  overflow-y: scroll;
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
:root body {
  position: absolute;
}
body {
  width: 100vw;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }

::selection {
    background: #8999c4;
    text-shadow: none;
    color: #fff
}

::-webkit-scrollbar {//滚动条背景
    width: 5px;
    height: 5px;
    background: #e4e4e4;
}

// ::-webkit-scrollbar-button {
//     display: none
// }

::-webkit-scrollbar-track {
    background-color: black
}

::-webkit-scrollbar-track-piece {
    background: #FFF
}

::-webkit-scrollbar-thumb {//滚动部分
    border-radius: 10px;
    background-color: #1890ff;
    background-image: -webkit-linear-gradient(45deg,hsla(0,0%,100%,.2) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.2) 0,hsla(0,0%,100%,.2) 75%,transparent 0,transparent);
}

// ::-webkit-scrollbar-thumb:hover {
//     background-color: #3b3b3b
// }

::-webkit-scrollbar-corner {
    background-color: #535353
}

// ::-webkit-scrollbar-resizer {
//     background-color: #ff6e00
// }
</style>
