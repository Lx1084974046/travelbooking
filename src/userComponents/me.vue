<template>
  <div class="app">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
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
