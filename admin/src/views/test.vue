<template>
  <div class="test">
    <button @click="handleClickDispatch">触发自实现</button>
    test
    <el-button size="large" @my-click="handleClick"></el-button>
    组件a
    <component-a ref="comA" @test='handleEvent'></component-a>
  </div>
</template>

<script>
import ElButton from '../components/ElButton'
import ComponentA from '../components/ComponentA'
import Emitter from '../../unit/emiter'
export default{
  mixins: [Emitter],
  provide: {
    name: 'Mao'
  },
  data() {
    return{
    }
  },
  components: {
    ElButton,
    ComponentA
  },
  methods: {
    handleClick() {
      console.log('父组件')
    },
    handleEvent(text) {
      console.log(text)
    },
    handleDispatch() {

    },
    handleBroadcast() {

    },
    handleClickDispatch() {
      this.broadcast('ComponentA', 'on-msg', 'hello world!!!')
    }
  },
  mounted() {
    // const comA = this.$refs.comA
    // console.log(comA.title)
    // comA.sayHello()
    this.$on('name', res => {
      alert(res)
    })
  },
}
</script>

<style lang="less" scoped>
.test{
  width: 100%;
  height: 100%;
}
</style>