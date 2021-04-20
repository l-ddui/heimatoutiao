<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <my_input
        :rules="/^1[35789]\d{9}$|^10010123$/"
        msg="请输入11位手机号"
        v-model="user.username"
        placeholder="请输入手机号码"
        type="text"
      ></my_input>
      <my_input
        v-model="user.nickname"
        placeholder="请输入昵称"
        type="text"
      ></my_input>
      <my_input
        :rules="/^.{3,16}$/"
        msg="请输入3~16位密码"
        v-model="user.password"
        placeholder="请输入密码"
        type="password"
      ></my_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <my_button type="success" @click="handlerRegister">注册</my_button>
  </div>
</template>

<script>
import my_button from "@/components/my_button";
import my_input from "@/components/my_input";
import { userRegister } from "@/apis/user";

export default {
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        password: "",
      },
    };
  },
  components: {
    my_button,
    my_input,
  },
  methods: {
    handlerRegister() {
      if (
        /^1[35789]\d{9}$|^10010123$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password) &&
        this.user.nickname.length > 0
      ) {
        userRegister(this.user)
          .then((res) => {
            if (res.data.message == "注册成功") {
              this.$toast.success({
                message: res.data.message,
                icon: "thumb-circle-o",
              });
              this.$router.push({ name: "login" });
            } else {
              this.$toast.fail({
                message: res.data.message,
                icon: "warning-o",
              });
            }
          })
          .catch((err) => {
            console.log(err);
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