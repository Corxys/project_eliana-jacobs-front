<script setup>
// Components
import FlowerComponent from "@/components/home-components/flower-component.vue";

// Images
import flower from "@/assets/images/home_flower.png";
</script>

<template>
  <div class="home">
    <div class="home__flower">
      <img class="home__flower-src" :src="flower" alt="">
      <flower-component />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &__flower {
    &-shape {
      position: relative;
      z-index: 5;
      width: 100vw;
      height: 100vh;
    }
    &-src {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 95%;
    }
    // TODO: define dimensions with JavaScript
    .svg {
      height: 860px;
      width: 890px;
    }
  }
}
</style>
