<template>
  <div class="tips" @touchmove.prevent>
    <div class="tipsmodel">
      <div class="tit">{{ this.dialogtitle }}</div>
      <span>{{ this.dialogcontent }}</span>
      <div class="btn">
        <el-button @click="closeDialog" type="primary">{{
          this.dialogbutton
        }}</el-button>
        <el-button @click="cancel" type="success" v-if="this.returns"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState(["dialogtitle", "dialogcontent", "dialogbutton", "returns"]),
  },
  watch: {},
  methods: {
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
      if (this.dialogbutton == "返回" && this.$route.name == "homeScreen") {
        store.commit("queryshowchange", false);
      }
    },
    cancel() {
      store.commit("dialogshowchange", false);
      store.commit("dialogreturnsbuttonchange", false);
    },
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
  margin-top: 10px;
}
span {
  text-align: center;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>
