<template>
  <div class="app">
    <div class="open">
      <swiper />
      <query />
      <table>
        <tr>
          <td>旅游</td>
          <td>门票</td>
          <td>周边游</td>
        </tr>
        <tr>
          <td>机票</td>
          <td>酒店</td>
          <td>接送机</td>
        </tr>
        <tr>
          <td>景点</td>
          <td>美食</td>
          <td>购物</td>
        </tr>
      </table>
    </div>
    <transition>
      <querylist v-if="this.$store.state.queryshow" />
    </transition>
  </div>
</template>

<script>
import swiper from "./Model/swiper";
import query from "./Model/query";
import querylist from "./Model/querylist";
export default {
  components: {
    swiper,
    query,
    querylist,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    document.documentElement.style.overflow = "hidden";
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin-top: 50px;
}
table {
  width: 96%;
  height: 160px;
  margin-top: 10px;
  border-radius: 10px;
  color: #fff;
  text-align: center;
}
td {
  width: 52.66px;
  border-radius: 5px;
  vertical-align: middle;
}
td:nth-child(1) {
  background-color: #00ff00;
}
td:nth-child(2) {
  background-color: #409eff;
}
td:nth-child(3) {
  background-color: #ffc0cb;
}
.open {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.v-enter {
  opacity: 0.3;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0.3;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
