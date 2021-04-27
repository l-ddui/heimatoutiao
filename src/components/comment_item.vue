<template>
  <div class="commentItem">
    <!-- 递归生成 -->
    <commentItem
      v-if="parent.parent"
      :parent="parent.parent"
      @replay="handlerReplay"
    ></commentItem>

    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="handlerReplay(parent)">回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  props: {
    parent: {
      type: Object,
    },
  },
  methods: {
    /*  
    comment_item 为子组件，评论模块为子组件（已实现), 实现嵌套回复，点击 comment_item  中的回复时弹出评论模块，可以先使子传父，（comment_item  传到 commment），再实现父传子调用评论模块（commment 传到 commentFooter）
    */
    handlerReplay(value) {
      this.$emit("replay", value);
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>