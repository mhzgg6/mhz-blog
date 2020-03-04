<template>
  <div class="component_a">
    <button @click="handleEmitEvent">出发自定义事件</button>
    <button @click="handleDispatchEvent">dispatch和broadcast</button>
  </div>
</template>

<script>
export default{
  props: {
  },
  inject: ['name'],
  data() {
    return{
      title: 'Component-A'
    }
  },
  methods: {
    sayHello() {
      window.alert('hello!!!!!!')
    },
    handleEmitEvent() {
      this.$emit('test', 'send hello')
    },
    handleDispatchEvent() {
      this.$dispatch('name', 'dispatch和broadcast')
    },
    showMsg(text) {
      window.alert(text)
    }
  },
  created() {
    this.$on('on-msg', this.showMsg)
  },
  mounted() {
    console.log(this.name)
  },
}
</script>

<style lang="scss" scoped>
.component_a{
  width: 100%;
  height: 100px;
  background: skyblue;
}
</style>