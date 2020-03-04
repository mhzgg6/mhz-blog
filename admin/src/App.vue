<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mixins_user from '../unit/article'
export default {
  name: 'app',
  mixins: [mixins_user],
  data() {
    return{
      
    }
  },
  mounted() {

  },
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
input,button{
  outline: none;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
