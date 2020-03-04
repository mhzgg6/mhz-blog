<template>
  <div class="left_nav">
    <!-- 开始 logo -->
    <div class="logo">
      logo
    </div>
    <!-- 结束 logo -->
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/admin/index">主页</router-link>
        </span>
      </el-menu-item>
      
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">文章</span>
        </template>
        <el-menu-item index="2-1">
          <router-link to="/admin/articlList">文章列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/admin/editArticle">添加文章</router-link>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
<!-- 
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'left_nav',
  data() {
    return{

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss">
.left_nav{
  width: 100%;
  height: 100%;
  .logo{
    width: 100%;
    height: 60px;
    background: greenyellow;
  }

}
</style>
