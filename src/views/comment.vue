<template>
  <div class="comment">
    <!-- 顶部 -->
    <my_header title="精彩评论">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </my_header>
    <!-- 评论块 -->
    <div class="item" v-for="value in commentList" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span @click="replayComment(value)">回复</span>
      </div>
      <comment_item v-if="value.parent" :parent="value.parent"></comment_item>
      <div class="text">{{ value.content }}</div>
    </div>
    <!-- 发表评论 -->
    <my_commentFooter
      @cancel="temp = null"
      :commentObj="temp"
      :post="article"
      @refresh="refresh"
    ></my_commentFooter>
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import comment_item from "@/components/comment_item";
import { getCommentList, getPostDetail } from "@/apis/post";
import my_commentFooter from "../components/my_commentFooter";

import axios from "@/utils/request";
export default {
  components: {
    my_header,
    comment_item,
    my_commentFooter,
  },
  data() {
    return {
      commentList: [],
      axios,
      // 存储文章详情
      article: {},
      temp: {},
    };
  },
  async mounted() {
    //  获取文章详情
    this.init();
  },
  methods: {
    async init() {
      let id = this.$route.params.id;
      // 获取文章详情数据
      this.article = (await getPostDetail(id)).data.data;

      // 获取文章的评论数据
      let res = await getCommentList(id);
      // console.log(res);
      this.commentList = res.data.data;
    },
    // 回复评论
    replayComment(v) {
      this.temp = v;
      console.log("v:", v);
    },
    refresh() {
      this.init();
      // 让列表自动的滚动到顶部
      window.scrollTo(0, 0);
    },
  },
};
</script>

// 发表评论
/* 
1 页面加载时获取文章详情传到底部组件、获取评论数据进行渲染
2 在底部组件点击文本域时，显示输入框
3 点击发送按钮，判断文本域中是否有内容，没有则return，有则将内容以对象的形式作为参数调用评论接口
4 品论完成，将输入框隐藏，清空文本域的内容
5 刷新页面内容--字传父
6 父组件进行页面的刷新并将滚回到顶部
*/

// 回复评论
/* 
1 点击回复弹出输入框
2 调用方法回复评论
  1 调方法时传入文章id及评论内容
 */

<style lang="less" scoped>
.item {
  padding: 10px 12px;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>