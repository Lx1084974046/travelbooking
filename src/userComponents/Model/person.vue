<template>
  <div class="per">
    <div class="btn">
      <i></i>
      <span class="id1">ID:</span>
    </div>
    <div class="btn1"><span>出生日期</span><i>></i></div>
    <div class="btn1"><span>身份证号</span><i>></i></div>
    <div class="btn1"><span>修改个人资料</span><i>></i></div>
    <div class="btn1"><span>我的动态</span><i>></i></div>
    <el-row><el-button type="danger" round>注销登录</el-button></el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {},
};
</script>

<style scoped>
.per {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  display: flex;
  height: 100px;
  width: 100%;
  background-color: #fff;
  align-items: center;
  margin-bottom: 15px;
}
.btn i {
  display: block;
  width: 90px;
  height: 90px;
  background-color: cadetblue;
  border-radius: 50%;
  margin: 0 50px;
}
.id1 {
  color: #c0c0c0;
}
.btn1 {
  height: 45px;
  width: 100%;
  background-color: #fff;
  line-height: 45px;
  border: 1px solid rgb(235, 232, 232);
  position: relative;
}
.btn1 span {
  margin-left: 20px;
}
.btn1 i {
  font-style: normal;
  position: absolute;
  right: 25px;
  color: #c0c0c0;
}
.el-button {
  width: 300px;
  margin-top: 13px;
}
</style>
