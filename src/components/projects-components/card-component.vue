<script setup>
import {computed, inject} from "vue";
import store from "@/store";

inject("colorTheme");

const props = defineProps({
	"project": {
		"type": Object,
		"required": true,
		"default": () => ({"id": 0, "attributes": {"name": "Lorem ipsum dolor sit amet", "medias": []}}),
	}
});

const projectName = computed(() => props.project.attributes.name);
const projectImage = computed(() =>
  props.project.attributes.medias.length ?
  props.project.attributes.medias[0].src.data.attributes.url :
  ""
);
const imageAlt = computed(() => {
  return projectImage.value ? `Cover picture of the project ${projectName.value}` : "There's no picture for this project";
});

const handleProject = () => {
  store.dispatch("setProject", {"id": props.project.id});
};
</script>

<template>
  <div class="card">
    <div class="card__image">
      <img
        class="card__src"
        :src="projectImage"
        :alt="imageAlt"
        @click="handleProject"
      >
    </div>
    <h2 class="card__title" @click="handleProject">
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
