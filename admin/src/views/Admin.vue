<template>

    <!-- <el-container>
      开始 侧边栏
      <el-aside>
        <left-nav></left-nav>
      </el-aside>
      结束 侧边栏

      开始 右边内容
      <el-container>
        开始 内容导航
        <el-header>
          <top-info></top-info>
        </el-header>
        结束 内容导航

        开始 内容部分
        <el-main>
          <router-view></router-view>
        </el-main>
        结束 内容部分
      </el-container>
      结束 右边内容
    </el-container> -->

  <a-layout class="admin-content">

    <!-- 侧边栏部分  开始 -->
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <left-nav></left-nav>
    </a-layout-sider>
    <!-- 侧边栏部分  结束 -->

    <!-- 右侧内容部分  开始 -->
    <a-layout>

      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <!-- <top-info></top-info> -->
      </a-layout-header>

      <!-- 内容部分  开始 -->
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
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
    /deep/.ant-layout-header{
      height: 60px;
      // color: @error-color;
    }
  }
}
</style>
