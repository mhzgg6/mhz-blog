<template>
  <div class="top_info">
    <div class="header_right">
      <a href="">
        <a-icon type="message" />
      </a>
      <span>
        {{username}}
      </span>
      <span>
        <img :src="avater" alt="" width="100%" height="100%">
      </span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue';
export default {
  name: 'top_info',
  data() {
    return{

    }
  },
  components: {
    AIcon: Icon
  },
  computed: {
    avater() {
      return this.$store.state.user.avater
    },
    username() {
      return `你好，${this.$store.state.user.username}` 
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.top_info{
  width: 100%;
  height: 100%;
  .header_right{
    float: right;
    height: 100%;
    padding-right: 32px;
    span{
      display: inline-block;
      margin-left: @content-padding-v;
      height: 100%;
      &:nth-child(1) {
        width: 60px;
        height: 60px;
      }
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 10px;
        vertical-align: top;
      }
    }
  }
}
</style>
