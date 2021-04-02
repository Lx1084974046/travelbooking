<template>
  <div class="app">
    <div class="nologin" v-if="nologin">
      <i></i>
      <el-tag>未登录无法查看</el-tag>
    </div>
    <div class="init" v-else-if="nodata">
      <img src="@/assets/userimg/earth.png" alt="" />
      <el-tag>暂无行程</el-tag>
      <span class="init-text">世界很大，发现美好</span>
    </div>
    <div class="travel-list" v-else>
      <div class="lists">
        <div class="ignorelist" v-for="(item, index) in list" :key="index">
          <div class="bottom-info">
            <span>{{ item.date | dateFormat }}</span>
            <img
              :src="require('.././assets/airline/' + item.airline + '.png')"
              alt=""
            />
            <!-- vue中图片在本地，路径是动态请求过来的，拼接图片路径必须要用require -->
            <span>{{ item.flightNum }}</span>
            <span>{{ item.plane }}({{ item.type }})</span>
          </div>
          <hr />
          <div class="time-info">
            <span>{{ item.time1 }}</span>
            <span class="route">{{ item.route1 }}</span>

            <i></i>
            <span class="route">{{ item.route2 }}</span>
            <span>{{ item.time2 }}</span>
          </div>
          <div class="locale-info">
            <span>{{ item.airport1 }}</span>
            <span>{{ item.airport2 }}</span>
          </div>
          <span
            class="cabin"
            :style="item.cabin == '公务舱' ? 'color:#67C23A' : ''"
            >{{ item.cabin }}</span
          >
          <div class="bottom-btn">
            <i @click="rebook(item.flightNum)">改签</i>
            <i @click="refund(item.flightNum)">退票</i>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryUserList } from "@/api/index.js";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      nologin: true,
      nodata: false,
      list: [],
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
    ]),
    rebook() {
      console.log("改签");
    },
    refund(index) {
      this.flightnumchange(index.slice(4));
      this.dialogshowchange(true);
      this.dialogtitlechange("退票");
      this.dialogcontentchange("您确认取消本次旅行？");
      this.dialogbuttonchange("确认");
      this.dialogreturnsbuttonchange(true);
    },
    getUserOrder() {
      queryUserList({
        account: localStorage.getExpire("logintoken"),
      })
        .then((res) => {
          //拿到详细信息数据进行数据处理
          if (res.data == false) {
            //没有订单时，设置nodata 但本地缓存了userorderlisttoken
            this.nodata = true;
            console.log("nono");
          }
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].cabin == 1) {
              res.data[i].cabin = "经济舱";
            } else {
              res.data[i].cabin = "公务舱";
            }
            switch (res.data[i].flightNum.slice(0, 2)) {
              case "3U":
                res.data[i].flightNum = "四川航空" + res.data[i].flightNum;
                break;
              case "CA":
                res.data[i].flightNum = "中国国航" + res.data[i].flightNum;
                break;
              case "HU":
                res.data[i].flightNum = "海南航空" + res.data[i].flightNum;
                break;
              case "CZ":
                res.data[i].flightNum = "南方航空" + res.data[i].flightNum;
                break;
              case "MF":
                res.data[i].flightNum = "厦门航空" + res.data[i].flightNum;
                break;
              case "MU":
                res.data[i].flightNum = "东方航空" + res.data[i].flightNum;
                break;
            }
            switch (res.data[i].plane.slice(0, 1)) {
              case "A":
                res.data[i].plane = "空客" + res.data[i].plane;
                break;
              case "B":
                res.data[i].plane = "波音" + res.data[i].plane;
                break;
            }
            this.list.push(res.data[i]);
          }
          // console.log(this.list);
          //请求完所有详细信息数据，将数据缓存，减少API请求
          localStorage.setExpire("userorderlisttoken", this.list);
        })
        .catch((errot) => {
          console.log(errot);
        });
    },
    //async&await 等待异步任务执行完再进入下一次循环 await后面必须是Promise对象
    //从userordertoken获取用户航班号，再去请求航班详细信息
    // async getUserOrder() {
    //   for (
    //     var i = 0;
    //     i < localStorage.getExpire("userordertoken").length;
    //     i++
    //   ) {
    //     await queryUserList({
    //       flightNum: localStorage.getExpire("userordertoken")[i].flightNum,
    //     })
    //       .then((res) => {
    //         if (localStorage.getExpire("userordertoken")[i].cabin == 1) {
    //           res.data[0].cabin = "经济舱";
    //         } else {
    //           res.data[0].cabin = "公务舱";
    //         }
    //         switch (res.data[0].flightNum.slice(0, 2)) {
    //           case "3U":
    //             res.data[0].flightNum = "四川航空" + res.data[0].flightNum;
    //             break;
    //           case "CA":
    //             res.data[0].flightNum = "中国国航" + res.data[0].flightNum;
    //             break;
    //           case "HU":
    //             res.data[0].flightNum = "海南航空" + res.data[0].flightNum;
    //             break;
    //           case "CZ":
    //             res.data[0].flightNum = "南方航空" + res.data[0].flightNum;
    //             break;
    //           case "MF":
    //             res.data[0].flightNum = "厦门航空" + res.data[0].flightNum;
    //             break;
    //           case "MU":
    //             res.data[0].flightNum = "东方航空" + res.data[0].flightNum;
    //             break;
    //         }
    //         switch (res.data[0].plane.slice(0, 1)) {
    //           case "A":
    //             res.data[0].plane = "空客" + res.data[0].plane;
    //             break;
    //           case "B":
    //             res.data[0].plane = "波音" + res.data[0].plane;
    //             break;
    //         }
    //         this.list.push(res.data[0]);
    //         //请求完所有详细信息数据，将数据缓存，减少API请求
    //         if (i == localStorage.getExpire("userordertoken").length - 1) {
    //           localStorage.setExpire("userorderlisttoken", this.list);
    //         }
    //       })
    //       .catch((errot) => {
    //         console.log(errot);
    //       });
    //   }
    // },
  },
  created() {},
  mounted() {
    if (localStorage.getExpire("logintoken")) {
      this.nologin = false;
      //缓存请求数据，减少接口访问
      if (localStorage.getExpire("userorderlisttoken")) {
        console.log("存在");
        this.list = localStorage.getExpire("userorderlisttoken");
        //请求数据时，本地缓存了userorderlisttoken(不管有没有订单)
        if (this.list.length == 0) {
          this.nodata = true;
        }
      } else {
        console.log("不存在");
        this.getUserOrder();
      }
    }
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin-top: 50px;
}
.nologin i {
  width: 300px;
  height: 300px;
  display: block;
  background: url("~@/assets/userimg/no-data.png");
  background-size: contain;
}
.init,
.nologin {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}
.el-tag {
  font-size: 18px;
}
.init-text {
  margin-top: 10px;
  font-size: 26px;
  color: #67c23a;
}

