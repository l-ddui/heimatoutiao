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
    <my_cell title="密码" desc="********"></my_cell>
    <my_cell title="性别" :desc="userinfo.gender == 1 ? '男' : '女'"></my_cell>
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import my_cell from "@/components/my_cell";
import { uploadFile } from "@/apis/fileUpload";
import { getUserDetail, updateeUserInfo } from "@/apis/user";
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
      nickname: "",
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
            updateeUserInfo(this.$route.params.id, {
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
      updateeUserInfo(this.$route.params.id, { nickname: this.nickname })
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