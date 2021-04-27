<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model.trim="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="Search">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <p @click="searchHistory(item)" v-for="item in historyList" :key="item">
        {{ item }}
      </p>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        v-for="value in searchList"
        :key="value.id"
        :to="{ path: `/postDetail/${value.id}` }"
        >{{ value.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { searchPost } from "@/apis/post";
export default {
  data() {
    return {
      userKey: "", // 关键词
      searchList: [], // 搜索出来的数据列表
      historyList: [],
    };
  },
  mounted() {
    //  页面加载时，从渲染历史记录
    let res = JSON.parse(localStorage.getItem("historyList")) || [];
    this.historyList = res;
    // console.log(this.historyList);
  },
  methods: {
    async Search() {
      let res = await searchPost(this.userKey);
      this.searchList = res.data.data;
      // 点击搜索时，判断本地存储是否有关键词，有则先将该关键词删除，再将搜索关键词存到本地存储
      let index = this.historyList.indexOf(this.userKey);
      if (index != -1) {
        //   将该关键词删除
        this.historyList.splice(index, 1);
      }
      //   将关键词添加到列表第一位
      this.historyList.unshift(this.userKey);
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    },
    // 点击历史记录进行搜索
    searchHistory(item) {
      this.userKey = item;
      this.Search();
      //   console.log(item);
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>