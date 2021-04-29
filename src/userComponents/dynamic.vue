<template>
  <div class="app-d">
    <div class="no-dy-list" v-if="nodynamic">
      <el-tag>暂无数据</el-tag>
    </div>
    <div class="dynamic-list" v-else>
      <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
        <div
          class="dynamic-container"
          v-for="(item, index) in list"
          :key="index"
          :envtab="envtab"
        >
          <!-- v-for里面无法获取到data数据，需绑定传入，注意传入后的使用方式 -->
          <div class="user-info">
            <img
              class="dyavatar"
              :src="
                envtab
                  ? 'http://localhost:3000/public/src/img/avatars/' +
                    item.user_avatar +
                    '.png' +
                    '?' +
                    Math.random()
                  : 'https://www.lxcloud.love/src/img/avatars/' +
                    item.user_avatar +
                    '.png' +
                    '?' +
                    Math.random()
              "
              alt=""
            />
            <span>{{
              item.user_nickname == "0" ? item.user_Account : item.user_nickname
            }}</span>
          </div>
          <span class="text">{{ item.text }}</span>
          <el-image
            :src="
              envtab
                ? 'http://localhost:3000/public/src/img/dynamic/' +
                  item.img +
                  '.png'
                : 'https://www.lxcloud.love/src/img/dynamic/' +
                  item.img +
                  '.png'
            "
            :preview-src-list="[
              envtab
                ? 'http://localhost:3000/public/src/img/dynamic/' +
                  item.img +
                  '.png'
                : 'https://www.lxcloud.love/src/img/dynamic/' +
                  item.img +
                  '.png',
            ]"
            lazy
          >
          </el-image>
          <div class="like-container">
            <i
              class="give-nolike"
              @click="givelike(index)"
              v-if="!item.like"
            ></i>
            <i class="give-like" @click="givenolike(index)" v-else></i>
            <span class="like-num">{{
              item.num == 0 ? "" : item.num > 99 ? "99+" : item.num
            }}</span>
          </div>

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
        <el-button type="primary" @click="loading" v-if="loadshow"
          >点击加载更多</el-button
        >
        <span class="load-bottom" v-else>人家是有底线的～</span>
        <div class="bottom" :style="isIphone ? 'margin-top:8vh' : ''"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MescrollVue from "mescroll.js/mescroll.vue";
