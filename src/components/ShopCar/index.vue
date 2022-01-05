<template>
  <div class="shop-car">
    <div class="left">
      <div
        class="logo-wrapper"
        :style="{ background: totalPrice > 0 ? '#ffd161' : '' }"
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
</template>

<script>
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
    };
  },
  methods: {
    getTotal() {
      console.log("hhh");
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
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/icon.css");

.shop-car {
  width: 100%;
  height: 51px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #514f4f;
  display: flex;
  color: white;

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
</style>