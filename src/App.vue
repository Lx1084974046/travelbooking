<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
* {
  touch-action: manipulation;
  vertical-align: baseline;
}

#app {
  height: 100vh;
  overflow: hidden scroll;
}

body {
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
