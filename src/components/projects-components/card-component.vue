<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import router from "@/router";
import {slugifyString} from "@/utils/slugify";

const {state, dispatch} = useStore();

const props = defineProps({
	"project": {
		"type": Object,
		"required": true,
		"default": () => ({"id": 0, "name": "Lorem ipsum dolor sit amet", "medias": []}),
	}
});
const selectedCategory = computed(() => state.selected.category);
const projectName = computed(() => props.project.name);
const projectImage = computed(() => props.project.medias?.length ? props.project.medias[0].url : "");
const imageAlt = computed(() => projectImage.value ?
  `Cover picture of the project ${projectName.value}` :
  "There's no picture for this project");

/**
 * Go to the page of the selected project.
 *
 * @param {string} projectName - Name of the selected project.
 **/
const goToProjectPage = async (projectName) => {
  await dispatch("setProject", projectName);
  await router.push(`/projects/${selectedCategory.value}/${slugifyString(projectName)}`);
};
</script>

<template>
  <div class="card">
    <div v-if="projectImage" class="card__image">
      <img
        class="card__src"
        :src="projectImage"
        :alt="imageAlt"
        @click="goToProjectPage(projectName)"
      >
    </div>

    <h2 class="card__title" @click="goToProjectPage(projectName)">
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
    border: 1px solid var(--color-black);

    &:hover .card__src {
      scale: 1.05;
    }

    &:hover .card__title {
      color: var(--color-main);
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
