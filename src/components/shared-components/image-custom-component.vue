<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

import PreviewComponent from "@/components/preview-component.vue";
import AudioPlayerComponent from "@/components/project-components/audio-player-component.vue";

const props = defineProps({
  "media": {
    "type": Object,
    "required": true,
    "default": () => ({"link": "", "src": {"data": {"attributes": {"mime": ""}}}}),
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

const store = useStore();

const imageMimesTypesCheck = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;
const audioMimesTypesCheck = /audio\/mp3|audio\/wav|audio\/ogg/;
const mediaIsImage = computed(() => imageMimesTypesCheck.test(props.media.src.data.attributes.mime));
const mediaIsAudio = computed(() => audioMimesTypesCheck.test(props.media.src.data.attributes.mime)) ;
const mediaIsVideo = computed(() => props.media.link);

const hasImageOnPreview = computed(() => store.state.app.hasImageOnPreview);
const mediaImage = computed(() => mediaIsImage.value ? props.media.src.data.attributes.url : "");
const imageAlt = computed(() => mediaIsImage.value ? props.media.src.data.attributes.alternativeText : "");
const mediaLink = computed(() => props.media.link);

const displayImageOnPreview = () => {
	store.dispatch("setImageOnPreview", {"isImageOnPreview": true});
};
</script>

<template>
  <div class="media">
    <!-- IMAGE MEDIA -->
    <div v-if="!props.media.link && mediaIsImage" class="image">
      <img
        class="image__src"
        :src="mediaImage"
        :alt="imageAlt"
        @click="displayImageOnPreview"
      >
      <div v-if="copyright" class="image__copyright">
        {{copyright}}
      </div>
      <div v-if="hasPreview" class="image__preview">
        <font-awesome-icon class="image__icon" :icon="['fas', 'expand']" />
      </div>
      <preview-component
        v-if="hasPreview && hasImageOnPreview"
        :image="mediaImage"
        :copyright="copyright"
      />
    </div>

    <!-- VIDEO MEDIA -->
    <div v-else-if="mediaIsVideo" class="video">
      <iframe
        v-if="mediaLink"
        class="video__src"
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${media.link.split('=')[1]}`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>

    <!-- AUDIO MEDIA -->
    <div v-else-if="mediaIsAudio" class="video">
      <audio-player-component :media="media" />
    </div>

    <div v-else>
      AUCUN MEDIA CORRESPONDANT
    </div>
  </div>
</template>

<style scoped lang="scss">
.media {
  position: relative;
  width: 100%;
  height: 100%;
}

// MEDIA IMAGE
.image {
 position: relative;
  width: 100%;
  height: 100%;

  &__src {
    width: 100%;
  }

  &__copyright, &__preview {
    height: 30px;
    position: absolute;
    bottom: 0;
    background-color: var(--image-custom-preview-background-color);
    color: var(--image-custom-preview-text-color);
  }

  &__copyright {
    display: none;
    align-items: center;
    left: 0;
    padding: 0 8px;
  }

  &__preview {
    cursor: pointer;
    width: 30px;
    right: 0;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    .image__copyright {
      display: flex;
    }
  }
}

.video {
  &__src {
    width: 100%;
  }
}
</style>
