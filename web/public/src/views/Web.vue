<template>
  <div class="web">
    <Hot-Article></Hot-Article>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'
export default{
  data() {
    return{
    }
  },
  components: {
      ArticleList
  }
}
</script>

<style lang="scss" scoped>
.web{
  width: 100%;
  height: 100%;
}
</style>