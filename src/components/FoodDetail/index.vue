<template>
  <transition name="food-detail">
    <div class="food-wrapper" v-show="isShowPage" ref="foodItemRef">
      <div class="food-content">
        <!-- 商品图片 -->
        <div class="top-img">
          <div class="icon-close detial-icon" @click="closeDetailPage"></div>
          <div class="right-logo">
            <img src="../../assets/img/share.png" alt="" class="share-icon" />
            <img src="../../assets/img/more.png" alt="" class="more-icon" />
          </div>
          <img :src="food.picture" alt="" class="food-img" />
        </div>

        <!-- 商品信息 -->
        <div class="food-info">
          <div class="food-info-left">
            <div class="food-name">{{ food.name }}</div>
            <div class="sale-num">{{ food.month_saled_content }}</div>
            <div class="tip-mg" v-if="food.product_label_picture">
              <img :src="food.product_label_picture" alt="" />
            </div>
            <span class="food-price">￥{{ food.min_price }}</span>
            <span class="food-unit">/{{ food.unit }}</span>
          </div>
          <div class="choose-box">
            <div
              class="food-choose"
              v-show="!food.count || food.count === 0"
              @click="chooseBtn"
            >
              选规格
            </div>
            <div v-show="food.count !== 0">
              <CarControl :food="food" />
            </div>
          </div>
        </div>

        <Slipt />

        <!-- 商品评论 -->
        <div class="rating-warpper" v-if="food.rating">
          <div class="rating-head">
            <div class="head-left">
              <span>{{ food.rating.title }}</span>
              (<span class="head-des">{{ food.rating.like_ratio_desc }}</span
              ><span class="head-per">{{ food.rating.like_ratio }}</span
              >)
            </div>
            <div class="rating-num">
              <span class="">{{ food.rating.snd_title }}</span>
              <span class="icon-keyboard_arrow_right rating-icon"></span>
            </div>
          </div>
          <div class="rating-content" v-if="food.rating.comment_list">
            <div
              class="rating-item"
              v-for="(item, index) in food.rating.comment_list"
              :key="index"
            >
              <div class="user-icon">
                <img :src="item.user_icon" alt="" v-if="item.user_icon" />
                <img src="../../assets/img/anonymity.png" v-else />
              </div>
              <div class="user-box">
                <div class="user">
                  <span>{{ item.user_name }}</span>
                  <span>{{ item.comment_time }}</span>
                </div>
                <div class="content-detail">{{ item.comment_content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";

import CarControl from "../common/CarControl";
import Slipt from "../common/Slipt";

export default {
  name: "FoodDetail",
  components: {
    CarControl,
    Slipt,
  },
  props: {
    food: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isShowPage: false,
      foodItemScroll: null,
    };
  },
  methods: {
    showFoodDetail() {
      this.isShowPage = true;
      this.$nextTick(() => {
        if (!this.foodItemScroll) {
          this.foodItemScroll = new BScroll(this.$refs.foodItemRef,{
            click: true,
          });
        } else {
          this.foodItemScroll.refresh();
        }
      });
    },
    closeDetailPage() {
      this.isShowPage = false;
    },
    chooseBtn() {
      Vue.set(this.food, "count", 1);
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/icon.css");
.food-wrapper {
  position: fixed;
  top: 0;
  bottom: 51px;
  background: white;
  width: 100%;
  padding-top: 10px;

  .food-content {
    .top-img {
      position: relative;
      width: 100%;
      height: 0;
      /* 高度如何撑开？
	 在定位中，使用padding-top或padding-bottom设置为100%，其实盒子高度会根据盒子的宽度进行计算
	 */
      padding-top: 100%;

      .detial-icon {
        position: absolute;
        top: 0;
        left: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 25px;
        text-align: center;
        line-height: 30px;
        background-color: #9d9d9d;
        color: #fff;
        z-index: 99;
      }

      .right-logo {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;

        img {
          width: 30px;
          height: 30px;
        }

        .more-icon {
          padding: 0 10px 0 10px;
        }
      }

      .food-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    }

    .food-info {
      padding: 0 10px 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .food-info-left {
        .food-name {
          font-size: 15px;
          font-weight: 700;
          line-height: 30px;
          color: #333;
        }

        .sale-num {
          font-size: 11px;
          color: #9d9d9d;
          padding-bottom: 6px;
        }

        .tip-mg {
          width: 70px;
          height: 20px;
          padding-bottom: 16px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .food-price {
          color: #fb4e44;
          font-size: 17px;
          font-weight: 700;
        }

        .food-unit {
          font-size: 11px;
          color: #9d9d9d;
        }
      }

      .choose-box {
        display: flex;
        .food-choose {
          width: 64px;
          height: 30px;
          background-color: #ffd161;
          font-size: 12px;
          border-radius: 30px;
          line-height: 30px;
          text-align: center;
        }
      }
    }

    .rating-warpper {
      font-size: 13px;
      padding-left: 16px;

      .rating-head {
        display: flex;
        justify-content: space-between;
        padding: 16px 16px 16px 0;
        font-weight: 700;
        text-align: center;
        border-bottom: 1px solid #eee;

        .head-des {
          font-size: 11px;
        }

        .head-per {
          color: #fb4e44;
        }

        .rating-num {
          color: #9d9d9d;
          font-weight: 500;
        }
      }

      .rating-content {
        .rating-item {
          padding-top: 16px;
          display: flex;
          border-bottom: 1px solid #eee;

          .user-icon {
            img {
              width: 41px;
              height: 41px;
              border-radius: 50%;
            }
          }

          .user-box {
            padding: 0 16px 16px 10px;
            .user {
              padding-bottom: 16px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
}

.food-detail-enter-active,
.food-detail-leave-active {
  transition: 0.5s;
}
.food-detail-enter,
.food-detail-leave-to {
  transform: translateX(100%);
}
</style>