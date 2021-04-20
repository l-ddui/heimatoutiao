<template>
  <div
    class="btn"
    :class="{
      success: type == 'success',
      primary: type == 'primary',
      danger: type == 'danger',
    }"
    @click="handlerClick"
  >
    <!-- 使用匿名插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handlerClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang='less' scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(204, 209, 200);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
.success {
  background-color: rgba(47, 177, 27, 0.822);
  color: #fff;
}
.danger {
  background-color: rgba(218, 39, 23, 0.788);
  color: #fff;
}
.primary {
  background-color: rgba(63, 105, 231, 0.863);
  color: #fff;
}
</style>