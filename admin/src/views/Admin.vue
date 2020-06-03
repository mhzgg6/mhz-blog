<template>
  <a-layout class="admin-content">

    <!-- 侧边栏部分  开始 -->
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <left-nav></left-nav>
    </a-layout-sider>
    <!-- 侧边栏部分  结束 -->

    <!-- 右侧内容部分  开始 -->
    <a-layout>

      <a-layout-header style="background: #fff; padding: 0">
        <!-- <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        /> -->
        <top-info></top-info>
      </a-layout-header>

      <!-- 内容部分  开始 -->
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <!-- 内容部分  结束 -->

    </a-layout>
    <!-- 右侧内容部分  结束 -->

  </a-layout>
</template>

<script>
import { Layout, Menu, Icon } from 'ant-design-vue';
import LeftNav from '../components/LeftNav';
import TopInfo from '../components/TopInfo';
export default {
  name: 'admin',
  data() {
    return{
      collapsed: false
    }
  },
  components: {
    ALayout: Layout,
    ALayoutSider: Layout.Sider,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    LeftNav,
    TopInfo
  }
}
</script>

<style lang="less" scoped>
.admin-content{
  height: 100%;
  /deep/.ant-layout{
    min-width: 1000px;
    /deep/.ant-layout-header{
      height: 60px;
      // color: @error-color;
    }
    /deep/.ant-layout-content{
      background-color: @white;
      margin: @padding-xs;
      // padding: 0 @padding-lg;
    }
  }
}
</style>
