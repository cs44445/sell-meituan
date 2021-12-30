<template>
  <div id="app">
    <!-- header 头部 -->
    <SellHeader :shopInfo="shopInfo" />

    <!-- 导航 nav -->
    <SellNav />

    <!-- 主体内容 -->
    <router-view />
  </div>
</template>

<script>
import SellHeader from "../src/components/SellHeader";
import SellNav from "../src/components/SellNav";
import shopData from "./data/order";

export default {
  name: "App",
  components: {
    SellHeader,
    SellNav,
  },
  data() {
    return {
      shopInfo: shopData.data,
    };
  },
};
</script>

<style>
</style>
