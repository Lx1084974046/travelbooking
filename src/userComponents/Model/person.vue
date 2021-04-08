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
      <div class="mydynamic" v-if="mydynamicshow">
        <i class="write" @click="wirteDynamic">
          <img src="@/assets/userimg/pen.png" alt="" />
        </i>
        <div class="nodynamic" v-if="this.nodynamic">
          <i class="dynamic-1"></i>
          <i class="dynamic-2"></i>
          <el-tag>暂无动态</el-tag>
        </div>
        <div class="dynamic-list" v-else>
          <div
            class="dynamic-container"
            v-for="(item, index) in mydynamic"
            :key="index"
            :avatar="avatar"
            :nickname="nickname"
          >
            <!-- v-for里面无法获取到data数据，需绑定传入，注意传入后的使用方式 -->
            <div class="user-info">
              <img class="dyavatar" :src="avatar" alt="" />
              <span>{{ nickname == "未设置" ? this.ID : nickname }}</span>
            </div>
            <span class="text">{{ item.text }}</span>
            <el-image
              :src="'http://localhost:3000/public/src/img/' + item.img"
              :preview-src-list="[
                'http://localhost:3000/public/src/img/' + item.img,
              ]"
              lazy
            >
            </el-image>
          </div>
        </div>
      </div>
    </transition>
    <transition name="send">
      <div class="senddynamic" v-if="senddynamicshow">
        <i></i>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="dytext"
          maxlength="30"
          show-word-limit
        >
        </el-input>
        <div class="upimg">
          <i class="del" v-if="url" @click="clearFile"></i>
          <input type="file" @change="change" ref="clearFile" />
          <i class="up"></i>
          <el-image v-if="url" :src="url" :preview-src-list="srcList">
          </el-image>
        </div>
        <el-button type="success" @click="send">发表</el-button>
      </div>
    </transition>
  </div>
</template>

