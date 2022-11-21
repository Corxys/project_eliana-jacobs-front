<script setup>
// Import
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {computed, watch} from "vue";

// Utils
import {slugifyTitle} from "../utils/slugifyTitle";

// Components
import TransitionComponent from "../components/transition-component.vue";

// Hook call
const store = useStore();
const route = useRoute();

// Store
const hasFilter = computed(() => store.state.app.hasFilter);
const hasTransitionScreen = computed(() => store.state.app.hasTransitionScreen);
const layoutProjects = computed(() => store.state.app.layoutProjects);
const selectedFilter = computed(() => store.state.app.selectedFilter);
const filters = computed(() => store.state.filters.selected);
const projects = computed(() => store.state.projects.selected);
const medias = computed(() => store.state.projects.data["circus"].medias);
const selectedMedia = computed(() => store.state.projects.data["circus"].selectedMedia);

// Regex
const mimesTypesImage = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;

// Methods
function selectFilter({name}) {
  if (hasTransitionScreen.value) {
    store.commit("setTransitionScreen", {"isTransitioned": false});
  }
  store.commit("setSelectedFilter", {name});
}

// Watch
watch(() => route, (param) => {
  const categoryName = param.path.slice(1, param.path.length).split("/")[1].split("-").join(" ");
  switch(categoryName) {
    case "circus":
      store.commit("setCategoryForProjects", {"isFiltered": true, "isTransitioned": false, "category": categoryName, "layout": "gallery"});
      break;
    case "performance art":
      store.commit("setCategoryForProjects", {"isFiltered": false, "isTransitioned": false, "category": categoryName, "layout": "list"});
      break;
    case "music":
      store.commit("setCategoryForProjects", {"isFiltered": false, "isTransitioned": false, "category": categoryName, "layout": "list"});
      break;
    case "digital media":
      store.commit("setCategoryForProjects", {"isFiltered": true, "isTransitioned": true, "category": categoryName, "layout": "list"});
      break;
    case "visual art":
      store.commit("setCategoryForProjects", {"isFiltered": true, "isTransitioned": true, "category": categoryName, "layout": "list"});
      break;
    default:
  }
}, {"deep": true, "immediate": true});
</script>

<template>
  <section class="projects">
    <transition-component v-if="hasFilter && hasTransitionScreen" :types="filters" @select-filter="selectFilter" />
    <div v-if="hasFilter" class="projects__filters">
      <div
        v-for="filter of [{id: 0, attributes: {name: 'All'}}, ...filters]"
        :key="filter.id"
        class="projects__filter"
        :class="{'projects__filter--active': filter.attributes.name === selectedFilter}"
        @click="selectFilter({'name': filter.attributes.name})"
      >
        {{filter.attributes.name}}
      </div>
    </div>
    <div v-if="projects.length || medias.length" class="projects__content">
      <div v-if="layoutProjects === 'gallery'" class="projects__gallery">
        <div v-if="medias.length" class="projects__gallery-images">
          <div
            v-for="media of medias"
            :key="media.id"
            class="projects__gallery-image"
            @click="store.commit('setSelectedMedia', {media})"
          >
            <!-- TODO: try to get the thumbnail instead the src -->
            <img
              v-if="mimesTypesImage.test(media.src.data.attributes.mime)"
              class="projects__gallery-src"
              :src="media.src ? media.src.data.attributes.url : ''"
              :alt="media.src.data.attributes.alternativeText ? media.src.data.attributes.alternativeText : ''"
            >
            <video
              v-else
              class="projects__item-src"
              :src="media.src ? media.src.data.attributes.url : ''"
            />
          </div>
        </div>
        <div class="projects__gallery-highlight">
          <!-- TODO: on click of the image, open preview -->
          <img
            v-if="mimesTypesImage.test(selectedMedia.src.data.attributes.mime)"
            class="projects__gallery-src projects__gallery-src--highlight"
            :src="selectedMedia.src ? selectedMedia.src.data.attributes.url : ''"
            :alt="selectedMedia.alt ? selectedMedia.alt : ''"
          >
          <video
            v-else
            class="projects__item-src"
            :src="selectedMedia.src ? selectedMedia.src.data.attributes.url : ''"
          />
        </div>
      </div>
      <div v-else class="projects__list">
        <div v-for="project of projects" :key="project.id" class="projects__item">
          <div class="projects__item-image projects__item-image--link" @click="store.commit('setProject', {'id': project.id})">
            <router-link :to="`/project/${slugifyTitle(project.attributes.name)}`">
              <img
                class="projects__item-src"
                :src="project.attributes.medias.length ? project.attributes.medias[0].src.data.attributes.url : ''"
                :alt="project.attributes.medias.length ? project.attributes.medias[0].alt : ''"
              >
            </router-link>
          </div>
          <h2 class="projects__item-title projects__item-title--link" @click="store.commit('setProject', {'id': project.id})">
            <router-link :to="`/project/${slugifyTitle(project.attributes.name)}`">
              {{project.attributes.name}}
            </router-link>
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  &__filters {
    display: flex;
    margin-bottom: 30px;
  }
  &__filter {
    cursor: pointer;
    padding: 7px 12px;
    font-family: var(--font-primary);
    text-transform: uppercase;
    border: 1px solid var(--dark-filter-default-border-color);
    background-color: var(--dark-filter-default-background-color);
    color: var(--dark-filter-default-text-color);
    transition: 0.2s ease-in all;
    margin-right: 10px;
    &--active {
      border: 1px solid var(--both-filter-active-border-color);
      background-color: var(--both-filter-active-background-color);
      color: var(--both-filter-active-text-color);
    }
    :hover {
      border: 1px solid var(--dark-filter-hover-border-color);
      background-color: var(--dark-filter-hover-background-color);
      color: var(--dark-filter-hover-text-color);
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__content {}
  &__gallery {
    display: flex;
    &-images, &-highlight {
      width: 50%;
    }
    &-images {
      display: flex;
      flex-flow: row wrap;
      height: 100%;
      overflow-y: visible;
    }
    &-image {
      flex: auto;
      height: 100px;
      min-width: 50px;
      margin: 0 8px 8px 0;
    }
    &-src {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      &--highlight {
        height: auto;
        position: sticky;
        top: 0;
        object-fit: contain;
        object-position: top;
      }
    }
    &-highlight {
      margin-left: 30px;
    }
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }
  &__item {
    width: 100%;
    padding: 5px;
    border: 1px solid var(--epj-c-white);
    &-image {
      width: 100%;
      height: 350px;
      &--link {}
    }
    &-src {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &-title {
      margin-top: 5px;
      &--link {}
    }
  }
}
</style>
