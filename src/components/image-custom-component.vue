<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";

// Components
import PreviewComponent from "@/components/preview-component.vue";
import AudioPlayerComponent from "@/components/project-components/audio-player-component.vue";

// Props
defineProps({
  "image": {
    "type": Object,
    "required": true,
  },
  "copyright": {
    "type": String,
    "required": false,
    "default": ""
  },
	"hasPreview": {
		"type": Boolean,
		"required": false,
		"default": false,
	}
});

// Hook call
const store = useStore();

// State
const hasImageOnPreview = computed(() => store.state.app.hasImageOnPreview);

// Methods
const displayImageOnPreview = () => {
	store.dispatch("setImageOnPreview", {"isImageOnPreview": true});
};

// Regex
const imageMimesTypesCheck = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;
const audioMimesTypesCheck = /audio\/mp3|audio\/wav|audio\/ogg/;
</script>

<template>
  <div class="image">
		<div class="image__container">
			<img
				v-if="!image.link && imageMimesTypesCheck.test(image.src.data.attributes.mime)"
				class="image__src"
				:src="image.src.data.attributes.url"
				:alt="image.src.data.attributes.alternativeText"
				@click="displayImageOnPreview"
			>
			<div v-if="hasPreview" class="image__trigger">
				<font-awesome-icon
					:class="colorTheme === 'dark' ? 'gallery__audio-icon' : 'gallery__audio-icon gallery__audio-icon--light'"
					class="gallery__audio-icon"
					:icon="['fas', 'magnifying-glass']"
				/>
			</div>
		</div>
    <iframe
      v-if="image.link"
      class="image__src"
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${image.link.split('=')[1]}`"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
		<div v-if="audioMimesTypesCheck.test(image.src.data.attributes.mime)">
			<audio-player-component :media="image" />
		</div>
    <span v-if="copyright" class="image__credits credits">
      {{copyright}}
    </span>
    <preview-component v-if="hasPreview && hasImageOnPreview" :image="image.src.data.attributes.url" :copyright="copyright" />
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 100%;
	height: 100%;
  position: relative;
	&__container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	&__trigger {
		cursor: pointer;
		position: absolute;
		height: 30px;
		width: 30px;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--epj-c-main);
		color: var(--epj-c-white);
	}
  &:hover {
    .credits {
      display: block;
    }
  }
  &__src {
     width: 100%;
   }
  &__credits {
		display: none;
   	position: absolute;
   	left: 0;
   	bottom: 0;
		color: var(--epj-c-white);
   	background-color: var(--epj-c-main);
   	padding: 7px 10px 5px 10px;
 }
}
</style>
