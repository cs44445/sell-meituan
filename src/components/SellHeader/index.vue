<template>
  <div class="header-wrapper">
    <!-- 顶部 -->
    <div class="header-top">
      <div class="header-back"><span class="icon-arrow_lift"></span></div>
      <form class="header-search">
        <span class="search-icon"></span>
        <input type="text" placeholder="搜索店内商品" class="header-input" />
      </form>
      <div class="header-more">
        <div class="header-more-box">
          <a href="#" class="header-pd">拼单</a>
          <div class="header-more-bt">
            <span class="s-radius"></span>
            <span class="s-radius"></span>
            <span class="s-radius"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 餐厅 -->
    <div class="header-shop">
      <div class="shop-logo">
        <img :src="restaurantInfo.pic_url" alt="" class="shop-logo-img" />
      </div>
      <div class="shop-name">{{ restaurantInfo.name }}</div>
      <div class="shop-star-wrapper">
        <img src="../../assets/img/star.png" alt="" />
        <div class="">收藏</div>
      </div>
    </div>

    <!-- 提示 -->
    <div v-if="activities.length >= 0">
      <div class="header-tips" v-for="(item, index) in activities" :key="index">
        <img :src="item.icon_url" alt="" class="header-tips-logo" />
        <div class="header-tips-info">{{ item.info }}</div>
        <span class="header-tips-num">{{ activities.length }}个活动</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 背景 -->
    <div class="header-bg" :style="content_bg"></div>
  </div>
</template>

<script>
export default {
  name: "SellHeader",
  components: {},
  props: {
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      restaurantInfo: this.shopInfo.poi_info,
      activities: this.shopInfo.poi_info.discounts2,
    };
  },
  computed: {
    content_bg() {
      return "background-image:url(" + this.restaurantInfo.head_pic_url + ")";
    },
  },
};
</script>

<style scoped>
@import url("./style.css");
@import url("../../common/style/icon.css");
</style>>