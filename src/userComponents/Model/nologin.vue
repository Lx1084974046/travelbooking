<template>
  <div class="app">
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
i {
  width: 300px;
  height: 300px;
  display: block;
  background: url("~@/assets/userimg/no-data.png");
  background-size: contain;
}
.btn {
  width: 100px;
  height: 30px;
}
.el-button {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}
</style>
