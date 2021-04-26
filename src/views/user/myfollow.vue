<template>
  <div class="myfollow">
    <!-- 顶部 -->
    <my_header title="我的关注">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </my_header>
    <!-- 关注列表 -->
    <div class="list" v-for="(value, index) in followList" :key="value.id">
      <div class="box">
        <img :src="value.head_img" alt="" />
        <div class="center">
          <p>{{ value.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancelFollow(value.id, index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import { getUserfollow, unfollowUser } from "@/apis/user";
import axios from "@/utils/request";
export default {
  data() {
    return {
      followList: [],
    };
  },
  components: {
    my_header,
  },
  async mounted() {
    let res = await getUserfollow();
    // console.log(res);
    this.followList = res.data.data.map((v) => {
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
  },
  methods: {
    async cancelFollow(id, index) {
      // 调方法 取消关注
      await unfollowUser(id);
      //   将关注列表中 编号为 index 的用户移除
      this.followList.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>