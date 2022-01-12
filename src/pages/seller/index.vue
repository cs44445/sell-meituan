<template>
  <div class="seller-warpper">
    <div class="seller-address-box">
      <div class="address-head">
        <div class="seller-address">
          <div class="address-left">
            <img
              src="../../assets/img/address.png"
              alt=""
              class="address-icon"
            />
            <span class="address-info">{{ seller.address }}</span>
          </div>
          <div class="icon-right">
            <div class="icon-line-box">
              <img src="../../assets/img/line.png" alt="" class="icon-line" />
            </div>
            <img src="../../assets/img/phone.png" alt="" class="icon-call" />
          </div>
        </div>
      </div>
      <div class="seller-pics-box" v-if="seller.poi_env">
        <div
          v-for="pic in seller.poi_env.thumbnails_url_list"
          :key="pic"
          class="pics-item"
        >
          <img :src="pic" alt="" />
        </div>
      </div>
      <div class="safety-box">
        <span class="safety-des">查看食品安全档案</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <Slipt />
    <div class="seller-delivery-box">
      <span class="delivery-des">配送服务: {{ seller.app_delivery_tip }}</span>
    </div>
    <div class="seller-time-box">
      <span class="time-des">配送时间: {{ seller.shipping_time }}</span>
    </div>
    <Slipt />
    <div class="seller-service-box">
      <div class="service-head">
        <span class="service-des">商家服务</span>
        <div class="service-info-wrapper" v-if="seller.poi_service">
          <div
            class="service-info"
            v-for="(item, index) in seller.poi_service"
            :key="index"
          >
            <img :src="item.icon" alt="" class="service-icon-item" />
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
      <div class="service-tips" v-if="seller.discounts2">
        <div class="tips-item" v-for="item in seller.discounts2" :key="item.id">
          <div class="tips-item-icon">
            <img :src="item.icon_url" alt="" />
          </div>
          <span class="tips-item-info">{{ item.info }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slipt from "../../components/common/Slipt";

import sellerInfo from "../../data/seller";

export default {
  name: "Seller",
  components: {
    Slipt,
  },
  data() {
    return {
      seller: sellerInfo.data,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/icon.css");

.seller-warpper {
  font-size: 14px;

  .seller-address-box {
    padding: 0 15px 0 15px;

    .address-head {
      padding-left: 1px;

      .seller-address {
        display: flex;
        padding: 16px 21px 16px 0;
        align-items: center;
        border-bottom: 1px solid #eee;

        .address-left {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;

          .address-info {
            padding: 0 31px 0 11px;
            flex: 1;
          }

          .address-icon {
            flex: 0 0 20px;
            width: 20px;
            height: 20px;
          }
        }

        .icon-right {
          display: flex;
          flex: 0 0 61px;
          align-items: center;

          .icon-line-box {
            text-align: center;
            padding: 0 20px;

            .icon-line {
              width: 1px;
              height: 16px;
            }
          }

          .icon-call {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .seller-pics-box::-webkit-scrollbar {
      display: none;
    }

    .seller-pics-box {
      display: flex;
      width: 100%;
      overflow: scroll;
      padding: 10px 0 15px 0;
      border-bottom: 1px solid #eee;

      .pics-item {
        margin-right: 11px;

        img {
          width: 93px;
          height: 75px;
          border-radius: 3px;
        }
      }
    }

    .safety-box {
      padding: 15px 0;
      background: url("../../assets/img/safety.png") no-repeat left;
      background-size: 14px 16px;
      display: flex;
      justify-content: space-between;
      .safety-des {
        font-size: 12px;
        padding-left: 26px;
      }
    }
  }

  .seller-delivery-box {
    background: url("../../assets/img/delivery.png") no-repeat left;
    background-size: 14px 16px;
    padding: 16px;
    margin: 0 16px;
    border-bottom: 1px solid #eee;

    .delivery-des {
      display: inline-block;
      padding-left: 11px;
    }
  }

  .seller-time-box {
    background: url("../../assets/img/time.png") no-repeat left;
    background-size: 14px 16px;
    padding: 16px;
    margin: 0 16px;

    .time-des {
      display: inline-block;
      padding-left: 11px;
    }
  }

  .seller-service-box {
    .service-head {
      background: url("../../assets/img/server.png") no-repeat left;
      background-size: 14px 16px;
      padding: 16px;
      margin: 0 16px;
      border-bottom: 1px solid #eee;
      display: flex;

      .service-des {
        padding: 0 7px 0 7px;
      }

      .service-info-wrapper {
        .service-info {
          .service-icon-item {
            width: 16px;
            height: 16px;
            vertical-align: middle;
          }
        }
      }
    }

    .service-tips {
      padding: 16px;

      .tips-item {
        display: flex;

        .tips-item-icon {
          width: 16px;
          height: 16px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .tips-item-info {
          display: inline-block;
          padding-left: 7px;
        }
      }
    }
  }
}
</style>