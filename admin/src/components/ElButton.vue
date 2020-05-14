<template>
  <div class="el_button">
    <button :class="'i-button-size' + size" :size="size" @click="handleClick" :disabled="disabled">按钮
      <slot></slot>
    </button>
  </div>
</template>

<script>
function oneOf(value, validList) {
  for(let i = 0; i < validList.length; i++) {
    if(value === validList[i]){
      return true
    }
  }
  return false
}
export default{
  props: {
    size: {
      validator(value) {
        return oneOf(value, ['small','large','default'])
      },
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('my-click', event)
    },
    //  判断是不是其中参数之一
    oneOf(value, validList) {
      for(let i = 0; i < validList.length; i++) {
        if(value === validList[i]){
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.el_button{
  width: 100%;
  height: 100px;
  .i-button-sizesmall{
    width: 40px;
    height: 40px;
  }
  .i-button-sizelarge{
    width: 100px;
    height: 100px;
  }
  .i-button-sizedefault{
    width: 60px;
    height: 60px;
  }
}
</style>