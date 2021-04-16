<template>
  <div class="admin-app">
    <tipsModel v-if="this.$store.state.dialogshow" />
    <router-view></router-view>
  </div>
</template>

<script>
import tipsModel from "../userComponents/Model/tipsModel";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    tipsModel,
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
.admin-app {
  width: 100%;
  height: 100vh;
}
</style>
<style lang="stylus">
.admin-app {
  .tips {
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 9999;

    .tipsmodel {
      width: 30%;
      height: 30%;

      .tit {
        font-size: 40px;
        margin-bottom: 20px;
      }

      .el-button {
        margin-top: 20px;
      }
    }
  }

  .tipsmodel>span {
    font-size: 26px;
  }
}
</style>
