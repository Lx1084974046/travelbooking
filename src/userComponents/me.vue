<template>
  <div class="app">
    <nologin v-if="false" />
    <login v-if="false" />
    <person />
  </div>
</template>

<script>
import nologin from "./Model/nologin"
import login from "./Model/login"
import person from "./Model/person"
export default {
  components: {
    nologin,
    login,
    person
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 360px;
  position: fixed;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
