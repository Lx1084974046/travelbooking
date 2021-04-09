<template>
  <div class="per">
    <div class="btn">
      <img :src="this.avatar" alt="" />
      <div class="ins">
        <span>昵称：{{ this.nickname }}</span>
        <span class="id1">ID:{{ this.ID }}</span>
      </div>
    </div>
    <div class="btn1">
      <span>性别</span><i>{{ this.sex }}</i>
    </div>
    <div class="btn1" @click="goUpdatePerson">
      <span>修改个人资料</span><i>></i>
    </div>
    <div class="btn1" @click="dynamic"><span>我的动态</span><i>></i></div>
    <el-row
      ><el-button type="danger" round @click="loginout"
        >注销登录</el-button
      ></el-row
    >
    <transition>
      <updateperson :avatar="avatar" v-if="updateshow" />
    </transition>
    <transition>
      <mydynamic
        v-if="mydynamicshow"
        :avatar="avatar"
        :nickname="nickname"
        :ID="ID"
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { userFind } from "@/api/index.js";
import updateperson from "./updateperson";
import mydynamic from "./mydynamic";
export default {
  name: "",
  data() {
    return {
      ID: "",
      // IDcard: "",
      nickname: "",
      avatar: "",
      sex: "",
    };
  },
  components: {
    updateperson,
    mydynamic,
  },
  computed: {
    ...mapState(["updateshow", "mydynamicshow"]),
  },
  watch: {},
  methods: {
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
      "dialogreturnsbuttonchange",
      "updateshowchange",
      "mydynamicshowchange",
      "returnlogochange",
      "reloadchange",
      "dynumchange",
    ]),
    dynamic() {
      this.returnlogochange(true);
      this.mydynamicshowchange(true);
    },
    getUser() {
      //判断是否登录
      if (localStorage.getExpire("logintoken") == null) {
        this.dialogtitlechange("身份信息过期");
        this.dialogcontentchange("请重新登录");
        this.dialogbuttonchange("登录");
        this.dialogshowchange(true);
      } else {
        //登录后获取用户个人信息
        //首次登录请求登录接口
        if (localStorage.getExpire("usertoken") == null) {
          console.log("不存在");
          userFind({ account: localStorage.getExpire("logintoken") })
            .then((res) => {
              //将APi返回的用户信息存储到本地，减少接口请求次数
              localStorage.setExpire("usertoken", res.data[0]);
              this.ID = res.data[0].user_Account;
              if (res.data[0].user_sex == 0) {
                this.sex = "男";
              } else {
                this.sex = "女";
              }
              if (res.data[0].user_nickname == 0) {
                this.nickname = "未设置";
              } else {
                this.nickname = res.data[0].user_nickname;
              }
              this.avatar =
                "http://localhost:3000/public/src/img/avatars/" +
                res.data[0].user_avatar;
            }) //访问 localhost 的 net::ERR_UNKNOWN_URL_SCHEME 问题 解决方案是在 localhost 前面加上协议名：http://
            .catch((error) => {
              this.dialogtitlechange("Error");
              this.dialogcontentchange(error);
              this.dialogbuttonchange("关闭");
              this.dialogshowchange(true);
            });
        } else {
          //根据本地存储的用户信息渲染页面
          var userInfo = localStorage.getExpire("usertoken");
          console.log("存在");
          this.ID = userInfo.user_Account;
          if (userInfo.user_sex == 0) {
            this.sex = "男";
          } else {
            this.sex = "女";
          }
          if (userInfo.user_nickname == 0) {
            this.nickname = "未设置";
          } else {
            this.nickname = userInfo.user_nickname;
          }
          this.avatar =
            "http://localhost:3000/public/src/img/avatars/" +
            userInfo.user_avatar;
        }
      }
    },
    loginout() {
      this.dialogtitlechange("注意");
      this.dialogcontentchange("您确认退出当前登录状态");
      this.dialogbuttonchange("确认");
      this.dialogshowchange(true);
      this.dialogreturnsbuttonchange(true);
    },
    goUpdatePerson() {
      this.updateshowchange(true);
      this.returnlogochange(true);
    },
  },
  mounted() {
    this.getUser(); //页面挂载时，进行用户数据获取，顺便进行了判断登录状态
  },
  beforeDestroy() {
    this.returnlogochange(false);
  },
};
</script>

<style scoped>
.per {
  width: 100%;
  height: 85vh;
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
  margin-bottom: 10px;
}
.btn img {
  width: 90px;
  height: 90px;
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
.btn1:active {
  background-color: #dcdcdc;
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