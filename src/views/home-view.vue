<script setup>
// Genereal
import {ref, onMounted, onUnmounted} from "vue";

// Components
import FlowerComponent from "@/components/home-components/flower-component.vue";

// Images
import flower from "@/assets/images/home_flower.png";

import shapeLeftTop from "@/assets/images/home_shape-01.png";
import shapeLeftBottom from "@/assets/images/home_shape-02.png";
import shapeRightTop from "@/assets/images/home_shape-03.png";
import shapeRightBottom from "@/assets/images/home_shape-04.png";

// Ref
const flowerWidth = ref(0);
const flowerHeight = ref(0);

// Lifecycle hook
onMounted(() => {
	flowerWidth.value = window.innerWidth;
	flowerHeight.value = window.innerHeight;
	// console.log(window.innerHeight)
	window.addEventListener("resize", setSizeOfTheFlower);
});
onUnmounted(() => {
	window.removeEventListener("resize", setSizeOfTheFlower);
});

// Methods
const setSizeOfTheFlower = (event) => {
	flowerWidth.value = event.target.innerWidth;
	flowerHeight.value = event.target.innerHeight;
};
</script>

<template>
  <div class="home">
		<img class="home__shape home__shape-01" :src="shapeLeftTop" alt="Shape in the top left of the side." />
		<img class="home__shape home__shape-02" :src="shapeLeftBottom" alt="Shape in the bottom left of the side." />
		<img class="home__shape home__shape-03" :src="shapeRightTop" alt="Shape in the top right of the side." />
		<img class="home__shape home__shape-04" :src="shapeRightBottom" alt="Shape in the top right of the side." />
		<div class="home__container">
			<div class="home__flower">
				<img class="home__flower-src" :src="flower" alt="">
				<flower-component :flower-height="flowerHeight" :flower-width="flowerWidth" />
			</div>
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
	width: 100vw;
	overflow: hidden;
  &__flower {
		max-width: 100vw;
		height: 100vh;
		overflow: hidden;
    &-shape {
      position: relative;
      z-index: 5;
      width: 100vw;
      height: 100vh;
    }
    &-src {
			pointer-events: none;
			max-width: 100vw;
			height: auto;
			overflow: hidden;
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
		&-svg {
			max-width: 100%;
			:deep(.flower) {
				height: auto;
				width: auto;
			}
		}
  }
	&__shape {
		position: absolute;
		&-01 {
			max-width: 406px;
			top: 60px;
			left: 0;
			width: 40%;
		}
		&-02 {
			left: 0;
			bottom: 90px;
			max-width: 380px;
			width: 20%;
		}
		&-03 {
			width: 30%;
			max-width: 568px;
			top: 110px;
			right: 0;
		}
		&-04 {
			right: 0;
			bottom: 110px;
			max-width: 350px;
			width: 40%;
		}
	}
}

@media (min-width: 768px) {
	.home {
		&__flower {
			max-height: 100vh;
			width: 100%;
			&-src {
				max-height: 100vh;
				width: auto;
			}
			&-svg {
				max-height: 100%;
			}
		}
	}
}
</style>
