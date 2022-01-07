<template>
  <div class="cart-control">
    <transition name="move">
      <!-- 阻止事件冒泡 防止点击减号时 冒泡到 查看商品详情的点击 -->
      <div class="cart-decrease" @click.stop.prevent="clickDecrease" v-show="food.count">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="clickAdd">
      <i class="add-logo"></i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "CarControl",
  props: {
    food: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    clickDecrease() {
      this.food.count--;
    },
    clickAdd() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../assets/style/icon.css");

.cart-control {
  font-size: 0;
  display: flex;

  div {
    width: 26px;
    height: 26px;
    font-size: 26px;
  }

  .cart-decrease {
    color: #b4b4b4;
  }

  .cart-count {
    text-align: center;
    font-size: 12px;
    line-height: 26px;
  }

  .cart-add {
    font-size: 26px;
    color: #ffd161;
    position: relative;

    .add-logo {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: black;
      position: absolute;
      left: 3px;
      top: 3px;
      z-index: -1;
    }
  }
}

.move-enter-active,
.move-leave-active {
  transition: all 0.5s linear;
}

.move-enter,
.move-leave-to {
  transform: translateX(20px) rotate(180deg);
}
</style>