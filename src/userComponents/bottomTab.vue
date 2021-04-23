<template>
  <div class="app">
    <div
      @click="goHome"
      :style="
        this.$route.path.search('home') != -1
          ? 'color:#409eff'
          : 'color:#A9A9A9'
      "
    >
      首页
    </div>
    <div
      @click="goDynamic"
      :style="
        this.$route.path.search('dynamic') != -1
          ? 'color:#409eff'
          : 'color:#A9A9A9'
      "
    >
      动态圈
    </div>
    <div
      @click="goTravel"
      :style="
        this.$route.path.search('travel') != -1
          ? 'color:#409eff'
          : 'color:#A9A9A9'
      "
    >
      行程
    </div>
    <div
      @click="goMe"
      :style="
        this.$route.path.search('userHome/me') != -1
          ? 'color:#409eff'
          : 'color:#A9A9A9'
      "
    >
      我
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(["titlechange"]),
    goHome() {
      this.$router.push({ path: "/userHome/home" });
    },
    goDynamic() {
      this.$router.push({ path: "/userHome/dynamic" });
    },
    goTravel() {
      this.$router.push({ path: "/userHome/travel" });
    },
    goMe() {
      if (localStorage.getExpire("logintoken")) {
        this.$router.push({ path: "/userHome/me/person" });
      } else {
        this.$router.push({ path: "/userHome/me" });
      }
    },
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 8vh;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex: 4;
  position: fixed;
  bottom: 0;
  box-shadow: 0 -1px 2px 1px rgba(0, 0, 0, 0.1);
}
div {
  flex: 1;
  display: flex;
  color: #a9a9a9;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
