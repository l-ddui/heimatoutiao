<template>
  <div class="personal">
    <router-link :to="'/edit_profile/' + id">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender == 1,
                iconxingbienv: userinfo.gender == 0,
              }"
            ></span
            >{{ userinfo.username }}
          </div>
          <div class="time">2021-4-22</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <my_cell title="我的关注" desc="关注的用户"></my_cell>
    <my_cell title="我的跟帖" desc="跟帖/回复 "></my_cell>
    <my_cell title="我的收藏" desc="文章/视频"></my_cell>
    <my_cell title="设置"></my_cell>
    <my_button type="tuichu" style="margin-top: 15px">退 出</my_button>
  </div>
</template>

<script>
import my_cell from "@/components/my_cell";
import my_button from "@/components/my_button";
import { getUserDetail } from "@/apis/user";
import axios from "@/utils/request";
export default {
  components: {
    my_cell,
    my_button,
  },
  data() {
    return {
      userinfo: {},
      id: "",
    };
  },
  mounted() {
    /* 
    页面一加载时就渲染数据
    封装请求用户数据 api
    1 传 id ，/user/:id 这种形式的参数只能用 url: `/user/${id}`方式获取
    2 获取用户数据有身份验证，需要发起请求时在请求头 用 Authorization带上 token
    在个人中心页面调用 api 发起请求
    1 传入用户id，获取用户数据
    2 将用户数据渲染到页面，借助第三方对象存储用户数据渲染时更加方便
     */
    // console.log(this.$route);
    this.id = this.$route.params.id;
    getUserDetail(this.id)
      .then((res) => {
        if (res.data.message == "获取成功") {
          // console.log(res.data.data);
          this.userinfo = res.data.data;
          this.userinfo.head_img =
            axios.defaults.baseURL + this.userinfo.head_img;
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>