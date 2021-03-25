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
            <span>经济舱</span>
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
    <transition>
      <div class="book" v-if="this.$store.state.bookshow">
        <div class="book-list">
          <div class="top-info">
            <img src="@/assets/airline/3U.png" alt="" />
            <span>川航3U8626</span>
            <span>空客A321(中)</span>
            <span>12月30日</span>
          </div>
          <div class="time-info">
            <span>10:00</span>
            <i></i>
            <span>12:00</span>
          </div>
          <div class="locale-info">
            <span>天河T2</span>
            <span>首都T2</span>
          </div>

          <div class="service-info">
            <span>有餐食</span>
            <span class="space">|</span>
            <span>免费行李</span>
            <span class="space">|</span>
            <span>出票速度快</span>
            <span class="space">|</span>
            <span>提供7*24h客服</span>
          </div>
          <div class="bottom-tip">
            <img src="@/assets/airline/tip.png" alt="" />
            <span>未避免航班价格变动，请尽快购票</span>
          </div>
        </div>
        <div class="choose-tip">
          <img src="@/assets/airline/plane-tip.png" alt="" />
          <span>请选择产品价格</span>
        </div>
        <div class="choose-cabin">
          <div class="cabin">
            <div class="cabin-top">
              <span>经济舱</span>
              <span class="cabin-price">¥599</span>
              <el-radio v-model="cabin" label="1"><br /></el-radio>
            </div>
            <div class="cabin-bottom">
              <span>经济舱3折起</span>
              <span class="space">|</span>
              <span>退改102元起</span>
              <span class="space">|</span>
              <span>托运行李额20KG</span>
            </div>
          </div>
          <hr color="#e6e6e6" />
          <div class="cabin cabin2">
            <div class="cabin-top">
              <span>公务舱</span>
              <span class="cabin-price">¥1299</span>
              <el-radio v-model="cabin" label="2"><br /></el-radio>
            </div>
            <div class="cabin-bottom">
              <span>公务舱2折起</span>
              <span class="space">|</span>
              <span>退改200元起</span>
              <span class="space">|</span>
              <span>托运行李额30KG</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      bookShow: false,
      cabin: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    book() {
      this.$store.commit("bookshowchange", true);
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
  background-color: #e6e6e6;
}
.v-enter {
  opacity: 0.3;
  transform: translateY(100%);
}
.v-leave-to {
  opacity: 0.3;
  transform: translateY(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
<style lang="stylus" scoped>
.book-list {
  width: 92%;
  height: 190px;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  .top-info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;

    img {
      width: 20px;
      height: 20px;
    }

    span {
      margin: 0 6px;
    }
  }

  .time-info {
    margin: 16px auto;
    margin-bottom: 2px;
  }

  .locale-info {
    margin: 0 auto;
    font-size: 14px;

    span {
      color: #000;
      margin: 0 8px;
    }
  }

  .service-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    span {
      font-size: 13px;
      color: #cdcdcd;
    }

    .space {
      margin: 0 5px;
    }
  }

  .bottom-tip {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    span {
      font-size: 16px;
      color: #f27000;
    }
  }
}

.choose-tip {
  display: flex;
  align-items: center;
  margin-left: 4%;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    font-size: 18px;
    color: #1296db;
  }
}

.choose-cabin {
  width: 92%;
  height: 160px;
  background-color: #fff;
  border-radius: 6px;
  margin: 5px auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  hr {
    width: 90%;
    margin: 10px auto;
  }

  .cabin2 {
    padding: 0 !important;
  }

  .cabin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 18px;

    .cabin-top {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 20px;
      }

      .cabin-price {
        margin-left: 170px;
        color: #f27000;
        font-weight: bold;
        font-size: 22px;
      }
    }

    .cabin-bottom {
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: #cdcdcd;
        font-size: 14px;
      }

      .space {
        margin: 0 6px;
      }
    }
  }
}
</style>
<style>
.el-radio__inner {
  width: 20px;
  height: 20px;
}
</style>
