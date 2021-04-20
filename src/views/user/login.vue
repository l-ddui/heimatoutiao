<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <my_input
          type="text"
          placeholder="请输入账户名..."
          v-model="user.username"
          :rules="/^1[35789]\d{9}$/"
          msg="请输入11位手机号"
        ></my_input>
        <my_input
          msg="请输入3~16位的密码"
          type="password"
          placeholder="请输入密码"
          v-model="user.password"
          :rules="/^.{3,16}$/"
        ></my_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <my_button @click="login" type="success">登录</my_button>
    </div>
  </div>
</template>

<script>
import my_button from "@/components/my_button";
import my_input from "@/components/my_input";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    my_button,
    my_input,
  },
  methods: {
    login() {
      alert("登陆了");
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