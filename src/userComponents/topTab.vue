<template>
  <div class="app">
    <span v-if="this.returnlogo" @click="returnPerson">&lt;</span>
    <div>{{ this.title }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState(["title", "returnlogo"]),
  },
  watch: {},
  methods: {
    ...mapMutations([
      "updateshowchange",
      "returnlogochange",
      "queryshowchange",
    ]),
    returnPerson() {
      if (this.$route.name == "person") {
        this.updateshowchange(false);
        this.returnlogochange(false);
      } else if (this.$route.name == "homeScreen") {
        this.queryshowchange(false);
        this.returnlogochange(false);
      }
    },
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #409eff;
  position: fixed;
  top: 0;
  z-index: 999;
}
span {
  position: absolute;
  left: 10px;
  font-size: 25px;
}
</style>
