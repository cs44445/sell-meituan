<template>
  <div class="shop-car">
    <div class="shop-car-wrapper">
      <div class="left">
        <div
          class="logo-wrapper"
          :style="{ background: totalPrice > 0 ? '#ffd161' : '' }"
          @click="clickCar"
        >
          <div
            class="icon-shopping_cart"
            :style="{ color: totalPrice > 0 ? '#2d2b2a' : '' }"
          ></div>
          <div class="logo-num" v-show="totalPrice > 0">{{ totalCount }}</div>
        </div>

        <div class="price-wrapper">
          <div class="price" v-show="totalPrice > 0">￥{{ totalPrice }}</div>
          <div
            class="default"
            :style="{ lineHeight: totalPrice > 0 ? '12px' : '51px' }"
          >
            另需{{ priceInfo.shipping_fee_tip }}
          </div>
        </div>
      </div>
      <div class="default-pay" :class="totalPrice > 0 ? 'to-pay' : ''">
        {{ showTip }}
      </div>
    </div>
    <!-- 购物车详情 -->
    <div class="shop-car-list" v-show="isShowCar || showList">
      <div class="list-head" v-if="priceInfo.discounts2">
        {{ priceInfo.discounts2[0].info }}
      </div>
      <div class="list-clean-warpper">
        <div>1号口袋</div>
        <div class="clean-box" @click="cleanShopCar">
          <img src="../../assets/img/delete.png" alt="" class="delete-icon" />
          <div>清空购物车</div>
        </div>
      </div>
      <div class="list-main">
        <div class="item-box" v-for="(food, index) in selectFood" :key="index">
          <div class="item-info">
            <div class="left-des">
              <div class="left-name">{{ food.name }}</div>
              <div class="des">
                {{ food.description ? food.description : food.unit }}
              </div>
            </div>
            <div class="right-price">￥{{ food.min_price }}</div>
          </div>
          <div class="car-wrapper">
            <CarControl :food="food" />
          </div>
        </div>
      </div>
      <div class="list-footer"></div>
    </div>

    <!-- 底部遮罩 -->
    <div class="car-mask" v-show="isShowCar"></div>
  </div>
</template>

<script>
import CarControl from "../common/CarControl";

export default {
  name: "ShopCar",
  props: {
    priceInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    selectFood: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // totalPrice: 0,
      isShowCar: false,
    };
  },
  components: {
    CarControl,
  },
  methods: {
    getTotal() {
      console.log("hhh");
    },
    clickCar() {
      if (!this.totalCount) {
        return;
      }
      this.isShowCar = !this.isShowCar;
    },
    cleanShopCar() {
      this.selectFood.forEach((food) => {
        food.count = 0;
      });
      this.isShowCar = false;
    },
  },
  computed: {
    showTip() {
      if (this.totalPrice === 0) {
        return this.priceInfo.min_price_tip;
      } else {
        return "去结算";
      }
    },
    totalCount() {
      let num = 0;
      this.selectFood.forEach((food) => {
        num += food.count;
      });
      return num;
    },
    totalPrice() {
      let total = 0;
      this.selectFood.forEach((food) => {
        total += food.min_price * food.count;
      });
      return total;
    },
    showList() {
      if (this.totalCount === 0) {
        this.isShowCar = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/icon.css");

.shop-car-wrapper {
  width: 100%;
  height: 51px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #514f4f;
  display: flex;
  color: white;
  z-index: 99;

  .left {
    display: flex;
    flex: 1;

    .logo-wrapper {
      width: 50px;
      height: 50px;
      background: #666666;
      border-radius: 50%;
      position: relative;
      top: -14px;
      left: 10px;
      text-align: center;

      .icon-shopping_cart {
        font-size: 28px;
        color: #c4c4c4;
        line-height: 50px;
      }

      .logo-num {
        width: 15px;
        height: 15px;
        line-height: 15px;
        border-radius: 50%;
        font-size: 9px;
        color: white;
        background: red;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .price-wrapper {
      margin-left: 15px;
      align-items: center;
      .price {
        font-size: 18px;
        line-height: 33px;
      }

      .default {
        font-size: 12px;
        color: #bab9b9;
      }
    }
  }

  .default-pay {
    flex: 0 0 110px;
    font-size: 15px;
    color: #bab9b9;
    line-height: 51px;
    text-align: center;
    font-weight: 700;
  }

  .to-pay {
    background: #ffd161;
    color: black;
  }

  .light {
    background-color: #ffd161;
  }
}

.shop-car-list {
  position: fixed;
  left: 0;
  bottom: 51px;
  width: 100%;
  background-color: #fff;
  z-index: 98;

  .list-head {
    height: 30px;
    background-color: #f3e6c6;
    color: #646158;
    font-size: 11px;
    text-align: center;
    line-height: 30px;
  }

  .list-clean-warpper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 6px;
    border-left: 4px solid #53c123;
    background-color: #f4f4f4;
    height: 30px;

    .clean-box {
      display: flex;
      .delete-icon {
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }
    }
  }

  .list-main {
    max-height: 360px;
    overflow: scroll;

    .item-box {
      height: 38px;
      padding: 12px 12px 10px 12px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;

      .item-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        width: 240px;

        .left-des {
          .left-name {
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            width: 168px;
          }
          .des {
            color: #b4b4b4;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            width: 168px;
            font-size: 12px;
          }
        }
      }
    }
  }

  .list-footer {
    height: 11px;
    width: 100%;
    background-color: #f4f4f4;
    border-left: 4px solid #ffd161;
  }
}

.car-mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: rgba(7, 17, 27, 0.6);
}
</style>