<template>
  <div class="admin">

    <el-container>
      <!-- 开始 侧边栏 -->
      <el-aside>
        <left-nav></left-nav>
      </el-aside>
      <!-- 结束 侧边栏 -->

      <!-- 开始 右边内容 -->
      <el-container>
        <!-- 开始 内容导航 -->
        <el-header>
          <top-info></top-info>
        </el-header>
        <!-- 结束 内容导航 -->

        <!-- 开始 内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 结束 内容部分 -->
      </el-container>
      <!-- 结束 右边内容 -->
    </el-container>



    <!-- <router-view/> -->
  </div>
</template>

<script>
import LeftNav from '../components/LeftNav'
import TopInfo from '../components/TopInfo'
export default {
  name: 'admin',
  data() {
    return{

    }
  },
  components: {
    LeftNav,
    TopInfo
  }
}
</script>

<style lang="scss">
.el-container{
  width: 100%;
  height: 100%;
  // 侧边栏
  .el-aside{
    width: 300px;
    background: skyblue;
  }
  // 主体内容部分
  .el-container{
    background: #eee;
    // 头部
    .el-header{
      background: skyblue;
    }
  }
}
</style>

<style lang="scss" scoped>
.admin{
  width: 100%;
  height: 100%;
}
</style>
