<template>
  <div class="app">{{ this.title }}</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState(["title"]),
  },
  watch: {},
  methods: {},
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
}
</style>
