<template>
  <div class="mystar">
    <my_header title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </my_header>
    <!-- 遍历收藏的文章列表，动态生成 -->
    <my_postBlock
      v-for="value in starList"
      :key="value.id"
      :post="value"
    ></my_postBlock>
  </div>
</template>

<script>
import my_header from "@/components/my_header";
import my_postBlock from "@/components/my_postBlock";
import { getUserstar } from "@/apis/user";
export default {
  data() {
    return {
      starList: [],
    };
  },
  components: {
    my_header,
    my_postBlock,
  },
  async mounted() {
    let res = await getUserstar();
    // console.log(res);
    // 收藏的文章列表
    this.starList = res.data.data;
    // console.log(this.starList);
  },
};
</script>

<style>
</style>