<template>
  <div class="top_info">
    <el-row>
      <el-col :span="4">
      </el-col>
      <el-col :span="20">
        <!-- 头像 -->
        <span class="avater">
          <img :src="avater" alt="" width="100%" height="100%">
        </span>
        
        <el-dropdown>
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'top_info',
  data() {
    return{

    }
  },
  computed: {
    avater() {
      return this.$store.state.user.avater
    },
    username() {
      return this.$store.state.user.username 
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.top_info{
  width: 100%;
  height: 100%;
  .el-row{
    width: 100%;
    height: 100%;
    .el-col{
      height: 100%;
      span{
        display: inline-block;
      }
      .remind{
        width: 20px;
        height: 100%;
      }
      .avater{
        width: 40px;
        height: 40px;
        margin-top: 10px;
        img{
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
