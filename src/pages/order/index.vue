<template>
  <div class="order">
    <div ref="MenuScroll">
      <!-- 使用滚动的内层只能由一个content包裹 否则无法滚动 -->
      <ul class="order-wrapper">
        <li :class="{ activeMenu: currentIndex === 0 }" @click="selectMenu(0)">
          <img :src="topTypeList.tag_icon" alt="" />
          <span>{{ topTypeList.tag_name }}</span>
        </li>
        <li
          class="order-type"
          v-for="(item, index) in typeList"
          :key="index"
          :class="{ activeMenu: currentIndex === index + 1 }"
          @click="selectMenu(index + 1)"
        >
          <img v-if="item.icon" :src="item.icon" alt="" />
          <span>{{ item.name }}</span>
          <span class="total-num" v-show="getSelectCount(item.spus)">{{
            getSelectCount(item.spus)
          }}</span>
        </li>
      </ul>
    </div>
    <div ref="goodScroll">
      <!-- 使用滚动的内层只能由一个content包裹 否则无法滚动 -->
      <div class="goods-list">
        <!-- 专场 -->
        <div class="top-warpper good-list-hook">
          <div
            class="top-img"
            v-for="(item, index) in topTypeList.operation_source_list"
            :key="index"
          >
            <img :src="item.pic_url" alt="" />
          </div>
        </div>
        <!-- 具体分类 -->
        <div
          class="food-warpper good-list-hook"
          v-for="(item, index) in typeList"
          :key="index"
        >
          <div class="food-title">{{ item.name }}</div>
          <div
            v-for="(item2, indey) in item.spus"
            :key="indey"
            class="food-item-detail"
          >
            <div class="food-pic">
              <img :src="item2.picture" alt="" />
            </div>
            <div class="food-info">
              <p class="info-name">{{ item2.name }}</p>
              <p v-if="item2.description" class="food-des">
                {{ item2.description }}
              </p>
              <span class="info-num">{{ item2.month_saled_content }}</span>
              <span v-if="item2.praise_content">{{
                item2.praise_content
              }}</span>
              <div class="info-tip" v-if="item2.product_label_picture">
                <img :src="item2.product_label_picture" alt="" />
              </div>
              <p class="info-price">
                ￥<span class="info-price">{{ item2.min_price }}</span
                >/{{ item2.unit }}
              </p>
            </div>
            <CarControl :food="item2" />
          </div>
        </div>
      </div>
    </div>
    <ShopCar :priceInfo="priceInfo" :selectFood="selectFood" />
  </div>
</template>

<script>
import orderList from "@/data/order";
import BScroll from "better-scroll";
import ShopCar from "../../components/ShopCar";
import CarControl from "../../components/common/CarControl";

export default {
  name: "Order",
  components: {
    ShopCar,
    CarControl,
  },
  data() {
    return {
      topTypeList: orderList.data.container_operation_source,
      typeList: orderList.data.food_spu_tags,
      MenuScroll: {},
      goodScroll: {},
      heightList: [],
      scrollY: 0,
      priceInfo: orderList.data.poi_info,
      food: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      this.MenuScroll = new BScroll(this.$refs.MenuScroll, {
        click: true,
      });
      this.goodScroll = new BScroll(this.$refs.goodScroll, {
        probeType: 2,
        click: true,
      });

      // 监听滚动
      this.goodScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
        this.getGoodHeight();
      });
    },
    getGoodHeight() {
      let goodList =
        this.$refs.goodScroll.getElementsByClassName("good-list-hook");

      // 添加到数组区间 0-219第一个区间(专场) 220-1290第二个区间(热销)
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < goodList.length; i++) {
        let item = goodList[i];
        // 累加
        height += item.clientHeight;
        this.heightList.push(height);
      }
    },
    selectMenu(index) {
      let goodList =
        this.$refs.goodScroll.getElementsByClassName("good-list-hook");

      // 根据下标，滚动到相对应的元素
      let el = goodList[index];
      // 滚动到对应元素的位置
      this.goodScroll.scrollToElement(el, 250);
    },
    getSelectCount(spus) {
      let num = 0;
      spus.forEach((food) => {
        if (food.count > 0) {
          num += food.count;
        }
      });
      return num;
    },
  },
  computed: {
    currentIndex() {
      // 根据右侧滚动位置，确定对应的索引下标
      for (let i = 0; i < this.heightList.length; i++) {
        // 获取商品区间的范围
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];

        // 是否在上述区间中
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFood() {
      let foods = [];
      this.typeList.forEach((item) => {
        item.spus.forEach((food) => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });

      return foods;
    },
  },
};
</script>

<style scoped lang="less">
.order {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
  font-size: 13px;
  color: #333;

  .order-wrapper {
    flex: 0 0 85px;
    background: #f4f4f4;
    overflow: hidden;

    .order-type {
      display: flex;
      padding: 16px 23px 15px 10px;
      border-bottom: 1px solid #e4e4e4;
      position: relative;

      span {
        width: 52px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      img {
        width: 15px;
        height: 15px;
      }

      .total-num {
        display: inline-block;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: red;
        color: white;
        text-align: center;
        line-height: 13px;
        font-size: 7px;
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }

  // 不能写成 .order-wrapper.activeMenu  这样写添加的动态样式是错误的  .activeMenu之前要有空格
  // 也不能只写.activeMenu   需要写成.order-wrapper .activeMenu
  .order-wrapper .activeMenu {
    background: white;
    font-weight: 700;
    margin-top: -1px;
    margin-bottom: -1px;
  }

  .goods-list {
    flex: 1;
    // background: blue;

    .top-warpper {
      padding: 11px 11px 0 11px;
      border-bottom: 1px solid #e4e4e4;

      .top-img {
        padding-bottom: 11px;
      }
      img {
        width: 100%;
        height: 90px;
        border-radius: 5px;
      }
    }

    .food-warpper {
      .food-title {
        font-size: 13px;
        padding: 12px 12px 12px 7px;
        margin-left: 11px;
        font-weight: 700;
        background: url("../../assets/img/yellow.png") no-repeat left center;
        background-size: 2px 10px;
      }
      .food-item-detail {
        display: flex;
        padding: 0 22px 22px 16px;
        .food-pic {
          height: 50px;
          flex: 0 0 63px;
          margin-right: 11px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .food-info {
          flex: 1;
          font-size: 10px;
          color: #bfbfbf;

          .info-name {
            font-size: 16px;
            color: #333;
            line-height: 21px;
            padding-bottom: 10px;
            font-weight: 700;
          }

          .food-des {
            margin-bottom: 8px;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .info-num {
            display: inline-block;
            padding: 0 14px 7px 0;
          }

          .info-tip {
            width: 70px;
            height: 20px;
            padding-bottom: 6px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .info-price {
            font-size: 14px;

            span {
              color: #fb4e44;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>