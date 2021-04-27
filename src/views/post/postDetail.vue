<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span
          @click="$router.push({ name: 'index' })"
          class="iconfont iconnew new"
        ></span>
      </div>
      <span :class="{ active: post.has_follow }" @click="follow">{{
        post.has_follow ? "已关注" : "关注"
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ post.title }}</div>
      <div class="desc">
        <span>{{ post.user.nickname }}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <!-- 显示文章或者视频 -->
      <!-- 文章 -->
      <div v-if="post.type == 1" class="content" v-html="post.content"></div>
      <!-- 视频 -->
      <!-- 
        src:路径
        loop:循环播放
        poster:封面，
        controls：是否显示控制面板
       -->
      <video controls v-else :src="post.content"></video>
      <div class="opt">
        <span
          @click="likeArticle"
          class="like"
          :class="{ active: post.has_like }"
          ><van-icon name="good-job-o" />{{
            post.like_length ? post.like_length : "点赞"
          }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="@/assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>

    <!-- 底部评论模块 @click="comments"-->
    <my_commentFooter :post="post"></my_commentFooter>
  </div>
</template>

<script>
import { getPostDetail, likeThisArticle } from "@/apis/post";
import { followUser, unfollowUser } from "@/apis/user";
import my_commentFooter from "@/components/my_commentFooter";
export default {
  components: {
    my_commentFooter,
  },
  data() {
    return {
      post: {
        user: {},
      },
      id: "",
    };
  },
  async mounted() {
    // 获取文章id
    this.id = this.$route.params.id;
    // console.log(id);
    let res = await getPostDetail(this.id);
    // console.log(res);
    this.post = res.data.data;
    // console.log(res.data.data);
  },
  methods: {
    // 点击关注按钮，如果已登录
    // 关注、取消关注
    async follow() {
      let res;
      if (this.post.has_follow) {
        // 已关注，点击时取消关注
        res = await unfollowUser(this.post.user.id);
        // console.log(res);
      } else {
        // 未关注，点击时关注
        res = await followUser(this.post.user.id);
        // console.log(res);
      }
      this.post.has_follow = !this.post.has_follow;
      this.$toast.success(res.data.message);
    },
    //  文章点赞
    async likeArticle() {
      let res = await likeThisArticle(this.id);
      // console.log(res);
      if (res.data.message == "点赞成功") {
        this.post.like_length++;
      } else {
        this.post.like_length--;
      }
      this.post.has_like = !this.post.has_like;
      this.$toast.success(res.data.message);
    },
  },
};
</script>

<style lang="less" scoped>
.articaldetail {
  padding-bottom: 50px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
  .active {
    background-color: transparent;
    border: 1px solid #666;
    color: #666;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/ img {
      width: 100%;
    }
    /deep/ p {
      text-indent: 2em;
    }
  }
  video {
    width: 100%;
    margin: 5px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .active {
    color: red;
    border-color: red;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>