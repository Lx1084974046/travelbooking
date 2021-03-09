<template>
  <div class="app">
    <span v-if="this.returnlogo" @click="returnPerson">&lt;</span>
    <div>{{ this.title }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    returnPerson() {
      this.$store.commit("updateshowchange", false);
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
  position: relative;
}
span {
  position: absolute;
  left: 10px;
  font-size: 25px;
}
</style>
