<script setup>
// General
import {ref, computed, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {marked} from "marked";

// Components
import ArrowBackComponent from "@/components/arrow-back-component.vue";
import ImageCustomComponent from "@/components/image-custom-component.vue";
import GalleryComponent from "@/components/gallery-component.vue";

// Hook call
const store = useStore();
const route = useRoute();

// Store
const project = computed(() => store.state.project);
const projectDate = computed(() => project.value.attributes.date.slice(0, 4));

// Ref
let indexOfFocusedImage = ref(0);

// Methods
const changeImageFocused = ({index}) => {
  indexOfFocusedImage.value = index;
};

// Watchers
watch(() => route, () => {
	store.dispatch("setImageOnPreview", {"isImageOnPreview": false});
}, {"deep": true, "immediate": true});
</script>

<template>
  <section class="project">
    <arrow-back-component />
    <div class="project__container">
      <div class="project__content">
        <h1 class="project__title">
          {{project.attributes.name}}
        </h1>
        <div class="project__date">
          {{projectDate}}
        </div>
        <p v-if="project.attributes.text" class="project__text" v-html="marked.parse(project.attributes.text)" />
        <div v-if="project.attributes.medias.length > 1" class="project__images">
          <gallery-component :images="project.attributes.medias" :on-click="changeImageFocused" />
        </div>
      </div>
      <div class="project__highlight">
        <image-custom-component
          :image="project.attributes.medias[indexOfFocusedImage].src.data.attributes"
          :copyright="project.attributes.medias[indexOfFocusedImage].copyright"
          :has-preview="true"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project {
  padding-top: 130px;
  padding-bottom: 130px;
  &__container {
    display: flex;
  }
  &__text {
    white-space: pre-wrap;
  }
  &__content, &__highlight {
    width: 50%;
  }
  &__date {
    margin-bottom: 50px;
  }
  &__highlight {
    position: sticky;
    top: 30px;
    height: 100%;
    margin-left: 30px;
    :deep(.image__src) {
			cursor: pointer;
      width: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }
}
</style>
