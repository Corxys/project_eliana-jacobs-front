<script setup>
import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import {slugifyString} from "@/utils/slugify";

import TransitionComponent from "@/components/projects-components/transition-component.vue";
import GalleryComponent from "@/components/shared-components/gallery-component.vue";
import MediaComponent from "@/components/shared-components/media-component.vue";
import CardComponent from "@/components/projects-components/card-component.vue";
import PlaceholderComponent from "@/components/projects-components/placeholder-component.vue";

import shapeBottom from "@/assets/images/shapes/projects-01.png";

const store = useStore();
const route = useRoute();

const filters = computed(() => store.getters.filters);
const projects = computed(() => store.getters.projects);
const layout = computed(() => store.getters.layout);
const filtered = computed(() => store.getters.filtered);

const hasTransitionScreen = computed(() => store.state.app.hasTransitionScreen);
const selectedFilter = computed(() => store.state.selected.filter);

let indexOfFocusedImage = ref(0);

const selectFilter = (name) => {
  indexOfFocusedImage.value = 0;

  store.dispatch("setFilter", slugifyString(name));
  store.dispatch("setHasTransitionScreen", false);
};
const changeImageFocused = ({index}) => {
  indexOfFocusedImage.value = index;
};

// Select the filters, depending on the category selected.
const displayedFilters = computed(() => {
  if (!filtered.value) {
    return [];
  }

  // "Circus" is the only projects page where the "All" filter is necessary.
  if (route.params.slug === "circus") {
    const filtersMap = filters.value.map((filterMap) => filterMap);

    filtersMap.unshift({"id": 0, "name": "all"});

    store.dispatch("setFilter", "all");

    return filtersMap;
  } else {
    return filters.value;
  }
});

// Select the project, depending on the category and the filter selected, if any.
const selectedProjects = computed(() => {
  if (!projects.value) {
    return null;
  }

  const projectsInTheCategory = projects.value[route.params.slug];

  if (!projectsInTheCategory.length) {
    return null;
  }

  // If the selected filter is equal to all, return all the projects.
  if (store.state.selected.filter === "all") {
    return projectsInTheCategory;
  }

  // Select the project, according to the selected filter.
  return projectsInTheCategory.filter((project) => project.type ? slugifyString(project?.type) === selectedFilter.value : project);
});
</script>

<template>
  <section class="projects">
    <div v-if="selectedProjects" class="projects__container">
      <!-- Filters -->
      <div v-if="displayedFilters" class="projects__filters">
        <div
          v-for="filter of displayedFilters"
          :key="filter.id"
          class="projects__filter"
          :class="{'projects__filter--active': slugifyString(filter.name) === selectedFilter}"
          @click="selectFilter(filter.name)"
        >
          <span>
            {{filter.name}}
          </span>
        </div>
      </div>

      <!-- Transition screen -->
      <transition-component
        v-if="filtered && hasTransitionScreen"
        :types="displayedFilters"
        @select-filter="selectFilter"
      />

      <!-- Projects -->
      <div class="projects__content">
        <!-- Gallery layout	-->
        <div v-if="layout === 'gallery' && selectedProjects" class="projects__gallery">
          <div class="projects__gallery-images">
            <gallery-component :on-click="changeImageFocused" :images="selectedProjects" />
          </div>
          <div v-if="selectedProjects[indexOfFocusedImage]" class="projects__gallery-highlight">
            <media-component
              :media="selectedProjects[indexOfFocusedImage]"
              :has-preview="true"
            />
          </div>
        </div>

        <!-- List layout -->
        <div v-if="layout === 'list' && selectedProjects" class="projects__list">
          <card-component
            v-for="project of selectedProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </div>

    <!-- Shape in the background -->
    <img v-if="layout === 'gallery'" class="projects__shape" :src="shapeBottom" alt="Shape in the bottom of the site.">

    <!-- Placeholder when there's no projects in the category -->
    <placeholder-component v-if="!selectedProjects" />
  </section>
</template>

<style scoped lang="scss">
.projects {
  &__container {
    min-height: 100vh;
    padding: var(--container-padding);
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  &__filter {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
    padding: 0 12px;
    font-family: var(--font-primary);
    text-transform: uppercase;
    transition: 0.2s ease-in all;
    margin-right: 10px;
    height: 32px;

    &:last-child {
      margin-right: 0;
    }

    span {
      line-height: 32px;
    }
  }

  &__content {
    position: relative;
    z-index: 10;
  }

  &__gallery {
    display: flex;

    &-images, &-highlight {
      width: 50%;
      :deep(.image__src) {
        cursor: pointer;
      }
    }

    &-images {
      display: flex;
      flex-flow: row wrap;
    }

    &-highlight {
      position: sticky;
      top: 30px;
      height: 100%;
      margin-left: 30px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }

  &__shape {
    position: fixed;
    height: 60%;
    bottom: 0;
    right: 20%;
  }
}

@media (min-width: 768px) {
	.projects {
		&__list {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
</style>
