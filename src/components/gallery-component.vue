<script setup>
// General
import {inject} from "vue";

// Props
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

// Regex
const imageMimesTypesCheck = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;

// Inject
const colorTheme = inject("colorTheme");
</script>

<template>
  <div class="gallery">
    <div v-for="(image, index) of images" :key="image.id" class="gallery__image">
      <img
        v-if="imageMimesTypesCheck.test(image.src.data.attributes.mime)"
        :src="image.src.data.attributes.formats.thumbnail.url ? image.src.data.attributes.formats.thumbnail.url : image.src.data.attributes.url"
        :alt="image.src.data.attributes.alternativeText ? image.src.data.attributes.alternativeText : ''"
        @click.stop="() => onClick({index})"
      >
      <!-- Audio file -->
      <div v-else class="gallery__audio" @click.stop="() => onClick({index})">
        <font-awesome-icon
          :class="colorTheme === 'dark' ? 'gallery__audio-icon' : 'gallery__audio-icon gallery__audio-icon--light'"
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
		background-color: var(--epj-c-main);
		&-icon {
			font-size: 30px;
			margin-bottom: 5px;
			margin-right: 10px;
			color: var(--epj-c-white);
		}
	}
}
</style>
