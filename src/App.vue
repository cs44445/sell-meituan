<template>
  <div id="app">
    <!-- header 头部 -->
    <SellHeader />

    <!-- 导航 nav -->
    <SellNav />

    <!-- 主体内容 -->
    <div>content</div>
    <router-view />
  </div>
</template>

<script>
import SellHeader from "../src/components/SellHeader";
import SellNav from "../src/components/SellNav";

export default {
  name: "App",
  components: {
    SellHeader,
    SellNav,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
