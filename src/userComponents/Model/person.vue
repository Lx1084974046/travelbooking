<template>
  <div class="per">
    <div class="btn">
      <i></i>
      <div class="ins">
        <span>昵称：</span>
        <span class="id1">ID:{{ this.ID }}</span>
      </div>
    </div>
    <div class="btn1">
      <span>身份证号</span><i>{{ this.IDcard }}</i>
    </div>
    <div class="btn1"><span>修改个人资料</span><i>></i></div>
    <div class="btn1"><span>我的动态</span><i>></i></div>
    <el-row
      ><el-button type="danger" round @click="loginout"
        >注销登录</el-button
      ></el-row
    >
  </div>
</template>

<script>
import store from "@/store";
import { mapMutations } from "vuex";
import { userFind } from "@/api/index.js";
export default {
  name: "",
  data() {
    return {
      ID: "123",
      昵称: "",
      IDcard: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
    ]),
    getUser() {
      //登录后获取用户个人信息
      if (localStorage.getExpire("token") == null) {
        this.dialogtitlechange("身份信息过期");
        this.dialogcontentchange("请重新登录");
        this.dialogbuttonchange("登录");
        this.dialogshowchange(true);
      } else {
        userFind({ account: localStorage.getExpire("token") })
          .then((res) => {
            console.log(1111);
            console.log(res.data);
            this.ID = res.data[0].user_Account;
            this.IDcard = res.data[0].user_IDcard;
          }) //此处已经起到登录判断的作用
          .catch((error) => {
            this.dialogtitlechange("Error");
            this.dialogcontentchange(error);
            this.dialogbuttonchange("关闭");
            this.dialogshowchange(true);
          });
      }
    },
    loginout() {
      this.dialogtitlechange("注意");
      this.dialogcontentchange("您确认退出当前登录状态");
      this.dialogbuttonchange("确认");
      this.dialogshowchange(true);
    },
  },
  //此处还未获取到实例，this无效
  beforeRouteEnter(to, from, next) {
    store.commit("personchange", true);
    next();
  },
  mounted() {
    this.getUser(); //页面挂载时，进行用户数据获取，顺便进行了判断登录状态
  },
};
</script>

<style scoped>
.per {
  width: 100%;
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
  margin-top: 5px;
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
.ins {
  display: flex;
  flex-direction: column;
}
</style>
