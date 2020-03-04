<template>
  <div class="hello">
    <div class="user">
      <input type="text" v-model="username">
    </div>
    <div class="password">
      <input type="password" v-model="password">
    </div>
    <div class="submit"> 
      <button @click="reg">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return{
      username: '',
      password: ''
    }
  },
  methods: {
    //  注册
    reg() { 
      const data = {}
      data.username = this.username
      data.password = this.password
      this.$axios.post('http://localhost:3000/reg',data)
        .then(data => {
          console.log(data)
        })
        .catch(err => {

        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  > div{
    margin: 20px 0;
  }
}
</style>