import { dynamicCommunity, likeDynamic } from "@/api/index.js";
export default {
  name: "",
  data() {
    return {
      isIphone: false,
      envtab: true,
      list: [],
      nodynamic: false,
      deldybtnshow: null,
      loadshow: true,
      mescroll: null, // mescroll实例对象
      likes: false, //记录是否点赞过
      mescrollDown: {
        use: true, // 是否启用下拉刷新; 默认true
        auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
        callback: this.downCallback,
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      // mescrollUp: {
      //   // 上拉加载的配置.
      //   use: true, // 是否启用上拉加载; 默认true
      //   auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
      //   offset: -12,
      //   callback: this.upCallback,
      // },
    };
  },
  components: {
    MescrollVue,
  },
  computed: {
    ...mapState(["dynumlength"]),
  },
  watch: {},
  methods: {
    ...mapMutations([
      "dynumlengthchange",
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogreturnsbuttonchange",
      "Loadingchange",
    ]),
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    givelike(index) {
      console.log("zan");
      if (localStorage.getExpire("usertoken")) {
        let params = {
          account: localStorage.getExpire("usertoken").user_Account,
          img: this.list[index].img,
          num: 1,
        };
        likeDynamic(params)
          .then((res) => {
            if (res.data == true) {
              this.list[index].like = true;
              this.list[index].num = this.list[index].num + 1;
              localStorage.removeItem("mydynamictoken");
              this.likes = true;
            }
          })
          .catch();
      } else {
        this.dialogtitlechange("不能点赞");
        this.dialogcontentchange("请先登录!");
        this.dialogreturnsbuttonchange(true);
        this.dialogshowchange(true);
      }
    },
    givenolike(index) {
      console.log("nozan");
      let params = {
        account: localStorage.getExpire("usertoken").user_Account,
        img: this.list[index].img,
        num: 2,
      };
      likeDynamic(params)
        .then((res) => {
          if (res.data == true) {
            this.list[index].like = false;
            this.list[index].num = this.list[index].num - 1;
            localStorage.removeItem("mydynamictoken");
            this.likes = true;
          }
        })
        .catch();
    },
    //下拉刷新
    downCallback(mescroll) {
      localStorage.removeItem("communitytoken");
      localStorage.removeItem("mydynamictoken");
      this.loadshow = true;
      // 登录时刷新
      if (localStorage.getExpire("usertoken")) {
        dynamicCommunity({
          account: localStorage.getExpire("usertoken").user_Account,
        })
          .then((res) => {
            if (res.data == false) {
              this.nodynamic = true;
              this.list = [];
              localStorage.setExpire("communitytoken", this.list);
              this.dynumlengthchange(0);
            } else {
              this.list = res.data.slice(0, 8);
              localStorage.setExpire("communitytoken", res.data);
              if (res.data.length < 8) {
                this.loadshow = false;
                this.dynumlengthchange(res.data.length);
              } else {
                this.dynumlengthchange(8);
              }
              console.log(this.dynumlength);
            }
            mescroll.endSuccess();
            this.$message({
              message: "刷新成功",
              type: "success",
              duration: 800,
              offset: 60,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //未登录
        console.log("nol");
        dynamicCommunity({
          account: null,
        })
          .then((res) => {
            if (res.data == false) {
              this.nodynamic = true;
              this.list = [];
              localStorage.setExpire("communitytoken", this.list);
              this.dynumlengthchange(0);
            } else {
              this.list = res.data.slice(0, 8);
              localStorage.setExpire("communitytoken", res.data);
              if (res.data.length < 8) {
                this.loadshow = false;
                this.dynumlengthchange(res.data.length);
              } else {
                this.dynumlengthchange(8);
              }
              console.log(this.dynumlength);
            }
            mescroll.endSuccess();
            this.$message({
              message: "刷新成功",
              type: "success",
              duration: 800,
              offset: 60,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    loading() {
      switch (
        localStorage.getExpire("communitytoken").length - this.dynumlength
      ) {
        case 0:
          console.log("人家是有底线的");
          this.loadshow = false;
          break;
        case 1:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength]
          );
          this.dynumlengthchange(this.dynumlength + 1);
          break;
        case 2:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1]
          );
          this.dynumlengthchange(this.dynumlength + 2);
          break;
        case 3:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1],
            localStorage.getExpire("communitytoken")[this.dynumlength + 2]
          );
          this.dynumlengthchange(this.dynumlength + 3);
          break;
        case 4:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1],
            localStorage.getExpire("communitytoken")[this.dynumlength + 2],
            localStorage.getExpire("communitytoken")[this.dynumlength + 3]
          );
          this.dynumlengthchange(this.dynumlength + 4);
          break;
        case 5:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1],
            localStorage.getExpire("communitytoken")[this.dynumlength + 2],
            localStorage.getExpire("communitytoken")[this.dynumlength + 3],
            localStorage.getExpire("communitytoken")[this.dynumlength + 4]
          );
          this.dynumlengthchange(this.dynumlength + 5);
          break;
        case 6:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1],
            localStorage.getExpire("communitytoken")[this.dynumlength + 2],
            localStorage.getExpire("communitytoken")[this.dynumlength + 3],
            localStorage.getExpire("communitytoken")[this.dynumlength + 4],
            localStorage.getExpire("communitytoken")[this.dynumlength + 5]
          );
          this.dynumlengthchange(this.dynumlength + 6);
          break;
        case 7:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1],
            localStorage.getExpire("communitytoken")[this.dynumlength + 2],
            localStorage.getExpire("communitytoken")[this.dynumlength + 3],
            localStorage.getExpire("communitytoken")[this.dynumlength + 4],
            localStorage.getExpire("communitytoken")[this.dynumlength + 5],
            localStorage.getExpire("communitytoken")[this.dynumlength + 6]
          );
          this.dynumlengthchange(this.dynumlength + 7);
          break;
        default:
          this.list.push(
            localStorage.getExpire("communitytoken")[this.dynumlength],
            localStorage.getExpire("communitytoken")[this.dynumlength + 1],
            localStorage.getExpire("communitytoken")[this.dynumlength + 2],
            localStorage.getExpire("communitytoken")[this.dynumlength + 3],
            localStorage.getExpire("communitytoken")[this.dynumlength + 4],
            localStorage.getExpire("communitytoken")[this.dynumlength + 5],
            localStorage.getExpire("communitytoken")[this.dynumlength + 6],
            localStorage.getExpire("communitytoken")[this.dynumlength + 7]
          );
          this.dynumlengthchange(this.dynumlength + 8);
      }
    },
    goCommunity() {
      if (localStorage.getExpire("communitytoken")) {
        console.log("存在");
        if (localStorage.getExpire("communitytoken").length > 8) {
          this.dynumlengthchange(8);
        } else {
          this.loadshow = false;
          this.dynumlengthchange(
            localStorage.getExpire("communitytoken").length
          );
        }
        this.list = localStorage
          .getExpire("communitytoken")
          .slice(0, this.dynumlength);
        console.log(this.dynumlength);
        if (this.dynumlength == 0) {
          this.nodynamic = true;
        }
      } else {
        this.Loadingchange(true);
        if (localStorage.getExpire("usertoken")) {
          console.log("不存在已登录");
          dynamicCommunity({
            account: localStorage.getExpire("usertoken").user_Account,
          })
            .then((res) => {
              this.Loadingchange(false);
              if (res.data == false) {
                this.nodynamic = true;
                localStorage.setExpire("communitytoken", this.list);
                this.dynumlengthchange(0);
              } else {
                this.list = res.data.slice(0, 8);
                localStorage.setExpire("communitytoken", res.data);
                if (res.data.length < 8) {
                  this.loadshow = false;
                  this.dynumlengthchange(res.data.length);
                } else {
                  this.dynumlengthchange(8);
                }
                console.log(this.dynumlength);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("不存在未登录");
          dynamicCommunity({
            account: null,
          })
            .then((res) => {
              this.Loadingchange(false);
              if (res.data == false) {
                this.nodynamic = true;
                localStorage.setExpire("communitytoken", this.list);
                this.dynumlengthchange(0);
              } else {
                this.list = res.data.slice(0, 8);
                localStorage.setExpire("communitytoken", res.data);
                if (res.data.length < 8) {
                  this.loadshow = false;
                  this.dynumlengthchange(res.data.length);
                } else {
                  this.dynumlengthchange(8);
                }
                console.log(this.dynumlength);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
  mounted() {
    if (
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent)
    ) {
      this.isIphone = true;
      console.log("safari");
    }
    if (process.env.NODE_ENV == "production") {
      this.envtab = false;
    }
    this.goCommunity();
  },
  // beforeRouteEnter(to, from, next) { //奇怪为什么无法触发
  //   console.log(" beforeRouteEnter !");
  //   next();
  // },
  beforeDestroy() {
    if (this.likes) {
      localStorage.removeItem("communitytoken");
    }
  },
};
</script>

<style scoped>
.app-d {
  width: 100%;
  height: 100%;
  position: fixed;
  margin-top: 6.8vh;
}

.no-dy-list {
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dynamic-list {
  width: 100%;
  height: 85vh;
  background-color: #f5f5f5;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dynamic-list .dyavatar {
  border-radius: 50%;
  width: 38px;
  height: 38px;
}
.dynamic-list .load-bottom {
  color: #a8a8a8;
  margin-bottom: 12px;
}
.dynamic-list .bottom {
  width: 100%;
  height: 1px;
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
.app-d {
  .dynamic-list .el-button {
    margin-bottom: 8px;
  }

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

    .like-container {
      position: absolute;
      right: 2px;
      bottom: 13px;
      z-index: 99;
      display: flex;
      align-items: center;

      .give-like, .give-nolike {
        width: 22px;
        height: 22px;
        display: block;
      }

      .give-like {
        background: url('~@/assets/dynamic/like.png') no-repeat;
        background-size: cover;
      }

      .give-nolike {
        background: url('~@/assets/dynamic/nolike.png') no-repeat;
        background-size: cover;
      }

      .like-num {
        display: block;
        width: 36px;
        font-size: 16px;
        color: #409EFF;
        margin-left: 3px;
      }
    }

    .dytime {
      position: absolute;
      left: 20px;
      bottom: 12px;
      color: #A9A9A9;
    }
  }

  .mescroll {
    position: absolute;
    top: 0;
    bottom: 0;
    height: auto;
    -webkit-overflow-scrolling: touch;
    height: 85vh;
  }

  .mescroll > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

