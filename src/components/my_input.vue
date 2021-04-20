<template>
  <input
    @blur="handlerBlur"
    @input="handlerInput"
    class="my_input"
    :[pn]="{
      success: flag,
      error: !flag,
    }"
  />
</template>

<script>
export default {
  props: {
    // 定义数据的校验规则
    rules: {
      type: RegExp,
    },
    msg: {
      type: String,
      default: "输入错误",
    },
  },
  data() {
    return {
      flag: "",
      pn: "test",
    };
  },
  methods: {
    handlerInput(e) {
      //   console.log(e.target.value);
      let value = e.target.value;
      //  判断是否传递了规则
      if (this.rules) {
        // 判断是否满足规则
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      this.$emit("input", value);
    },
    handlerBlur(e) {
      this.pn = "class";

      let value = e.target.value;
      //  判断是否传递了规则
      if (this.rules) {
        // 判断是否满足规则
        if (!this.rules.test(value)) {
          console.log(this.msg);
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.my_input {
  width: 314/360 * 100vw;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 2px solid #888;
  font-size: 20px;
  line-height: 50px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>