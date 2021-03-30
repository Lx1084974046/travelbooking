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
import { bookcheck, book } from "@/api/index.js";
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
      "flightnumchange",
      "bookshowchange",
    ]),
    closeDialog() {
      store.commit("dialogshowchange", false);
      if (this.dialogbutton == "登录") {
        this.$router.push({ path: "/userHome/me/login" });
      }
      if (this.dialogbutton == "确认" && this.$route.name == "person") {
        localStorage.removeItem("logintoken");
        localStorage.removeItem("usertoken");
        this.$router.push({ path: "/userHome/me/nologin" });
      }
      if (!this.bookshow && this.$route.name == "homeScreen") {
        store.commit("queryshowchange", false);
      }
      if (this.bookshow && this.$route.name == "homeScreen") {
        console.log("success");
        let param1 = {
          account: localStorage.getExpire("usertoken").user_Account,
          flightNum: this.flightnum,
        };
        bookcheck(param1)
          .then((res) => {
            if (res.data == false) {
              book(param1)
                .then((res) => {
                  if (res.data) {
                    this.dialogshowchange(true);
                    this.dialogtitlechange("订票成功");
                    this.dialogcontentchange("祝您旅途愉快！");
                    this.dialogreturnsbuttonchange(true);
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
              this.dialogshowchange(true);
              this.dialogtitlechange("订票失败");
              this.dialogcontentchange("您已经订购过该航班");
              this.dialogreturnsbuttonchange(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    cancel() {
      this.dialogshowchange(false);
      if (this.bookshow && this.$route.name == "homeScreen") {
        this.bookshowchange(false);
      }
    },
  },
  beforeDestroy() {
    this.dialogbuttonchange(false);
    this.dialogreturnsbuttonchange(false);
  },
};
</script>

<style scoped>
.tips {
  width: 100%;
  height: 106vh;
  background-color: rgba(0, 0, 0, 0.3);
}
.tipsmodel {
  width: 75%;
  height: 25%;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 45%;
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
