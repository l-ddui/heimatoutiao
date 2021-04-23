<template>
  <div class="edit_profile">
    <my_header title="编辑个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </my_header>
    <div class="imgarea">
      <img :src="userinfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <my_cell
      title="昵称"
      @click.native="nickDialog"
      :desc="userinfo.nickname"
    ></my_cell>
    <!-- 点击昵称，弹出编辑框 -->
    <van-dialog
      @confirm="editNickname"
      v-model="nickshow"
      title="编辑昵称"
      show-cancel-button
    >
      <van-field v-model="nickname" required label="昵称" />
    </van-dialog>
    <my_cell
      @click.native="
        passshow = !passshow;
        originpass = newpass = '';
      "
      title="密码"
      desc="********"
    ></my_cell>
    <!-- 点击密码，弹出编辑框 -->
    <van-dialog
      :beforeClose="beforeClose"
      @confirm="editPass"
      v-model="passshow"
      title="编辑密码"
      show-cancel-button
    >
      <van-field v-model.trim="originpass" required label="原密码" />
      <van-field v-model.trim="newpass" required label="新密码" />
    </van-dialog>

    <my_cell
      @click.native="gendershow = !gendershow"
      title="性别"
      :desc="userinfo.gender == 1 ? '男' : '女'"
    ></my_cell>
    <!-- 点击性别，弹出 -->
    <van-action-sheet
      :close-on-click-action="true"
      v-model="gendershow"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import my_cell from "@/components/my_cell";
import { uploadFile } from "@/apis/fileUpload";
import { getUserDetail, updateUserInfo } from "@/apis/user";
import axios from "@/utils/request";
export default {
  components: {
    my_header,
    my_cell,
  },
  data() {
    return {
      userinfo: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      nickname: "",
      originpass: "",
      newpass: "",
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  mounted() {
    //  获取用户数据并渲染
    getUserDetail(this.$route.params.id)
      .then((res) => {
        // console.log(res.data.data);
        this.userinfo = res.data.data;
        this.userinfo.head_img =
          axios.defaults.baseURL + res.data.data.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // 当用户选择好文件之后，就会立刻触发这个方法
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formdata = new FormData();
      formdata.append("file", file.file);
      //  将文件上传至服务器
      uploadFile(formdata)
        .then((res) => {
          if (res.data.message == "文件上传成功") {
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            // 更新用户数据
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                // console.log(res);
                if (res.data.message == "修改成功") {
                  this.$toast.success(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    nickDialog() {
      this.nickshow = !this.nickshow;
      this.nickname = this.userinfo.nickname;
    },
    editNickname() {
      updateUserInfo(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          if (res.data.message == "修改成功") {
            this.userinfo.nickname = this.nickname;
            this.$toast.success({
              icon: "thumb-circle-o",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击确认按钮时触发事件
    async editPass() {
      // 如果 原密码正确
      if (this.originpass == this.userinfo.password) {
        //  判断 新密码是否合法
        if (/^.{3,16}$/.test(this.newpass)) {
          //  进行用户密码修改
          let res = await updateUserInfo(this.$route.params.id, {
            password: this.newpass,
          });
          // console.log(res);
          // 刷新页面
          this.userinfo.password = this.newpass;
          // 提示
          this.$toast.success(res.data.message);
        } else {
          //  提示 新密码不合法
          this.$toast.fail("请输入3~16位数的新密码:");
        }
      } else {
        // 否则 提示
        this.$toast.fail("原密码输入出错！");
      }
    },
    beforeClose(action, done) {
      if (action == "confirm") {
        // 如果用户输入原密码不正确或者新密码输入不合法，阻止关闭
        if (
          this.originpass != this.userinfo.password ||
          /^.{3,16}$/.test(this.newpass) == false
        ) {
          // 阻止关闭
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    // 修改性别
    async onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      let gender = item.name == "男" ? 1 : 0;
      await updateUserInfo(this.$route.params.id, { gender });
      this.userinfo.gender = gender;
      // this.show = false;
      // Toast(item.name);
    },
  },
};
</script>

<style lang="less" scoped>
.edit_profile {
  .imgarea {
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;
    img {
      width: 90px;
      height: 90px;
      display: block;
    }
  }
  //   /deep/ 在父组件中修改子组件的样式
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  /deep/.van-uploader__upload {
    width: 90px;
    height: 90px;
  }
}
</style>