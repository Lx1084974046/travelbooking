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
      <div class="list-nav">
        <span>&lt;前一天</span>
        <span>date</span>
        <span>后一天&gt;</span>
      </div>
      <div class="lists">
        <div
          class="ignorelist"
          @click="book(index)"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="time-info">
            <span>{{ item.time1 }}</span>
            <i></i>
            <span>{{ item.time2 }}</span>
          </div>
          <div class="locale-info">
            <span>{{ item.route1 }}</span>
            <span>{{ item.route2 }}</span>
          </div>
          <div class="bottom-info">
            <!-- <img
              :src="require('../../assets/airline/' + item.airline + '.png')"
              alt=""
            /> -->
            <!-- vue中图片在本地，路径是动态请求过来的，拼接图片路径必须要用require -->
            <span>{{ item.flightNum }}</span>
            <span>{{ item.type }}型机</span>
            <span>余票：{{ item.poll }}</span>
          </div>
          <div class="price">
            <span>¥{{ item.price }}</span>
            <span>经济舱</span>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      nologin: true,
      nodata: false,
    };
  },
  computed: {},
  watch: {},
  methods: {},
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
i {
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
.list-nav {
  width: 100%;
  display: flex;
  height: 6%;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
}
.list-nav span {
  margin: 0 6px;
  color: #87cefa;
  line-height: 22px;
}
.lists {
  width: 100%;
  height: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.lists .ignorelist {
  width: 92%;
  height: 118px;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  background-color: #fff;
  position: relative;
}
.ignorelist img {
  width: 20px;
  height: 20px;
}
.time-info,
.locale-info {
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}
.time-info {
  margin-top: 15px;
}
.time-info span {
  font-size: 26px;
}
.time-info i {
  display: inline-block;
  width: 100px;
  height: 30px;
  background: url("~@/assets/airline/arrow.png") center center no-repeat;
  background-size: cover;
}
.locale-info span {
  margin: 0 15px;
  color: #cdcdcd;
}
.bottom-info {
  width: 60%;
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 20px;
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
.bottom {
  width: 100%;
  height: 1px;
  margin-top: 10px;
}
</style>
