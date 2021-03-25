<template>
  <div class="block">
    <img class="plane" src="~@/assets/userimg/plane.png" alt="" />
    <div class="place">
      <span>出发地</span>
      <span>到达地</span>
    </div>
    <div class="mid">
      <input type="text" placeholder="武汉" />
      <img src="~@/assets/userimg/dArrow.png" alt="" />
      <input type="text" placeholder="北京" />
    </div>
    <div class="date">
      <el-date-picker
        v-model="date"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        :editable="false"
        :clearable="false"
        align="center"
        :picker-options="pickerOptions"
        @focus="focus"
        @blur="blur"
        @change="change"
      >
      </el-date-picker>
    </div>
    <div class="btn" @click="query">搜索</div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      date: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; // - 8.64e7 表示可选择当天时间
        },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    focus() {
      document.documentElement.style.overflow = "hidden";
    },
    blur() {
      document.documentElement.style.overflow = "";
    },
    query() {
      this.$store.commit("queryshowchange", true);
    },
    change() {
      console.log(this.date);
    },
  },
};
</script>
<style scoped>
.block {
  width: 96%;
  height: 235px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.plane {
  width: 64px;
  height: 64px;
}
.place span {
  margin: 60px;
  font-size: 20px;
}
input {
  width: 50px;
  height: 40px;
  margin: 0 49px;
  border: 0;
  outline: none;
  font-size: 20px;
  text-align: center;
}
.mid {
  border-bottom: 2px solid rgb(235, 232, 232);
}
.mid img {
  width: 26px;
  height: 26px;
  vertical-align: middle;
}
.date span {
  display: block;
  margin: 5px;
  font-size: 20px;
}
.btn {
  width: 300px;
  height: 40px;
  color: #fff;
  background-color: #1296db;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
}
</style>
<style>
.el-date-editor.el-input {
  width: 108px !important;
}
.el-input__inner {
  border: unset;
  padding-right: 0 !important;
}
.el-date-picker__header {
  margin: 3px 12px !important;
}
.el-picker-panel__content {
  margin: 0 15px !important;
}
.el-date-table td {
  padding: 3px 2px;
}
.el-date-table td.disabled div {
}
.el-date-table th {
  padding: 2px 5px;
}
</style>
