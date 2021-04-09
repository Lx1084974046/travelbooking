<template>
  <div class="tips" @touchmove.prevent>
    <div class="tipsmodel">
      <div class="tit">{{ this.dialogtitle }}</div>
      <span>{{ this.dialogcontent }}</span>
      <div class="btn">
        <el-button
          @click="closeDialog"
          type="primary"
          v-if="this.dialogbutton"
          >{{ this.dialogbutton }}</el-button
        >
        <!-- 一个操作按钮，一个单纯关闭弹窗按钮 -->
        <el-button @click="cancel" type="success" v-if="this.returns"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { rebook, bookcheck, book, refund, delDynamic } from "@/api/index.js";
import store from "@/store";
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "dialogtitle",
      "dialogcontent",
      "dialogbutton",
      "returns",
      "bookshow",
      "flightnum",
      "cabinnum",
      "oldnum",
      "newnum",
      "dynum",
    ]),
  },
  watch: {},
  methods: {
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
      "dialogreturnsbuttonchange",
      "bookshowchange",
      "reloadchange",
      "queryshowchange",
      "senddynamicshowchange",
      "mydynamicshowchange",
    ]),
    closeDialog() {
      //执行关闭弹窗并处理相关操作
      store.commit("dialogshowchange", false);
      if (this.dialogbutton == "登录") {
        this.$router.push({ path: "/userHome/me/login" });
      } //注销
      if (this.dialogbutton == "确认" && this.$route.name == "person") {
        localStorage.removeItem("logintoken");
        localStorage.removeItem("usertoken");
        localStorage.removeItem("userorderlisttoken");
        localStorage.removeItem("mydynamictoken");
        this.$router.push({ path: "/userHome/me/nologin" });
      }
      //删除动态
      if (this.dialogbutton == "删除" && this.$route.name == "person") {
        delDynamic({ img: this.dynum })
          .then((res) => {
            if (res.data == true) {
              localStorage.removeItem("mydynamictoken");
              this.reloadchange();
            }
          })
          .catch();
      }
      if (!this.bookshow && this.$route.name == "homeScreen") {
        store.commit("queryshowchange", false);
      }
      //订票
      if (this.bookshow && this.$route.name == "homeScreen") {
        let param1 = {
          account: localStorage.getExpire("usertoken").user_Account,
          flightNum: this.flightnum,
          cabin: this.cabinnum,
        };
        //验证用户是否已经购买该航班的票，从userordertoken获取信息
        let flag = true;
        for (
          var i = 0;
          i < localStorage.getExpire("userorderlisttoken").length;
          i++
        ) {
          if (
            this.flightnum ==
            localStorage.getExpire("userorderlisttoken")[i].flightNum.slice(4)
          ) {
            console.log(flag);
            flag = false;
            console.log(flag);
          }
        }
        if (flag == true) {
          book(param1)
            .then((res) => {
              if (res.data) {
                this.dialogshowchange(true);
                this.dialogtitlechange("订票成功");
                this.dialogcontentchange("祝您旅途愉快！");
                this.dialogreturnsbuttonchange(true);
                //订票成功更新用户订单信息
                localStorage.removeItem("userorderlisttoken");
                this.$router.push({ path: "/userHome/travel" });
              } else {
                this.dialogshowchange(true);
                this.dialogtitlechange("订票失败");
                this.dialogcontentchange("请重新订票！");
                this.dialogreturnsbuttonchange(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.dialogbuttonchange("");
          this.dialogshowchange(true);
          this.dialogtitlechange("订票失败");
          this.dialogcontentchange("您已经订购过该航班");
          this.dialogreturnsbuttonchange(true);
        }
      }
      //退票
      if (this.$route.name == "travel") {
        console.log("147");
        let param2 = {
          account: localStorage.getExpire("usertoken").user_Account,
          flightNum: this.flightnum,
        };
        refund(param2)
          .then((res) => {
            console.log(res);
            if (res.data) {
              //这里似乎无法用js数组方法改变localStorageSession的信息
              // console.log(param2.flightNum);
              // var temp = localStorage
              //   .getExpire("userordertoken")
              //   .findIndex((item, index) => {
              //     //蜜汁问题，循环到满足条件的，还是返回-1，于是利用该方法遍历，设置自行判断和返回
              //     if (item.flightNum == param2.flightNum) {
              //       return index;
              //     }
              //   });
              // console.log(temp);
              // localStorage.getExpire("userordertoken").splice(temp, 1);
              //用户航班发生变化更新用户订单信息
              localStorage.removeItem("userorderlisttoken");
              this.reloadchange();
            } else {
              console.log(res);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      //改签
      if (this.$route.name == "travel" && this.dialogbutton == "改签") {
        let param3 = {
          account: localStorage.getExpire("usertoken").user_Account,
          oldnum: this.oldnum.slice(4),
          newnum: this.newnum,
        };
        rebook(param3)
          .then((res) => {
            console.log(res);
            //用户航班发生变化更新用户订单信息
            localStorage.removeItem("userorderlisttoken");
            this.reloadchange();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    cancel() {
      this.dialogshowchange(false);
      if (!this.bookshow && this.$route.name == "homeScreen") {
        this.queryshowchange(false);
        this.bookshowchange(false);
      }
      if (this.bookshow && this.$route.name == "homeScreen") {
        this.bookshowchange(false);
      }
    },
  },
  beforeDestroy() {
    this.dialogbuttonchange("");
    this.dialogreturnsbuttonchange(false);
  },
};
</script>

<style scoped>
.tips {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tipsmodel {
  width: 75%;
  height: 25%;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tit {
  font-size: 20px;
  margin-bottom: 20px;
}
.el-button {
  margin-top: 20px;
}
span {
  text-align: center;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>