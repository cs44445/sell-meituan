<template>
  <div class="nav-box">
    <div class="nav-item" v-for="(item, index) in linkList" :key="index">
      <router-link
        :to="item.path"
        class="nav-link"
        exact-active-class="nav-active"
        >{{ item.content }}
        <i class="nav-line"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SellNav",
  components: {},
  props: {
    commentNum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      linkList: [
        { path: "/order", content: "点菜" },
        { path: "/ratings", content: `评价(${this.commentNum})` },
        { path: "/seller", content: "商家" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-box {
  display: flex;
  border-bottom: 1px solid #e4e4e4;
}

.nav-item {
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  line-height: 40px;
}

.nav-item .nav-link {
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #666;
  font-size: 13px;
  position: relative;
}

.nav-item .nav-link.nav-active {
  color: #ffbb22;
}

.nav-item .nav-link.nav-active .nav-line {
  display: inline-block;
  width: 20px;
  height: 2px;
  background: #ffbb22;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -10px;
}
</style>>