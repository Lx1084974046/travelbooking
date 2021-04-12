<template>
  <div class="app">
    <div class="no-dy-list" v-if="nodynamic"></div>
    <div class="dynamic-list" v-else>
      <div class="dynamic-container" v-for="(item, index) in list" :key="index">
        <!-- v-for里面无法获取到data数据，需绑定传入，注意传入后的使用方式 -->
        <div class="user-info">
          <img
            class="dyavatar"
            :src="
              'http://10.1.3.193:3000/public/src/img/avatars/' +
              item.user_avatar +
              '.png'
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
            'http://10.1.3.193:3000/public/src/img/dynamic/' + item.img + '.png'
          "
          :preview-src-list="[
            'http://10.1.3.193:3000/public/src/img/dynamic/' +
              item.img +
              '.png',
          ]"
          lazy
        >
        </el-image>
        <i class="give-nolike" v-if="nolike"></i>
        <i class="give-like" v-else></i>
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
</template>

<script>
import { dynamicCommunity } from "@/api/index.js";
export default {
  name: "",
  data() {
    return {
      list: [],
      nodynamic: false,
      deldybtnshow: null,
      nolike: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    goCommunity() {
      if (localStorage.getExpire("communitytoken")) {
        console.log("存在");
        this.list = localStorage.getExpire("communitytoken");
        if (this.list.length == 0) {
          this.nodynamic = true;
        }
      } else {
        console.log("不存在");
        dynamicCommunity()
          .then((res) => {
            if (res.data == false) {
              this.nodynamic = true;
            } else {
              this.list = res.data;
            }
            localStorage.setExpire("communitytoken", this.list);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.goCommunity();
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  background: yellow;
  position: fixed;
  margin-top: 50px;
}

.no-dy-list {
  height: 85vh;
  background-color: aqua;
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

  .give-like, .give-nolike {
    width: 22px;
    height: 22px;
    display: block;
    position: absolute;
    right: 26px;
    bottom: 13px;
  }

  .give-like {
    background: url('~@/assets/dynamic/like.png') no-repeat;
    background-size: cover;
  }

  .give-nolike {
    background: url('~@/assets/dynamic/nolike.png') no-repeat;
    background-size: cover;
  }

  .dytime {
    position: absolute;
    left: 20px;
    bottom: 12px;
    color: #A9A9A9;
  }
}
</style>

