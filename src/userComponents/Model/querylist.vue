<template>
  <div class="query-app">
    <div class="query-list">
      <div class="list-nav">
        <span @click="left">&lt;前一天</span>
        <span>{{ this.ondate | dateFormat }}</span>
        <span @click="right">后一天&gt;</span>
      </div>
      <div class="lists" v-if="listshow">
        <div
          class="ignorelist"
          @click="book(index)"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="time-info">
            <span>{{ item.time1 }}</span>
            <i></i>
            <span>{{ item.time2 }}</span>
          </div>
          <div class="locale-info">
            <span>{{ item.route1 }}</span>
            <span>{{ item.route2 }}</span>
          </div>
          <div class="bottom-info">
            <img
              :src="require('../../assets/airline/' + item.airline + '.png')"
              alt=""
            />
            <!-- vue中图片在本地，路径是动态请求过来的，拼接图片路径必须要用require -->
            <span class="flightNum">{{ item.flightNum }}</span>
            <span>{{ item.type }}型机</span>
            <span
              :style="
                item.poll > 60
                  ? 'color:#00ff00'
                  : item.poll > 30
                  ? 'color:#ffa500'
                  : 'color:#F56C6C'
              "
              >余票：{{ item.poll }}</span
            >
          </div>
          <div class="price">
            <span>¥{{ item.price }}</span>
            <span>经济舱</span>
          </div>
        </div>
        <div class="bottom" :style="isIphone ? 'margin-top:8vh' : ''"></div>
      </div>
    </div>
    <transition>
      <div class="book" v-if="this.$store.state.bookshow">
        <div class="book-list">
          <div class="top-info">
            <img
              :src="
                require('../../assets/airline/' + this.books.airline + '.png')
              "
              alt=""
            />
            <span>{{ this.books.flightNum }}</span>
            <span>{{ this.books.plane }}</span>
            <span>{{ this.books.date | dateFormat }}</span>
          </div>
          <div class="time-info">
            <span>{{ this.books.time1 }}</span>
            <i></i>
            <span>{{ this.books.time2 }}</span>
          </div>
          <div class="locale-info">
            <span>{{ this.books.airport1 }}</span>
            <span>{{ this.books.airport2 }}</span>
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
              <span class="cabin-price">¥{{ this.books.price }}</span>
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
              <span class="cabin-price">¥{{ this.books.price + 1100 }}</span>
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
        <el-button class="order" type="primary" round @click="order"
          >订&nbsp;票</el-button
        >
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { queryList } from "@/api/index.js";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      isIphone: false,
      listshow: true, //刷新list
      tipsdate: null,
      currentdate: null,
      bookShow: false,
      cabin: "1",
      list: null,
      ondate: null, //一直保持时间戳格式
      route1: "",
      route2: "",
      books: {
        flightNum: "",
        plane: "",
        date: "",
        time1: "",
        time2: "",
        price: "",
        airline: "",
        airport1: "",
        airport2: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
      "dialogreturnsbuttonchange",
      "flightnumchange",
      "cabinnumchange",
      "queryshowchange",
      "reloadchange",
      "Loadingchange",
    ]),
    //更新页面数据
    handleUpdateClick() {
      // built-in
      this.reloadchange();
      console.log("接收到变化");
    },
    left() {
      //Date.parse()将日期字符串转时间戳 若字符无法识别返回NaN
      if (this.ondate == Date.parse(this.currentdate)) {
        this.dialogshowchange(true);
        this.dialogtitlechange("暂无数据");
        this.dialogcontentchange("无法查看历史航班");
        this.dialogreturnsbuttonchange(true);
      } else {
        this.Loadingchange(true);
        // let temp = Vue.filter("dateFormat");
        this.ondate = new Date(this.ondate).setDate(
          new Date(this.ondate).getDate() - 1
        );
        //toLocaleDateString()月日 toLocaleTimeString()时间 toLocaleString()YMDhms
        let param1 = {
          date: new Date(this.ondate).toLocaleDateString(),
          route1: this.route1,
          route2: this.route2,
        };
        console.log("qaaa");
        queryList(param1)
          .then((res) => {
            this.Loadingchange(false);
            console.log(res);
            if (res.data != false) {
              console.log(res.data);
              localStorage.setExpire("querytoken", res.data);
              this.handleUpdateClick();
            } else {
              this.dialogshowchange(true);
              this.dialogtitlechange("暂无数据");
              this.dialogcontentchange("航班暂无排班");
              this.dialogreturnsbuttonchange(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    right() {
      //获取全局过滤器
      // let temp = Vue.filter("dateFormat");
      //temp(~)
      //setDate设置时间为所在月份的某一天 getDate获取时间所在月份的第几天
      //过滤器moment插件是以国际时间为准,北京时间比国际时间快8h
      this.ondate = new Date(this.ondate).setDate(
        new Date(this.ondate).getDate() + 1
      );
      console.log(Date.parse(new Date(this.ondate).toLocaleDateString()));
      if (
        Date.parse(new Date(this.ondate).toLocaleDateString()) >
        Date.parse(
          new Date(
            new Date().setDate(new Date().getDate() + 4)
          ).toLocaleDateString()
        )
      ) {
        console.log(Date.parse(new Date(this.ondate).toLocaleDateString()));
        console.log(
          Date.parse(
            new Date(
              new Date().setDate(new Date().getDate() + 5)
            ).toLocaleDateString()
          )
        );
        this.dialogshowchange(true);
        this.dialogtitlechange("暂无数据");
        this.dialogcontentchange("只能查看五天内的航班");
        this.dialogreturnsbuttonchange(true);
      } else {
        this.Loadingchange(true);
        let param2 = {
          date: new Date(this.ondate).toLocaleDateString(),
          route1: this.route1,
          route2: this.route2,
        };
        console.log("qaaa");
        queryList(param2)
          .then((res) => {
            this.Loadingchange(false);
            console.log(res);
            if (res.data != false) {
              console.log(res.data);
              localStorage.setExpire("querytoken", res.data);
              this.handleUpdateClick();
            } else {
              this.dialogshowchange(true);
              this.dialogtitlechange("暂无数据");
              this.dialogcontentchange("航班暂无排班");
              this.dialogreturnsbuttonchange(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    order() {
      if (localStorage.getExpire("logintoken")) {
        this.dialogshowchange(true);
        this.dialogtitlechange("订票");
        //记录当前舱类传递给显示时用
        this.cabinnumchange(this.cabin);
        if (this.cabin == "1") {
          this.dialogreturnsbuttonchange(true);
          this.dialogcontentchange("您已选择经济舱，确认订票？");
        } else {
          this.dialogreturnsbuttonchange(true);
          this.dialogcontentchange("您已选择公务舱，确认订票？");
        }
        this.dialogbuttonchange("确认");
      } else {
        this.dialogshowchange(true);
        this.dialogtitlechange("订票失败");
        this.dialogcontentchange("请先登录再订票");
        this.dialogbuttonchange("登录");
      }
      console.log(this.cabin);
    },
    book(index) {
      //记录当前航班号传递给确认订票时用
      this.flightnumchange(this.list[index].flightNum);
      this.books.flightNum = this.list[index].flightNum;
      switch (this.books.flightNum.slice(0, 2)) {
        case "3U":
          this.books.flightNum = "川航" + this.books.flightNum;
          break;
        case "CA":
          this.books.flightNum = "国航" + this.books.flightNum;
          break;
        case "HU":
          this.books.flightNum = "海航" + this.books.flightNum;
          break;
        case "CZ":
          this.books.flightNum = "南航" + this.books.flightNum;
          break;
        case "MF":
          this.books.flightNum = "厦航" + this.books.flightNum;
          break;
        case "MU":
          this.books.flightNum = "东航" + this.books.flightNum;
          break;
      }
      this.books.plane = this.list[index].plane;
      switch (this.books.plane.slice(0, 1)) {
        case "A":
          this.books.plane =
            "空客" + this.books.plane + "(" + this.list[index].type + ")";
          break;
        case "B":
          this.books.plane =
            "波音" + this.books.plane + "(" + this.list[index].type + ")";
          break;
      }
      this.books.date = this.list[index].date;
      this.books.time1 = this.list[index].time1;
      this.books.time2 = this.list[index].time2;
      this.books.price = this.list[index].price;
      this.books.airline = this.list[index].airline;
      this.books.airport1 = this.list[index].airport1;
      this.books.airport2 = this.list[index].airport2;
      this.$store.commit("bookshowchange", true);
    },
  },
  mounted() {
    // navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i) 匹配iphone
    // navigator.userAgent.indexOf("Safari") > -1chrome浏览器也包含safari字段
    if (
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent)
    ) {
      this.isIphone = true;
      console.log("safari");
    }
    this.currentdate = new Date().toLocaleDateString();
    this.$store.commit("returnlogochange", true);
    //localStorage无数据时为false
    //渲染list
    console.log("gengxin");
    this.list = localStorage.getExpire("querytoken");
    this.ondate = this.list[0].date; //显示查询日期
    this.route1 = this.list[0].route1; //获取查询地址
    this.route2 = this.list[0].route2;
    //2021-04-01T16:00:00.000Z utc通用标准时 也可用moment转化
    this.ondate = new Date(this.ondate).setDate(
      new Date(this.ondate).getDate()
    ); //ondate为时间戳格式
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 9;
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
  margin-bottom: 6px;
}
.bottom-info .flightNum {
  width: 56px;
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

.order {
  margin-top: 6px;
  width: 60%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
<style>
.el-radio__inner {
  width: 20px;
  height: 20px;
}
</style>
