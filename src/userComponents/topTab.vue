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
    ...mapState(["title", "returnlogo", "mydynamicshow", "senddynamicshow"]),
  },
  watch: {},
  methods: {
    ...mapMutations([
      "updateshowchange",
      "senddynamicshowchange",
      "mydynamicshowchange",
      "returnlogochange",
      "queryshowchange",
      "bookshowchange",
    ]),
    returnPerson() {
      if (this.$route.name == "person") {
        if (this.senddynamicshow == false) {
          this.mydynamicshowchange(false);
        }
        this.senddynamicshowchange(false);
        this.updateshowchange(false);
        this.returnlogochange(false);
        if (this.mydynamicshow == true) {
          this.returnlogochange(true);
        }
      } else if (
        this.$route.name == "homeScreen" &&
        !this.$store.state.bookshow
      ) {
        this.queryshowchange(false);
        this.returnlogochange(false);
      } else if (
        this.$route.name == "homeScreen" &&
        this.$store.state.bookshow
      ) {
        this.bookshowchange(false);
      }
    },
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 6.8vh;
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