<script>
import base64Img from "../../utils/2base64Img";
import dyimg from "../Model/dyimg";
import { mapState, mapMutations } from "vuex";
import { userFind, dynamic, findDynamic } from "@/api/index.js";
import updateperson from "./updateperson";
export default {
  name: "",
  data() {
    return {
      ID: "",
      // IDcard: "",
      nickname: "",
      avatar: "",
      sex: "",
      dytext: "",
      url: "",
      picValue: "",
      srcList: [],
      imgbase64: null,
      nodynamic: false,
      mydynamic: [],
    };
  },
  components: {
    updateperson,
    dyimg,
  },
  computed: {
    ...mapState(["updateshow", "senddynamicshow", "mydynamicshow"]),
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
      "senddynamicshowchange",
      "mydynamicshowchange",
      "returnlogochange",
      "reloadchange",
    ]),
    wirteDynamic() {
      this.senddynamicshowchange(true);
    },
    send() {
      if (this.dytext == "") {
        this.dialogtitlechange("发表失败");
        this.dialogcontentchange("请先输入文案");
        this.dialogreturnsbuttonchange(true);
        this.dialogshowchange(true);
      } else if (this.url == "") {
        this.dialogtitlechange("发表失败");
        this.dialogcontentchange("请先添加图片");
        this.dialogreturnsbuttonchange(true);
        this.dialogshowchange(true);
      } else {
        console.log("success");
        let dynum = null;
        if (localStorage.getExpire("mydynamictoken") == false) {
          dynum = 1;
        } else {
          dynum = localStorage.getExpire("mydynamictoken").length + 1;
        }
        let params = {
          account:
            localStorage.getExpire("usertoken").user_Account + "-" + dynum, //作为用户每条动态的身份标识
          user_Account: localStorage.getExpire("usertoken").user_Account,
          text: this.dytext,
          content: this.imgbase64,
        };
        dynamic(params)
          .then((res) => {
            if (res.data == true) {
              this.$message({
                message: "发表成功",
                type: "success",
                duration: 600,
              });
              localStorage.removeItem("mydynamictoken");
              let _this = this;
              setTimeout(function () {
                _this.senddynamicshowchange(false);
                _this.reloadchange();
                _this.mydynamicshowchange(true);
                console.log("接收到变化");
              }, 800);
            }
          })
          .catch();
      }
    },
    clearFile() {
      this.$refs.clearFile.value = "";
      this.url = "";
      this.srcList = [];
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      this.srcList.push(this.url);
      console.log(this.url);
      base64Img.base64Img(this.url).then((res) => {
        this.imgbase64 = res;
      });
    },
    dynamic() {
      this.returnlogochange(true);
      this.mydynamicshowchange(true);
      //缓存请求
      if (localStorage.getExpire("mydynamictoken")) {
        console.log("存在");
        this.mydynamic = localStorage.getExpire("mydynamictoken");
        if (this.mydynamic.length == 0) {
          this.nodynamic = true;
        }
      } else {
        console.log("bu存在");
        findDynamic({
          account: localStorage.getExpire("usertoken").user_Account,
        })
          .then((res) => {
            if (res.data == false) {
              this.nodynamic = true;
            } else {
              this.mydynamic = res.data;
            }
            //session为空数组时，也为true
            localStorage.setExpire("mydynamictoken", this.mydynamic);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
    this.mydynamicshowchange(false);
    this.senddynamicshowchange(false);
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
.senddynamic,
.mydynamic {
  width: 100%;
  height: 85vh;
  background-color: #efeff4;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.senddynamic i {
  display: block;
  width: 307px;
  height: 86px;
  background: url("../../assets/userimg/mydynamic.png") no-repeat;
}
.senddynamic .el-textarea {
  width: 307px;
  height: 90px;
  margin-bottom: 20px;
}
</style>
<style>
.senddynamic .el-textarea__inner {
  height: 90px;
}
.upimg {
  margin-top: 10px;
  width: 128px;
  height: 128px;
  position: relative;
  margin-bottom: 20px;
}
.senddynamic .upimg .del {
  display: block;
  position: absolute;
  right: -28px;
  top: -28px;
  width: 26px;
  height: 26px;
  z-index: 99;
  background: url("../../assets/userimg/delete.png") no-repeat;
  background-size: contain;
}
.senddynamic .upimg .up {
  display: block;
  width: 100%;
  height: 100%;
  background: url("../../assets/userimg/upload.png") no-repeat;
}
.upimg input {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}
.upimg .el-image {
  width: 160px;
  height: 160px;
  position: absolute;
  top: -16px;
  left: -16px;
}
.mydynamic {
  justify-content: center;
}
.mydynamic .write {
  position: absolute;
  top: 0;
  display: inline-block;
  width: 100%;
  height: 4.5vh;
  text-align: center;
  background-color: #fff;
}
.nodynamic {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nodynamic .dynamic-1 {
  display: block;
  width: 160px;
  height: 160px;
  background: url("~@/assets/userimg/dynamic.png") no-repeat;
}
.nodynamic .dynamic-2 {
  display: block;
  width: 400px;
  height: 61px;
  background: url("~@/assets/userimg/nodynamic.png") no-repeat;
  background-size: contain;
}
.send-enter {
  opacity: 0.3;
  transform: translateY(-100%);
}
.send-leave-to {
  opacity: 0.3;
  transform: translateY(100%);
  position: absolute;
}
.send-enter-active,
.send-leave-active {
  transition: all 0.5s ease;
}
.mydynamic .dynamic-list {
  width: 100%;
  height: 80.5vh;
  margin-top: 4.5vh;
  background-color: #f5f5f5;
  overflow-y: scroll;
}
.dynamic-list .dyavatar {
  width: 32px;
  height: 32px;
}
</style>
<style lang="stylus" scoped>
.dynamic-container {
  width: 100%;
  height: 30vh;
  background-color: #fff;
  margin: 10px 0;
  overflow: hidden; // 避免边距塌陷

  .user-info {
    height: 36px;
    display: flex;
    align-items: center;
    margin: 10px;

    span {
      margin-left: 10px;
    }
  }

  .text {
    margin: 0 30px;
    display: block;
    margin-bottom: 6px;
  }

  .el-image {
    width: 100px;
    height: 100px;
    margin-left: 30px;
  }
}
</style>
