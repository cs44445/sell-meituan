<template>
  <div id="app">
    <!-- header 头部 -->
    <SellHeader :shopInfo="shopInfo" />

    <!-- 导航 nav -->
    <SellNav :commentNum="commentNum" />

    <!-- 主体内容 -->
    <router-view />
  </div>
</template>

<script>
import SellHeader from "../src/components/SellHeader";
import SellNav from "../src/components/SellNav";
import shopData from "./data/order";
import ratings from "./data/ratings";

export default {
  name: "App",
  components: {
    SellHeader,
    SellNav,
  },
  data() {
    return {
      shopInfo: shopData.data,
      commentNum: ratings.data.comment_num,
    };
  },
};
</script>

<style>
</style>
