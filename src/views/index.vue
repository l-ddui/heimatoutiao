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
        <!-- 上拉加载 -->
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          loading-text="正在玩命加载中..."
          :offset="5"
          :immediate-check="false"
          @load="onLoad"
        >
          <!-- 下拉刷新 -->
          <van-pull-refresh
            loading-text="正在玩命加载中..."
            pulling-text="拉我就刷新"
            loosing-text="你快放手"
            v-model="cate.isLoading"
            @refresh="onRefresh"
          >
            <my_postBlock
              v-for="post in cate.postlist"
              :key="post.id"
              :post="post"
            ></my_postBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category";
import my_postBlock from "@/components/my_postBlock";
import { getPostList } from "@/apis/post";
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
    //   获取、渲染栏目列表
    this.cateList = (await getCateList()).data.data;
    this.cateList = this.cateList.map((v) => {
      return {
        ...v,
        postlist: [], // 存储每个栏目自己的数据
        pageIndex: 1, // 页码
        pageSize: 6, //每页显示的数据个数
        loading: false, //当前组件的上拉状态
        finished: false, //当前组件的数据是否全部加载完毕
        isLoading: false, // 当前组件的下拉刷新状态
      };
    });
    // console.log(this.cateList);
    // 通过获取当前激活项的id 获取其数据
    this.getPost();
  },
  methods: {
    // 上拉加载下一页
    onLoad() {
      // 加载下一页的数据，将页码 +1 ，重新发请求
      this.cateList[this.active].pageIndex++;
      //  延迟发请求拿数据，近做演示用
      //   setTimeout(() => {
      this.getPost();
      //   }, 100);
    },
    // 下拉刷新
    onRefresh() {
      // 页码设置为 1
      this.cateList[this.active].pageIndex = 1;
      // 将之前的数据清空
      this.cateList[this.active].postlist.length = 0;
      //   将之前可能重置为 true 的finished 重置为false
      this.cateList[this.active].finished = false;
      //   发请求取数据
      this.getPost();
    },

    async getPost() {
      // 拿到列表的数据，格式为数组
      let current = (
        await getPostList({
          category: this.cateList[this.active].id,
          pageIndex: this.cateList[this.active].pageIndex,
          pageSize: this.cateList[this.active].pageSize,
        })
      ).data.data;
      //   console.log(current);
      // 将获取到的新闻数据存储到当前栏目的postList数组中
      this.cateList[this.active].postlist.push(...current);
      // 本次请求完成之后，将loading重置为false,以便下一次上拉
      this.cateList[this.active].loading = false;
      // 本次请求完成之后，将isLoading重置为 false
      this.cateList[this.active].isLoading = false;

      // 判断数据是否已全部加载完毕：我要求6条数据，结果返回的数量小于6，说明真没有数据了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },
  },
  //   监听 active 的变化
  watch: {
    active() {
      if (this.cateList[this.active].postlist.length == 0) {
        this.getPost();
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