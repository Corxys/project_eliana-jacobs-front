<script setup>
import flower from "../assets/images/home_flower.png";
</script>

<template>
  <div class="home">
    <div class="home__flower">
      <img class="home__flower-src" :src="flower" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  //height: 100vh;
  &__flower {
    height: 100%;
    &-src {
      height: 100%;
    }
  }
}
</style>
