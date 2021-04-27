<template>
  <div class="cateManager">
    <my_header title="栏目管理">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </my_header>
    <div class="delCate">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
          @click="removeAdd(value)"
          v-for="value in cateList"
          :key="value.id"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span
          @click="removeunAdd(value)"
          v-for="value in unAdd"
          :key="value.id"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category";
import my_header from "@/components/my_header.vue";
export default {
  data() {
    return {
      cateList: [], // 已添加列表
      unAdd: [], // 未添加列表
    };
  },
  components: {
    my_header,
  },
  async mounted() {
    this.cateList = JSON.parse(localStorage.getItem("cateList"));
    if (!this.cateList) {
      localStorage.removeItem("unAdd");
      let res = await getCateList();
      this.cateList = res.data.data;
      if (localStorage.getItem("heimatoutiaoToken")) {
        this.cateList.splice(0, 2);
      } else {
        this.cateList.splice(0, 1);
      }
    }

    // console.log(this.cateList);
    this.unAdd = JSON.parse(localStorage.getItem("unAdd") || "[]");
  },
  methods: {
    removeAdd(value) {
      // 点击时将当前项添加到未添加列表
      this.unAdd.push(value);
      // 将当前项 从已添加列表移出
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });
      // 存储到本地
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("unAdd", JSON.stringify(this.unAdd));
    },
    removeunAdd(value) {
      // 点击时将当前项添加到已添加列表
      this.cateList.push(value);
      // 将当前项 从未添加列表移出
      this.unAdd = this.unAdd.filter((v) => {
        return v.id != value.id;
      });
      // 存储到本地
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("unAdd", JSON.stringify(this.unAdd));
    },
  },
};
</script>

<style lang="less" scoped>
.delCate,
.addCate {
  padding: 10px;
  h3 {
    line-height: 36px;
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 22%;
      border: 1px solid #ccc;
      margin: 6px;
      padding: 10px 15px;
      text-align: center;
    }
  }
}
</style>