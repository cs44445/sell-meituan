<template>
  <div class="star">
    <span
      v-for="(item, index) in itemClass"
      :key="index"
      :class="item"
      class="star-item"
    ></span>
  </div>
</template>

<script>
import {
  STAR_FULL,
  STAR_HALF,
  STAR_EMPTY,
  STAR_LENGTH,
} from "@/utils/constant";

export default {
  name: "Star",
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    itemClass() {
      let result = [];
      // 4.7=>4.5 3.9=>3.5 4.1=>4.0
      // 对分数向下取0.5的倍数
      let score = Math.floor(this.score * 2) / 2;
      // 整数控制 全星
      let integer = Math.floor(score);
      // 小数控制 半星
      let floatNum = score % 1 !== 0;

      // 全星
      for (let i = 0; i < integer; i++) {
        result.push(STAR_FULL);
      }

      // 半星
      if (floatNum) {
        result.push(STAR_HALF);
      }

      // 用灰星补齐
      while (result.length < STAR_LENGTH) {
        result.push(STAR_EMPTY);
      }

      return result;
    },
  },
};
</script>

<style scoped lang="less">
.star {
  font-size: 0;

  .star-item {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
  }

  .star-item:last-child {
    margin-right: 0;
  }

  .full {
    background-image: url("../../../assets/img/star-full.png");
  }
  .half {
    background-image: url("../../../assets/img/star-half.png");
  }
  .empty {
    background-image: url("../../../assets/img/star-empty.png");
  }
}
</style>