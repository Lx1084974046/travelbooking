<template>
  <div class="app-nologin">
    <i></i>
    <el-row>
      <el-button type="primary" @click="goLogin">未登录</el-button></el-row
    >
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  methods: {
    goLogin() {
      this.$router.push({ path: "/userHome/me/login" });
    },
  },
};
</script>

<style scoped>
.app-nologin {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 50px;
}
i {
  width: 300px;
  height: 300px;
  display: block;
  background: url("~@/assets/userimg/no-data.png");
  background-size: contain;
  margin-top: 60px;
}
.btn {
  width: 100px;
  height: 30px;
}
.el-button {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}
</style>