.travel-list {
  width: 100%;
  height: 85vh;
}
.lists {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.lists .ignorelist {
  width: 92%;
  height: 135px;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ignorelist img {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.time-info,
.locale-info {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.locale-info {
  margin-bottom: 37px;
}
.time-info span {
  font-size: 26px;
}
.time-info .route {
  font-size: 14px;
}
.time-info i {
  display: inline-block;
  width: 40px;
  height: 10px;
  background: url("~@/assets/airline/link.png") center center no-repeat;
  background-size: cover;
}
.locale-info span {
  font-size: 15px;
  margin: 0 6px;
  color: #cdcdcd;
}
.bottom-info {
  width: 86%;
  display: flex;
  align-items: center;
  margin-top: 10px;
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
.bottom-btn {
  position: absolute;
  right: 0;
  bottom: 0;
}
.bottom-btn i {
  font-style: normal;
  display: inline-block;
  width: 50px;
  height: 25px;
  line-height: 25px;
  background-color: #ffa500;
  margin-right: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
}
.bottom {
  width: 100%;
  height: 1px;
  margin-top: 10px;
}
hr {
  width: 100%;
  color: #cdcdcd;
  margin: 0;
  margin-bottom: 2px;
}
.cabin {
  color: #cdcdcd;
  position: absolute;
  bottom: 8px;
  left: 10px;
}
</style>
