<template>
  <div class="app">
    <transition>
      <nologin v-if="this.nologin" @goLogin="goLogin" />
    </transition>
    <transition>
      <login v-if="this.login" @goPerson="goPerson" @goRegister="goRegister" />
    </transition>
    <transition>
      <person v-if="this.person" />
    </transition>
    <transition>
      <register v-if="this.register" @goLogin="goLogin" />
    </transition>
  </div>
</template>

<script>
import nologin from "./Model/nologin";
import login from "./Model/login";
import person from "./Model/person";
import register from "./Model/register";
import { mapState } from "vuex";
export default {
  components: {
    nologin,
    login,
    person,
    register,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["nologin", "login", "person", "register"]),
  },
  watch: {
    $route: "closePage",
  },
  methods: {
    goLogin() {
      this.$router.push({ path: "/userHome/me/login" });
    },
    goPerson() {
      this.$router.push({ path: "/userHome/me/person" });
    },
    goRegister() {
      this.$router.push({ path: "/userHome/me/register" });
    },
    closePage() {
      console.log(2);
    },
  },
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
  align-items: center;
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
</style>
