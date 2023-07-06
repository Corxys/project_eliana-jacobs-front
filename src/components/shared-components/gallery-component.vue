<script setup>
/**
 * @property {Object} image
 * @property {string} image.id ID of the image.
 * @property {string} image.alternativeText Alternative text for the image.
 * @property {Object} image.formats Formats (small, medium, large, thumbnail) of the image.
 * @property {Object} image.formats.thumbnail Thumbnail format of the image.
 * @property {string} image.formats.thumbnail.url URL of the image.
 **/

import {computed} from "vue";
import {useStore} from "vuex";

const {state} = useStore();

defineProps({
  "images": {
    "type": Array,
    "required": true,
  },
  "onClick": {
    "type": Function,
    "required": true,
  },
});

const colorTheme = computed(() => state.app.colorTheme);

const imageMimesTypesCheck = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;
</script>

<template>
  <div class="gallery">
    <div v-for="(image, index) of images" :key="image.id" class="gallery__image">
      <img
        v-if="imageMimesTypesCheck.test(image.mime)"
        :src="image.formats.thumbnail ? image.formats.thumbnail.url : image.url"
        :alt="image.alternativeText ? image.alternativeText : ''"
        @click.stop="() => onClick({index})"
      >

      <!-- Audio file -->
      <div v-else class="gallery__audio" @click.stop="() => onClick({index})">
        <font-awesome-icon
          :class="colorTheme === 'dark' ?
            'gallery__audio-icon' :
            'gallery__audio-icon gallery__audio-icon--light'"
          class="gallery__audio-icon"
          :icon="['fas', 'volume-high']"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  overflow-y: visible;
  div {
    cursor: pointer;
    flex: auto;
    height: 100px;
    min-width: 50px;
    margin: 0 8px 8px 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: all 0.3s ease-in-out;
    }
  }
	&__audio {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-main);
		&-icon {
			font-size: 30px;
			margin-bottom: 5px;
			margin-right: 10px;
			color: var(--color-white);
		}
	}
}
</style>
