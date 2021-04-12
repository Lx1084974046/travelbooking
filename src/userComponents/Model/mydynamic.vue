<template>
  <div class="app-dynamic">
    <div class="mydynamic" @click="nopoint">
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
          v-for="(item, index) in mydynamiclist"
          :key="index"
          :avatar="avatar"
          :nickname="nickname"
          :ID="ID"
        >
          <!-- v-for里面无法获取到data数据，需绑定传入，注意传入后的使用方式 -->
          <div class="user-info">
            <img class="dyavatar" :src="avatar" alt="" />
            <span>{{ nickname == "未设置" ? ID : nickname }}</span>
            <i class="point" @click.stop="point(index)"></i>
            <el-button
              @click="deldynamic(index)"
              v-if="index == deldybtnshow"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
          <span class="text">{{ item.text }}</span>
          <el-image
            :src="
              'http://localhost:3000/public/src/img/dynamic/' +
              item.img +
              '.png'
            "
            :preview-src-list="[
              'http://localhost:3000/public/src/img/dynamic/' +
                item.img +
                '.png',
            ]"
            lazy
          >
          </el-image>
          <span class="dytime">{{
            item.time.substr(0, 10) ==
            new Date()
              .toLocaleDateString("zh", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/[/]/g, "-")
              ? item.time.substr(11, 8)
              : Date.parse(
                  new Date()
                    .toLocaleDateString("zh", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/[/]/g, "-")
                ) -
                  Date.parse(item.time.substr(0, 10)) ==
                24 * 60 * 60 * 1000
              ? "昨天 " + item.time.substr(11, 8)
              : item.time.substr(0, 4) ==
                new Date()
                  .toLocaleDateString("zh", { year: "numeric" })
                  .substr(0, 4)
              ? item.time.substr(5, 11)
              : item.time
          }}</span>
        </div>
      </div>
    </div>
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
          <i class="up" v-else></i>
          <input
            type="file"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            @change="change"
            ref="clearFile"
          />
          <el-image v-if="url" :src="url" :preview-src-list="srcList">
          </el-image>
        </div>

        <el-button type="success" @click="send">发表</el-button>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { dynamic, findDynamic } from "@/api/index.js";
import base64Img from "../../utils/2base64Img";
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  props: ["avatar", "nickname", "ID"],
  data() {
    return {
      dytext: "",
      url: "",
      picValue: "",
      srcList: [],
      imgbase64: null,
      nodynamic: false,
      mydynamiclist: [],
      deldybtnshow: null,
    };
  },
  computed: {
    ...mapState(["senddynamicshow", "mydynamicshow"]),
  },
  watch: {},
  methods: {
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
      "dialogreturnsbuttonchange",
      "senddynamicshowchange",
      "mydynamicshowchange",
      "returnlogochange",
      "reloadchange",
      "dynumchange",
    ]),
    deldynamic(index) {
      this.dynumchange(this.mydynamiclist[index].img);
      this.dialogtitlechange("删除动态");
      this.dialogcontentchange("确认删除该条动态？");
      this.dialogbuttonchange("删除");
      this.dialogreturnsbuttonchange(true);
      this.dialogshowchange(true);
    },
    nopoint() {
      this.deldybtnshow = null;
    },
    //天才小技巧，实现v-for中的指定显示，牢记以后会常用~
    point(index) {
      this.deldybtnshow = index;
    },
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
        let dytime = null;
        let temp = Vue.filter("dateFormat"); //局部调用全局过滤器
        dytime = temp(new Date(), "YYYY-MM-DD HH:mm:ss"); //自行传入参数格式 hh:mm:ss 12小时制 MM月mm分 ss不能大写会出现100s
        console.log(dytime.replace(/[:-\s]/g, ""));
        console.log(dytime);
        let params = {
          //时间+id作为动态的身份标识
          account:
            localStorage.getExpire("usertoken").user_Account +
            "-" +
            dytime.replace(/[:-\s]/g, ""), //作为用户每条动态的身份标识
          user_Account: localStorage.getExpire("usertoken").user_Account,
          text: this.dytext,
          content: this.imgbase64,
          time: dytime,
        };
        dynamic(params)
          .then((res) => {
            if (res.data == true) {
              this.$message({
                message: "发表成功",
                type: "success",
                offset: 60,
                duration: 1000,
              });
              localStorage.removeItem("mydynamictoken");
              localStorage.removeItem("communitytoken");
              this.senddynamicshowchange(false);
              this.reloadchange(); //刷新页面
              //   this.$nextTick(() => {  页面dom变化后执行
              //     this.update = true
              // })
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
      if (files[0].size > 3 * 1024 * 1024) {
        this.$message({
          message: "文件大小不能大于6M",
          type: "warning",
          offset: 60,
          duration: 1000,
        });
        return;
      }
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
      //缓存请求
      if (localStorage.getExpire("mydynamictoken")) {
        console.log("存在");
        this.mydynamiclist = localStorage.getExpire("mydynamictoken");
        if (this.mydynamiclist.length == 0) {
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
              this.mydynamiclist = res.data;
            }
            //session为空数组时，也为true
            localStorage.setExpire("mydynamictoken", this.mydynamiclist);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.dynamic();
    this.returnlogochange(true);
  },
};
</script>

<style scoped>
.app-dynamic {
  width: 100%;
  height: 85vh;
  background-color: #efeff4;
  position: absolute;
  top: 0;
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
  position: relative;
  margin-bottom: 20px;
}
.senddynamic .upimg .del {
  display: block;
  position: absolute;
  right: -12px;
  top: -12px;
  width: 26px;
  height: 26px;
  z-index: 99;
  background: url("../../assets/userimg/delete.png") no-repeat;
  background-size: contain;
}
.senddynamic .upimg .up {
  display: block;
  width: 100%;
  height: 128px;
  background: url("../../assets/userimg/upload.png") no-repeat;
}
.upimg input {
  width: 100%;
  height: 128px;
  position: absolute;
  top: 0;
  opacity: 0;
}
.upimg .el-image {
  max-width: 200%;
  max-height: 200px;
  min-width: 100%;
  min-height: 100px;
  width: auto;
  height: auto;
}
.senddynamic .el-button {
  width: 80% !important;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dynamic-list .dyavatar {
  width: 32px;
  height: 32px;
}
.user-info .el-button {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 11px;
  top: 1px;
}
</style>
<style lang="stylus">
.dynamic-container {
  width: 95%;
  background-color: #fff;
  margin: 10px 0;
  padding-top: 1px; // 避免边距塌陷
  padding-bottom: 40px;
  position: relative;

  .user-info {
    height: 36px;
    display: flex;
    align-items: center;
    margin: 10px;
    position: relative;

    .point {
      display: block;
      width: 20px;
      height: 20px;
      background: url('~@/assets/userimg/point.png') no-repeat;
      background-size: cover;
      position: absolute;
      right: 16px;
    }

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
    margin-left: 20px;

    img {
      max-width: 200%;
      max-height: 200px;
      min-width: 100%;
      min-height: 100px;
      width: auto;
      height: auto;
    }
  }

  .dytime {
    position: absolute;
    right: 16px;
    bottom: 12px;
    color: #A9A9A9;
  }
}
</style>

