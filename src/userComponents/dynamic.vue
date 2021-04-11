<template>
  <div class="app">
    <div class="no-dy-list" v-if="nodynamic"></div>
    <div class="dynamic-list" v-else>
       <div
          class="dynamic-container"
          v-for="(item, index) in list"
          :key="index"
        >
          <!-- v-for里面无法获取到data数据，需绑定传入，注意传入后的使用方式 -->
          <div class="user-info">
            <img class="dyavatar" :src="'http://localhost:3000/public/src/img/avatars/'+ item.avatar +'.png'" alt="" />
            <span>{{ item.nickname == "0" ? item.user_Account : item.nickname }}</span>
          </div>
          <span class="text">{{ item.text }}</span>
          <el-image
            :src="'http://localhost:3000/public/src/img/dynamic/' + item.img"
            :preview-src-list="[
              'http://localhost:3000/public/src/img/dynamic/' + item.img,
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
              : item.time.substr(0,4) == new Date().toLocaleDateString("zh",{year: "numeric"}).substr(0,4) ? item.time.substr(5, 11) :  item.time
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
      list:[],
      nodynamic:false,
      deldybtnshow:null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    goCommunity(){
      if(localStorage.getExpire('communitytoken')){
        console.log('存在')
        this.list = localStorage.getExpire('communitytoken')
        if(this.list.length == 0){
          this.nodynamic = true
        }
      }else{
        console.log('不存在')
      dynamicCommunity().then(res =>{
      if(res.data == false){
        this.nodynamic = true
      }else{
        this.list = res.data
      }
      localStorage.setExpire('communitytoken',this.list)
    }).catch(error => {
      console.log(error)
    })
    }
    }
  },
  mounted(){
    this.goCommunity()
  }
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

.no-dy-list{
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
<style lang="stylus" scoped>
.dynamic-container {
  width: 95%;
  height: 25vh;
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
    width: 100px;
    height: 100px;
    margin-left: 30px;
  }

  .dytime {
    position: absolute;
    right: 16px;
    bottom: 12px;
    color: #A9A9A9;
  }
}
</style>

