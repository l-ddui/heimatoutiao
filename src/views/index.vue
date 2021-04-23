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
      <van-tab v-for="cate in cateList" :key="cate.id" :title="cate.name">
        <my_postBlock
          v-for="post in cate.postlist"
          :key="post.id"
          :post="post"
        ></my_postBlock>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category";
import my_postBlock from "@/components/my_postBlock";
import { getPostList } from "../apis/post";
export default {
  components: {
    my_postBlock,
  },
  data() {
    return {
      // 当前激活的标题索引
      active: localStorage.getItem("heimatoutiaoToken") ? 1 : 0,
      cateList: [],
    };
  },

  async mounted() {
    //   获取栏目数据，存储到数组
    let res = await getCateList();
    this.cateList = res.data.data;
    // console.log(this.cateList);
    //  数据改造
    this.cateList = this.cateList.map((v) => {
      return { ...v, postlist: [] };
    });
    // console.log(this.cateList);

    // 获取当前激活项的新闻数据
    this.getpost();
    // console.log(this.cateList);
  },
  methods: {
    async getpost() {
      // 获取当前选中标题项目的 id
      let id = this.cateList[this.active].id;
      //   console.log(id);
      //  获取当前所选项对应的新闻数据存储到其对象的 postlist 数组中
      this.cateList[this.active].postlist = (await getPostList(id)).data.data;
      // console.log(this.postList);
    },
  },
  //   监听 active 的变化
  watch: {
    async active() {
      // 当所选项的 postlist 有数据时，不再发送请求
      if (this.cateList[this.active].postlist.length == 0) {
        // 获取当前激活项的新闻数据
        this.getpost();
      }
    },
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