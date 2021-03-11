<template>
  <div class="App">
    <topTab />
    <transition name="tips">
      <tipsModel v-if="this.dialogshow" />
    </transition>
    <transition>
      <router-view />
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
    return {};
  },
  components: {
    topTab,
    bottomTab,
    tipsModel,
  },
  computed: {
    ...mapState(["dialogshow"]),
  },
  watch: {}, //$route只能监听子路由变化，无法监听同级或父级路由变化，要全局监听在App.vue文件中监听
  methods: {},
};
</script>

<style scoped>
.App {
  height: 100vh;
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
