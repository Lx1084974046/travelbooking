<template>
  <div class="tips">
    <div class="tipsmodel">
      <div class="tit">{{ this.dialogtitle }}</div>
      <span>{{ this.dialogcontent }}</span>
      <el-button @click="closeDialog" type="primary">{{
        this.dialogbutton
      }}</el-button>
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
    ...mapState(["dialogtitle", "dialogcontent", "dialogbutton"]),
  },
  watch: {},
  methods: {
    closeDialog() {
      store.commit("dialogshowchange", false);
      if (this.dialogbutton == "登录") {
        this.$router.push({ path: "/userHome/me/login" });
      }
    },
  },
};
</script>

<style scoped>
.tips {
  width: 100%;
  height: 100%;
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
</style>
