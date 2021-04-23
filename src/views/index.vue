<template>
  <div class="index">
    <!--  头部-->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- Tab标签页 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab title="标签 1">
        <div style="height: 1500px; background-color: red">内容 1</div>
      </van-tab>
      <van-tab title="标签 2">
        <div style="height: 1500px; background-color: green">内容 2</div>
      </van-tab>
      <van-tab title="标签 3">
        <div style="height: 1500px; background-color: skyblue">内容 3</div>
      </van-tab>
      <van-tab title="标签 4"
        ><div style="height: 1500px; background-color: yellow">
          内容 4
        </div></van-tab
      >
      <van-tab title="标签 5"
        ><div style="height: 1500px; background-color: green">
          内容 5
        </div></van-tab
      >
      <van-tab title="标签 6"
        ><div style="height: 1500px; background-color: yellowgreen">
          内容 6
        </div></van-tab
      >
      <van-tab title="标签 7"
        ><div style="height: 1500px; background-color: orange">
          内容 7
        </div></van-tab
      >
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: red;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
    .user {
      color: #fff;
      font-size: 20px;
    }
    .search {
      flex: 1;
      height: 40px;
      margin: 5px 10px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>