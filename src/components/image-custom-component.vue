<script setup>
// General
import {computed} from "vue";
import {useStore} from "vuex";

// Components
import PreviewComponent from "@/components/preview-component.vue";

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
</script>

<template>
  <div class="image">
    <img
      v-if="!image.link"
      class="image__src"
      :src="image.src.data.attributes.url"
      :alt="image.src.data.attributes.alternativeText"
      @click="displayImageOnPreview"
    >
    <iframe
      v-if="image.link"
      class="image__src"
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${image.link.split('=')[1]}`"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
    <span v-if="copyright" class="image__credits credits">
      {{copyright}}
    </span>
    <preview-component v-if="hasPreview && hasImageOnPreview" :image="image.src.data.attributes.url" :copyright="copyright" />
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 100%;
  position: relative;
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
   background-color: var(--epj-c-main);
   padding: 7px 10px 5px 10px;
 }
}
</style>
