<template>
  <div class="header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "my-header",
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #ccc;
  .right {
    font-size: 20px;
  }
}
</style>