<script setup>
import {ref, onMounted, onUnmounted} from "vue";

import FlowerComponent from "@/components/home-components/flower-component.vue";

import flower from "@/assets/images/shapes/home-flower.png";

import shapeLeftTop from "@/assets/images/shapes/home-01.png";
import shapeLeftBottom from "@/assets/images/shapes/home-02.png";
import shapeRightTop from "@/assets/images/shapes/home-03.png";
import shapeRightBottom from "@/assets/images/shapes/home-04.png";

const flowerWidth = ref(0);
const flowerHeight = ref(0);

onMounted(() => {
	flowerWidth.value = window.innerWidth;
	flowerHeight.value = window.innerHeight;
	window.addEventListener("resize", setSizeOfTheFlower);
});

onUnmounted(() => {
	window.removeEventListener("resize", setSizeOfTheFlower);
});

const setSizeOfTheFlower = (event) => {
	flowerWidth.value = event.target.innerWidth;
	flowerHeight.value = event.target.innerHeight;
};
</script>

<template>
  <div class="home">
    <div class="home__shapes">
      <img class="home__shape home__shape-01" :src="shapeLeftTop" alt="Shape in the top left of the side.">
      <img class="home__shape home__shape-02" :src="shapeLeftBottom" alt="Shape in the bottom left of the side.">
      <img class="home__shape home__shape-03" :src="shapeRightTop" alt="Shape in the top right of the side.">
      <img class="home__shape home__shape-04" :src="shapeRightBottom" alt="Shape in the top right of the side.">
    </div>

    <div class="home__flower">
      <img class="home__flower-shape" :src="flower" alt="">
      <flower-component :flower-height="flowerHeight" :flower-width="flowerWidth" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 100vw;
	height: calc(var(--100-vh, 1vh) * 100);
	overflow: hidden;

	&__container {
		width: 100vw;
		height: 100%;
		overflow: hidden;
	}
  &__flower {
		width: 100%;
		height: 100%;
		overflow: hidden;
    &-shape {
			pointer-events: none;
			width: 100vw;
			height: auto;
			overflow: hidden;
			position: absolute;
			z-index: 10;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
    }
  }
	&__shape {
		position: absolute;
		&-01 {
			top: 12%;
			left: 0;
			width: 40%;
			max-width: 406px;
		}
		&-02 {
			left: 0;
			bottom: 10%;
			width: 20%;
			max-width: 380px;
		}
		&-03 {
			width: 30%;
			max-width: 568px;
			top: 12%;
			right: 0;
		}
		&-04 {
			right: 0;
			bottom: 10%;
			max-width: 350px;
			width: 40%;
		}
	}
}

@media (min-width: 768px) {
	.home {
		&__flower {
			&-shape {
				height: auto;
				width: auto;
        max-height: 100vh;
        max-width: 100vw;
			}
		}
	}
}
</style>
