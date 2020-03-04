<template>
  <div class="m-input">
    <i-form></i-form>
  </div>
</template>

<script>
export default{
  data() {
    return{
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.m-input{
  width: 100%;
  height: 100px;
}
</style>