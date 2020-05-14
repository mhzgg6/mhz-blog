<template>
  <div class="admin_index">
    index
    <button @click="add_friend_link">添加友链</button>
    <!-- <button @click="add_time_machines">添加历程</button> -->
  </div>
</template>

<script>
export default {
  name: 'admin_index',
  data() {
    return{

    }
  },
  methods: {
    //  添加友情链接
    async add_friend_link() {
      const data = {}
      data.name = '水水水水'
      data.icon = 'https://s2.ax1x.com/2020/01/12/lIbNd0.png'
      data.link = 'mhzgg.com'

      let res = await this.request.api_post_link(data)
      console.log(res)
    },
    //  添加友情链接
    async add_time_machines() {
      const data = {}
      data.content = '网站PC端不再主动性提供登录登录注册快捷按钮，如需注册，用户可通过移动端访问网站——至左侧边栏——登录/注册，当然，你也可直接访问登录注册 '
      data.author = this.$store.state.user._id
      let res = await this.request.api_post_time(data)
      console.log(res)
    }
  }
}
</script>

<style lang="less">
.admin_index{
  width: 100%;
  height: 100%;
}
</style>
