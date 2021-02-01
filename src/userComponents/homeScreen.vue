<template>
  <div class="app">
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
</template>

<script>
import swiper from "./Model/swiper";
import query from "./Model/query";
export default {
  components: {
    swiper,
    query,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
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
</style>
