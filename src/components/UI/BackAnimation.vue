<template>
  <div class="waves">
    <div class="wave wave-num-1"></div>
    <div class="wave wave-num-4"></div>
    <div class="wave wave-num-2"></div>
    <div class="wave wave-num-3"></div>
  </div>
</template>

<script>
export default {
  name: 'back-animation'
}
</script>

<style scoped>
.waves {
  width: 100%;
  overflow: hidden;
}
.wave {
  position: fixed;
  bottom: -195vw;
  width: 200vw;
  height: 200vw;
  z-index: -1;
  background: rgba(199, 162, 233, 0.8);
}
.wave-num-1 {
  left: 5vw;
  animation: animate-wave 12s infinite linear;
  background: rgba(168, 87, 243, 0.8);
}
.wave-num-2 {
  left: -20vw;
  animation: animate-wave 13s infinite linear;
}
.wave-num-3 {
  left: -55vw;
  animation: animate-wave 12s infinite linear;
}
.wave-num-4 {
  left: -95vw;
  animation: animate-wave 13s infinite linear;
  background: rgba(168, 87, 243, 0.8);
}
@keyframes animate-wave {
  0% {
    border-radius: 50%;
    transform: rotate(30deg);
  }
  25% {
    border-radius: 42.5%;
    transform: rotate(120deg);
  }
  50% {
    border-radius: 35%;
    transform: rotate(210deg);
  }
  75% {
    border-radius: 42.5%;
    transform: rotate(300deg);
  }
  100% {
    border-radius: 50%;
    transform: rotate(390deg);
  }
}
</style>