<script setup>
// Imports
import {ref, provide} from "vue";
import {RouterView} from "vue-router";

// Hook call
// const route = useRoute();

// Components
import NavbarComponent from "./components/navbar-component.vue";
import FooterComponent from "./components/footer-component.vue";

// Ref
const isMenuOpen = ref(false);
const isTransitionScreenOpen = ref(false);
// const theme = ref("");

// Provider
provide("isMenuOpen", isMenuOpen);
provide("isTransitionScreenOpen", isTransitionScreenOpen);
// provide("theme", theme);

// Data
const routes = ["/projects/visual-art", "/projects/digital-media", "/projects/performance-art", "/project/visual-art", "/project/digital-media", "/project/performance-art"];

// Route watch
// watch(() => route.fullPath, () => {
//   console.debug("Watch 'route.fullPath' changed to:", route.fullPath);
//   routes.forEach((testedRoute, index) => {
//     console.debug("Route checked:", testedRoute, "to the index:", index);
//     console.debug("Yes or no?", routes.indexOf(route.fullPath));
//     routes.indexOf(route.fullPath) ? theme.value = "light" : theme.value = "dark";
//     // if (testedRoute.match(route.fullPath)) {
//     //   theme.value = "dark";
//     //   console.debug("Theme dark:", theme.value);
//     // } else {
//     //   theme.value = "light";
//     //   console.debug("Theme light:", theme.value);
//     //
//     // }
//   }, {immediate: true});
//   // console.debug("Theme used for this page:", theme.value);
// });
</script>

<template>
  <navbar-component theme="light" />
  <div class="container" :class="{'container--stuck': isMenuOpen}">
    <router-view />
  </div>
  <footer-component />
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  &--stuck {
    position: fixed;
  }
}
</style>
