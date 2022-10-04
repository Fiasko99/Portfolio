<template>
  <div>
    <Header />
    <router-view />
    <Footer />
    <back-animation />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  created() {
    
  },
  components: {
    Header, Footer
  }
}
</script>

<style>
body {
  background: cornsilk;
}
</style>
