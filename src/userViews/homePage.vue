<template>
  <div class="App">
    <topTab />
    <transition name="tips">
      <tipsModel v-if="this.dialogshow" />
    </transition>
    <transition>
      <!-- :key控制子组件刷新同步数据更新 组件里的子模块数据往往无法刷新，需要其他方式进行手动刷新 -->
      <router-view :key="key" />
    </transition>
    <bottomTab />
  </div>
</template>

<script>
import store from "@/store";
import topTab from "@/userComponents/topTab";
import bottomTab from "@/userComponents/bottomTab";
import tipsModel from "@/userComponents/Model/tipsModel";
import { mapState } from "vuex";
export default {
  data() {
    return {
      key: 0,
    };
  },
  components: {
    topTab,
    bottomTab,
    tipsModel,
  },
  computed: {
    ...mapState(["dialogshow", "reload"]),
  },
  watch: {
    //reload为监听对象，reload发生变化，执行handleUpdateClick
    reload: "handleUpdateClick", //监听退票、next查询航班，使travel更新数据(vue无法监测数组或对象的数据变化)
  }, //$route只能监听子路由变化，无法监听同级或父级路由变化，要全局监听在App.vue文件中监听
  methods: {
    handleUpdateClick() {
      // built-in
      this.key += 1; //key值发生变化，所绑定组件自动刷新 => perfect
      console.log("接收到变化");
    },
  },
};
</script>

<style scoped>
.App {
  height: 100%;
  background-color: #efeff4;
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
.tips-enter {
  opacity: 0;
}
.tips-leave-to {
  opacity: 0;
}
.tips-enter-active,
.tips-leave-active {
  transition: all 0.6s ease;
}
.tips {
  position: absolute;
  z-index: 999999;
}
</style>
