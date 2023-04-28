<script setup>
import {computed, inject} from "vue";
import {useStore} from "vuex";

const props = defineProps({
	"project": {
		"type": Object,
		"required": true,
		"default": () => ({"id": 0, "name": "Lorem ipsum dolor sit amet", "medias": []}),
	}
});

const store = useStore();

const projectName = computed(() => props.project.name);
const projectImage = computed(() => props.project.medias?.length ? props.project.medias[0].url : "");
const imageAlt = computed(() => projectImage.value ?
  `Cover picture of the project ${projectName.value}` :
  "There's no picture for this project");

inject("colorTheme");
</script>

<template>
  <div class="card">
    <div v-if="projectImage" class="card__image">
      <img
        class="card__src"
        :src="projectImage"
        :alt="imageAlt"
        @click="store.dispatch('setProject', projectName)"
      >
    </div>
    <h2 class="card__title" @click="store.dispatch('setProject', projectName)">
      {{projectName}}
    </h2>
  </div>
</template>

<style scoped lang="scss">
  .card {
    cursor: pointer;
    width: 100%;
    padding: 5px 5px 0 5px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    border: 1px solid var(--card-border-color);

    &:hover .card__src {
      scale: 1.05;
    }

    &:hover .card__title {
      color: var(--card-text-hover-color)
    }

    &__image {
      overflow: hidden;
      width: 100%;
      height: 350px;
    }

    &__src {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: scale 0.2s ease-in-out;
    }
  }
</style>
