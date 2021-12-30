<template>
  <div class="order">
    <ul class="order-wrapper">
      <li>
        <img :src="topTypeList.tag_icon" alt="" />
        <span>{{ topTypeList.tag_name }}</span>
      </li>
      <li class="order-type" v-for="(item, index) in typeList" :key="index">
        <img v-if="item.icon" :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <div class="goods-list">
      <!-- 专场 -->
      <div class="top-warpper">
        <div
          class="top-img"
          v-for="(item, index) in topTypeList.operation_source_list"
          :key="index"
        >
          <img :src="item.pic_url" alt="" />
        </div>
      </div>
      <!-- 热销 -->
      <div class="food-warpper" v-for="(item, index) in typeList" :key="index">
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
            <span v-if="item2.praise_content">{{ item2.praise_content }}</span>
            <div class="info-tip" v-if="item2.product_label_picture">
              <img :src="item2.product_label_picture" alt="" />
            </div>
            <p class="info-price">
              ￥<span class="info-price">{{ item2.min_price }}</span
              >/{{ item2.unit }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderList from "@/data/order";

export default {
  name: "Order",
  components: {},
  created() {
    console.log(orderList.data.food_spu_tags, "typeList==================");
    console.log(this.topTypeList, "topTypeList==================");
  },
  data() {
    return {
      topTypeList: orderList.data.container_operation_source,
      typeList: orderList.data.food_spu_tags,
    };
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

    li {
      display: flex;
      padding: 16px 23px 15px 10px;
      border-bottom: 1px solid #e4e4e4;

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
    }
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
</style>>