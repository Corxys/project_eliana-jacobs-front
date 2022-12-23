<script setup>
// General
import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {marked} from "marked";

// Components
import ArrowBack from "@/components/arrow-back-component.vue";
import ImageCustom from "@/components/image-custom-component.vue";
import Gallery from "@/components/gallery-component.vue";

// Hook call
const store = useStore();
const router = useRouter();

// Store
const project = computed(() => store.state.project);
const projectDate = computed(() => project.value.attributes.date.slice(0, 4));

// Ref
let indexOfFocusedImage = ref(0);

// Methods
const changeImageFocused = ({index}) => {
  indexOfFocusedImage.value = index;
};
</script>

<template>
  <section class="project">
    <arrow-back :on-click="router.back" />
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
          <gallery :images="project.attributes.medias" :on-click="changeImageFocused" />
        </div>
      </div>
      <div class="project__highlight">
        <image-custom
          class="project__highlight-image"
          :src="project.attributes.medias[indexOfFocusedImage].src.data.attributes.url"
          :alt="project.attributes.medias[indexOfFocusedImage].src.data.attributes.alternativeText"
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
    padding-left: 30px;
    margin-top: 12px;
    &-image {
      cursor: pointer;
    }
    :deep(.image__src) {
      width: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }
}
</style>
