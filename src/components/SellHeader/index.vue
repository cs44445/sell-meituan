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

    <!-- 公告 -->
    <div v-if="activities.length >= 0">
      <div class="header-tips" v-for="(item, index) in activities" :key="index">
        <img :src="item.icon_url" alt="" class="header-tips-logo" />

        <div class="header-tips-info">{{ item.info }}</div>
        <div class="header-tips-cheack" @click="showDetail">
          <span class="header-tips-num">{{ activities.length }}个活动</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>

    <!-- 背景 -->
    <div class="header-bg" :style="content_bg"></div>

    <!-- 公告内容 -->
    <transition name="fade">
      <div class="bulletin-detail" v-show="showBulletin">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="main_bg">
            <img :src="restaurantInfo.pic_url" alt="" />
            <h3>{{ restaurantInfo.name }}</h3>
            <div v-if="restaurantInfo.wm_poi_score" class="star-warpper">
              <Star :score="restaurantInfo.wm_poi_score" />
              <span class="star-score">{{ restaurantInfo.wm_poi_score }}</span>
            </div>
            <p class="tip">
              {{ restaurantInfo.min_price_tip }} <span>|</span>
              {{ restaurantInfo.shipping_fee_tip }} <span>|</span>
              {{ restaurantInfo.delivery_time_tip }}
            </p>
            <p class="time">配送时间: {{ restaurantInfo.shipping_time }}</p>
            <div v-if="activities.length >= 0" class="activies-wrapper">
              <div
                v-for="(item, index) in activities"
                :key="index"
                class="activies-item"
              >
                <div>
                  <img :src="item.icon_url" alt="" />
                </div>
                <span class="activies-info">{{ item.info }}</span>
              </div>
            </div>
          </div>
          <div class="close-wrapper" @click="clickClose">
            <span class="icon-close"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from "../common/Star";

export default {
  name: "SellHeader",
  components: {
    Star,
  },
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
      showBulletin: false,
      isShow: true,
      score: 2.5,
    };
  },
  computed: {
    content_bg() {
      return "background-image:url(" + this.restaurantInfo.head_pic_url + ")";
    },
    head_bg() {
      return "background-image:url(" + this.restaurantInfo.pic_url + ")";
    },
    main_bg() {
      return (
        "background-image:url(" + this.restaurantInfo.poi_back_pic_url + ")"
      );
    },
  },
  methods: {
    showDetail() {
      this.showBulletin = true;
    },
    clickClose() {
      this.showBulletin = false;
    },
    testClick() {
      this.isShow = !this.isShow;
    },
  },
  created() {
    console.log(this.restaurantInfo);
  },
};
</script>

<style scoped lang="less">
@import url("./style.less");
@import url("../../assets/style/icon.css");
</style>