<template>
  <div class="query-app">
    <div class="query-list">
      <div class="list-nav">
        <span>&lt;前一天</span>
        <span>date</span>
        <span>后一天&gt;</span>
      </div>
      <div class="lists">
        <div class="ignorelist" @click="book">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="ignorelist">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="ignorelist">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="ignorelist">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="ignorelist">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="ignorelist">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="ignorelist">
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>武汉</span>
            <span>北京</span>
          </div>
          <div class="bottom-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>3U8626</span>
            <span>中型机</span>
            <span>余票：120</span>
          </div>
          <div class="price">
            <span>¥599</span>
            <span>经济仓</span>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
    <div class="book" v-if="bookShow"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      bookShow: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    book() {
      this.bookShow = true;
    },
  },
  mounted() {
    this.$store.commit("returnlogochange", true);
  },
  beforeDestroy() {
    this.$store.commit("returnlogochange", false);
  },
};
</script>

<style scoped>
.query-app {
  width: 100%;
  height: 85vh;
  position: absolute;
  top: 0;
  z-index: 9999;
  background-color: #f5f5f5;
}
.query-list {
  width: 100%;
  height: 85vh;
}
.list-nav {
  width: 100%;
  display: flex;
  height: 6%;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
}
.list-nav span {
  margin: 0 6px;
  color: #87cefa;
  line-height: 22px;
}
.lists {
  width: 100%;
  height: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.lists .ignorelist {
  width: 92%;
  height: 118px;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  background-color: #fff;
  position: relative;
}
.ignorelist img {
  width: 20px;
  height: 20px;
}
.time-info,
.locale-info {
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}
.time-info {
  margin-top: 15px;
}
.time-info span {
  font-size: 26px;
}
.time-info i {
  display: inline-block;
  width: 100px;
  height: 30px;
  background: url("~@/assets/airline/arrow.png") center center no-repeat;
  background-size: cover;
}
.locale-info span {
  margin: 0 15px;
  color: #cdcdcd;
}
.bottom-info {
  width: 60%;
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.bottom-info span {
  margin-left: 12px;
  font-size: 14px;
  color: #8a8a8a;
}
.price {
  position: absolute;
  top: 33px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.price span:nth-child(1) {
  font-size: 20px;
  color: #ffa500;
}
.price span:nth-child(2) {
  font-size: 13px;
  color: #dbdbdb;
}
.bottom {
  width: 100%;
  height: 1px;
  margin-top: 10px;
}
.book {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: yellow;
}
</style>
