<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <my_input
          type="text"
          placeholder="请输入账户名..."
          v-model.trim="user.username"
          :rules="/^1[35789]\d{9}$|^10010123$/"
          msg="请输入11位手机号"
        ></my_input>
        <my_input
          msg="请输入3~16位的密码"
          type="password"
          placeholder="请输入密码"
          v-model.trim="user.password"
          :rules="/^.{3,16}$/"
        ></my_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <my_button @click="login" type="success"> 登录 </my_button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/apis/user";
import my_button from "@/components/my_button";
import my_input from "@/components/my_input";
export default {
  data() {
    return {
      user: {
        username: "10010123",
        password: "10010123",
      },
    };
  },
  components: {
    my_button,
    my_input,
  },
  methods: {
    login() {
      if (
        /^1[35789]\d{9}$|^admin$|^10010123$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            if (res.data.message == "登录成功") {
              this.$toast.success({
                message: res.data.message,
                icon:
                  "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg",
              });
              localStorage.setItem("heimatoutiaoToken", res.data.data.token);
              localStorage.setItem(
                "heimatoutiao_userid",
                res.data.data.user.id
              );

              // 跳转处理
              // 如果之前传递了回跳的路径，那么进行回跳
              let redirect = location.href.split("=")[1];
              // console.log(location.href);
              if (redirect) {
                location.href = decodeURIComponent(redirect);
              } else {
                // 否则跳转到个人中心页// 跳转到个人中心页
                this.$router.push({
                  path: `/personal/${res.data.data.user.id}`,
                });
              }
            } else {
              this.$toast.fail({
                message: res.data.message,
                icon: "warning-o",
              });
            }
          })
          .catch((err) => {});
      } else {
        // 提示
        this.$toast.fail({
          message: "手机号或者密码输入不合法",
          position: "middle",
          duration: 3000,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>