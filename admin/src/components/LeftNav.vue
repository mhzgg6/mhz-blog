<template>
  <div class="left_nav">
    <!-- 开始 logo -->
    <div class="logo">
      logo
    </div>
    <!-- 结束 logo -->
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1">
        <a-icon type="user" />
        <router-link to="/admin">首页</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera" />
        <span>nav 2</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>文章</span></span>
        <a-menu-item key="5">
          <router-link to="/admin/articlList">文章列表</router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/admin/editArticle">添加文章</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue';
export default {
  name: 'left_nav',
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    ASubMenu: Menu.SubMenu
  },
  data() {
    return{

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.left_nav{
  width: 100%;
  height: 100%;
  .logo{
    width: 100%;
    height: 60px;
    background: @black;
  }
  /deep/.ant-menu{
    /deep/.ant-menu-item{
      a{
        display: inline-block;
        width: calc(100% - 20px);
      }
    }
  }
}
</style>
