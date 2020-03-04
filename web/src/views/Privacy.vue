<template>
  <div class="privacy">
    <div class="privacy_con">
      <h1>博客用户协议</h1>
      <h3 @click="linkIndex"><strong>←</strong>返回博客</h3>
      <p>更新日期：2020-2-25</p>
      <p>生效日期：2020-2-2</p>
      <h4>1、协议</h4>
      <p>第一!绝对不意气用事!</p>
      <p>第二!绝对不漏判任何一件坏事!</p>
      <p>第三!绝对裁判的公正漂亮!</p>
      <p>裁判机器人蜻蜓队长前来进见!这场争夺战由我来做裁判!蜻蜓队长豪马灯!</p>
    </div>
  </div>
</template>

<script>
export default{
  name: 'privacy',
  data() {
    return {
    }
  },
  methods: {
    linkIndex() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss">
.privacy{
  width: 100%;
  .privacy_con{
    width: 1200px;
    margin: 0 auto;
    h1{
      text-align: center;
      line-height: 60px;
    }
    h3{
      cursor: pointer;
      color: blue;
    }
    h4{
      line-height: 30px;
      font-size: 16px;
    }
    p{
      line-height: 30px;
      margin: 15px 0;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 720px){
    .privacy_con{
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
