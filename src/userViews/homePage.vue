<template>
  <div class="app">
    <topTab />
    <transition>
      <router-view />
    </transition>
    <bottomTab />
  </div>
</template>

<script>
import topTab from "@/userComponents/topTab";
import bottomTab from "@/userComponents/bottomTab";
export default {
  data() {
    return {};
  },
  components: {
    topTab,
    bottomTab,
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
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
