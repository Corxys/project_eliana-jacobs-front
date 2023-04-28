<script setup>
import {useStore} from "vuex";

const store = useStore();

defineProps({
	"image": {
		"type": String,
		"required": true,
	},
	"copyright": {
		"type": String,
		"required": true,
	},
});

const undisplayedImageOnPreview = () => {
	store.dispatch("setImageOnPreview", false);
};
</script>

<template>
  <div class="preview" @click="undisplayedImageOnPreview">
    <img class="preview__image" :src="image" alt="Preview of the selected image.">
  </div>
</template>

<style scoped lang="scss">
.preview {
	cursor: pointer;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(17, 15, 16, 0.8);

	&__image {
		max-width: 80%;
		max-height: 80%;
		padding: 5px;
		border: 1px solid var(--epj-c-white);
	}
}
</style>
