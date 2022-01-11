<template>
  <div class="ratings-wrapper">
    <div class="score-box">
      <div class="score-left">
        <div class="seller-box">
          <div class="score-seller">{{ ratings.comment_score }}</div>
          <div class="seller-des">商家评分</div>
        </div>
        <div class="score-center">
          <div class="taste-box">
            <span class="taste-des">口味</span>
            <span class="taste-star"><Star :score="ratings.food_score" /></span>
            <span class="taste-score">{{ ratings.food_score }}</span>
          </div>
          <div class="package-box">
            <span class="package-des">包装</span>
            <span class="package-star"
              ><Star :score="ratings.pack_score"
            /></span>
            <span class="score-num">{{ ratings.pack_score }}</span>
          </div>
        </div>
      </div>
      <div class="score-right">
        <div class="express-score">{{ ratings.delivery_score }}</div>
        <div class="express-des">配送评分</div>
      </div>
    </div>
    <Slipt />
    <div class="tab-box">
      <div
        class="tab-item"
        :class="currenIndex === index ? 'active-item' : ''"
        v-for="(item, index) in tabList"
        :key="item.id"
        @click="selectTab(index)"
      >
        <img
          src="../../assets/img/ratings-comment.png"
          alt=""
          v-if="item.icon && currenIndex !== 2"
          class="tab-icon"
        />
        <img
          src="../../assets/img/ratings-comment-highlight.png"
          alt=""
          v-if="item.icon && currenIndex === 2"
          class="tab-icon"
        />
        {{ item.title }}
      </div>
    </div>
    <div class="tag-box">
      <span
        class="tag-item"
        :class="item.label_star > 0 ? '' : 'bad-comment'"
        v-for="(item, index) in ratings.labels"
        :key="index"
        >{{ item.content }} {{ item.label_count }}</span
      >
    </div>
    <div class="ratings-box" v-if="ratings.comments">
      <div class="rating-content">
        <div
          class="rating-item"
          v-for="(item, index) in selectComments"
          :key="index"
        >
          <div class="user-icon">
            <img :src="item.user_pic_url" alt="" v-if="item.user_pic_url" />
            <img src="../../assets/img/anonymity.png" v-else />
          </div>
          <div class="user-box">
            <div class="user-info">
              <span>{{ item.user_name }}</span>
              <span>{{ fotmatDate(item.comment_time) }}</span>
            </div>
            <div class="rating-star">
              <div class="star-des">评分</div>
              <Star :score="item.order_comment_score" />
            </div>
            <div
              class="content-detail"
              v-html="showComment(item.comment)"
            ></div>
            <div class="img-wrapper" v-if="item.comment_pics.length">
              <img
                v-for="(item2, index2) in item.comment_pics"
                :src="item2.thumbnail_url"
                :key="index2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../../components/common/Star";
import Slipt from "../../components/common/Slipt";
import ratingsData from "../../data/ratings";

export default {
  name: "Ratings",
  components: {
    Star,
    Slipt,
  },
  data() {
    return {
      ratings: ratingsData.data,
      tabList: [
        { id: 1, title: "全部" },
        { id: 2, title: "有图" },
        { id: 3, title: "点评", icon: "../../assets/img/ratings-comment.png" },
      ],
      currenIndex: 0,
    };
  },
  methods: {
    selectTab(index) {
      this.currenIndex = index;
    },
    showComment(content) {
      let rel = /#[^#]+#/g;

      // return content.replace(rel, "<i>$&</i>");
      return content.replace(rel, "<span class='comment'>$&</span>");
    },
    fotmatDate(time) {
      let date = new Date(time * 1000);

      // 时间格式
      let fmt = "yyyy.MM.dd";

      if (/(y+)/.test(fmt)) {
        // 年
        let year = date.getFullYear().toString();
        fmt = fmt.replace(RegExp.$1, year);
      }
      if (/(M+)/.test(fmt)) {
        // 月
        let mouth = date.getMonth() + 1;
        if (mouth < 10) {
          mouth = "0" + mouth;
        }
        fmt = fmt.replace(RegExp.$1, mouth);
      }
      if (/(d+)/.test(fmt)) {
        // 日
        let mydate = date.getDate();
        if (mydate < 10) {
          mydate = "0" + mydate;
        }
        fmt = fmt.replace(RegExp.$1, mydate);
      }

      return fmt;
    },
  },
  computed: {
    selectComments() {
      if (this.currenIndex === 0) {
        return this.ratings.comments;
      } else if (this.currenIndex === 1) {
        let allArry = [];
        this.ratings.comments.forEach((item) => {
          if (item.comment_pics.length) {
            allArry.push(item);
          }
        });
        return allArry;
      } else {
        return this.ratings.comments_dp.comments;
      }
    },
  },
};
</script>

<style scoped lang="less">
.ratings-wrapper {
  font-size: 13px;
  font-weight: 700;

  .score-box {
    padding: 20px 0 18px 20px;
    display: flex;
    color: #666;

    .score-left {
      text-align: center;
      display: flex;
      flex: 1;

      .seller-box {
        padding-right: 28px;
        .score-seller {
          color: #ffb000;
          font-size: 23px;
          padding-bottom: 9px;
        }
      }

      .score-center {
        .taste-box {
          display: flex;
          justify-content: center;
          padding-top: 6px;

          .taste-star {
            padding: 0 11px 0 11px;
          }

          .taste-score {
            color: #ffb000;
          }
        }

        .package-box {
          display: flex;
          justify-content: center;
          padding-top: 14px;

          .package-star {
            padding: 0 11px 0 11px;
          }

          .score-num {
            color: #ffb000;
          }
        }
      }
    }

    .score-right {
      text-align: center;
      flex: 0 0 100px;
      color: #999;

      .express-score {
        font-size: 23px;
        padding-bottom: 9px;
      }
    }
  }

  .tab-box {
    display: flex;
    margin: 16px;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 36px;
    color: #ffb000;
    border-radius: 3px;
    border: 1px solid #ffb000;

    .tab-item {
      flex: 1;
      border-right: 1px solid #ffb000;

      .tab-icon {
        width: 17px;
        height: 17px;
        vertical-align: middle;
      }
    }

    .active-item {
      background-color: #ffb000;
      color: #333;
    }
  }

  .tag-box {
    font-weight: 500;
    padding-left: 20px;
    .tag-item {
      background-color: #f4f4f4;
      color: #656565;
      display: inline-block;
      margin: 0 6px 6px 0;
      line-height: 20px;
      padding: 5px;
    }

    .bad-comment {
      color: #999;
    }
  }

  .ratings-box {
    font-size: 13px;
    font-weight: 500;
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
          flex: 0 0 41px;
          img {
            width: 41px;
            height: 41px;
            border-radius: 50%;
          }
        }

        .user-box {
          padding: 0 16px 16px 10px;
          flex: 1;
          .user-info {
            padding-bottom: 12px;
            display: flex;
            justify-content: space-between;
          }

          .rating-star {
            display: flex;
            align-items: center;
            padding-bottom: 15px;

            .star-des {
              padding-right: 7px;
            }
          }

          .content-detail {
            .comment {
              color: #576b95 !important;
            }
          }
        }

        .img-wrapper img {
          width: 100%;
          height: 175px;
        }
      }
    }
  }
}
</style>