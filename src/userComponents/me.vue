<template>
  <div class="app">
    <transition>
      <nologin v-if="this.no_login" @goLogin="goLogin" />
      <login v-if="this.lo_gin" @goPerson="goPerson" />
      <person v-if="this.per_son" />
      <register v-if="this.re_gister" @goLogin="goLogin" />
    </transition>
  </div>
</template>

<script>
import nologin from "./Model/nologin"
import login from "./Model/login"
import person from "./Model/person"
import register from "./Model/register"
import { mapState, mapMutations } from "vuex"
export default {
  components: {
    nologin,
    login,
    person,
    register
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["no_login", "lo_gin", "per_son", "re_gister"])
  },
  watch: {},
  methods: {
    ...mapMutations(["no_loginchange", "lo_ginchange", "per_sonchange", "re_gisterchange"]),
    goLogin() {
      this.$router.push({ path: "/userHome/me/login" })
    },
    goPerson() {
      this.$router.push({ path: "/userHome/me/person" })
    },
    goRegister() {
      this.$router.push({ path: "/userHome/me/register" })
    }
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
