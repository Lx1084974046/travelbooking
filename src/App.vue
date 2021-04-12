<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
// 解决ios10及以上safari无法禁止缩放的问题
window.onload = function () {
  var lastTouchEnd = 0;
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    "touchend",
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
  document.addEventListener("dblclick", function (event) {
    event.preventDefault();
  });
};
</script>>

<style lang="stylus">
* {
  touch-action: manipulation;
  vertical-align: baseline;
}

i {
  font-style: normal;
  font-size: 12px;
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
