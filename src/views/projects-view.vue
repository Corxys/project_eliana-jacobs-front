<script setup>
import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import {slugifyString} from "@/utils/slugify";
import {shuffleArray} from "@/utils/shuffleArray";

import GalleryComponent from "@/components/shared-components/gallery-component.vue";
import MediaComponent from "@/components/shared-components/media-component.vue";
import CardComponent from "@/components/projects-components/card-component.vue";
import PlaceholderComponent from "@/components/projects-components/placeholder-component.vue";

import shapeBottom from "@/assets/images/shapes/projects-01.png";

const {state, getters, dispatch} = useStore();
const route = useRoute();

const indexOfFocusedImage = computed(() => state.app.focusedImageIndex);
const selectedFilter = computed(() => state.selected.filter);
const lightTheme = computed(() => getters.lightTheme);
const filters = computed(() => getters.filters(route.params.slug));

/**
 * Select the appropriate layout for the projects.
 **/
const layout = computed(() => {
  if (!state.selected.category) {
    return;
  }

  if (state.selected.category === "circus") {
    return "gallery";
  } else {
    return "list";
  }
});


/**
 * Select the appropriate projects, according to the category and the filter selected.
 *
 * @param {object} state - State of the application.
 **/
const projects = computed(() => {
  if (!state.projects || state.selected.category === "") {
    return null;
  }

  const typesReturnAllProjects = ["", "all"];

  return Object.values(state.projects)
    .filter((project) => {
      // Filters by category.
      return slugifyString(project.category) === state.selected.category;
    })
    .filter((project) => {
      // Filters by type.
      if (typesReturnAllProjects.includes(state.selected.filter)) {
        return project;
      }

      return slugifyString(project.type) === state.selected.filter;
    })
    .sort((projectA, projectB) => {
      if (projectA.index < projectB.index) {
        return -1;
      }

      if (projectA.index > projectB.index) {
        return 1;
      }

      return 0;
    });
});

/**
 * Returns a shuffled list of medias if the selected category is circus.
 **/
const medias = computed(() => {
  if (!projects.value || state.selected.category !== "circus") {
    return null;
  }

  return shuffleArray(projects.value.reduce((acc, project) => {
    acc.push(
      ...project.medias.map((media) => ({
        ...media,
        "type": slugifyString(project.type),
      }))
    );

    return acc;
  }, []));
});

/**
 * Changes the focused image.
 *
 * @param index - Index of the selected image in the "medias" array.
 **/
const changeImageFocused = ({index}) => {
  dispatch("setFocusedImageIndex", index);
};

/**
 * Changes the selected filter.
 *
 * @param name - Name of the selected filter.
 **/
const selectFilter = (name) => {
  dispatch("setFocusedImageIndex", 0);
  dispatch("setFilter", name);
};

/**
 * Retrieve the selected category with the slug.
 **/
onMounted(async () => {
  await dispatch("setCategory", route.params.slug);
});
</script>

<template>
  <section class="projects" :class="{'projects--light': lightTheme}">
    <!-- Placeholder when there's no projects in the category -->
    <placeholder-component v-if="(!projects || !projects.length)" />

    <div v-else class="projects__container">
      <!-- Filters -->
      <div v-if="filters" class="projects__filters">
        <div
          v-for="filter of filters"
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

      <!-- Projects -->
      <div class="projects__content">
        <div class="projects__content">
          <!-- Gallery layout-->
          <div v-if="layout === 'gallery'" class="projects__gallery">
            <div class="projects__gallery-images">
              <gallery-component :on-click="changeImageFocused" :images="medias" />
            </div>
            <div v-if="medias[indexOfFocusedImage]" class="projects__gallery-highlight">
              <media-component
                :media="medias[indexOfFocusedImage]"
                :has-preview="true"
              />
            </div>
          </div>

          <!-- List layout -->
          <div v-if="layout === 'list'" class="projects__list">
            <card-component
              v-for="project of projects"
              :key="project.id"
              :project="project"
            />
          </div>
        </div>
        <!---->
        <!-- Shape in the background -->
        <img v-if="layout === 'gallery'" class="projects__shape" :src="shapeBottom" alt="Shape in the bottom of the site.">
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects {
  min-height: 100vh;
  background:
    radial-gradient(circle at 27.28% 77.78%, #110F10, transparent 61%),
    radial-gradient(circle at 42.94% 50.05%, #110F10, transparent 100%),
    radial-gradient(circle at 45.89% 30.01%, #110F10, transparent 100%),
    radial-gradient(circle at 99.17% 46.73%, #205251, transparent 100%),
    radial-gradient(circle at 66.28% 54.41%, #110F10, transparent 100%),
    radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

  &--light {
    background-color: var(--color-white);
    background-image: none;

    .projects {
      &__filter {
        background-color: var(--color-white);
        border: 1px solid var(--color-main);
        color: var(--color-main);

        &:hover {
          background-color: var(--color-black);
          border-color: var(--color-black);
          color: var(--color-white);
        }

        &--active {
          background-color: var(--color-main);
          color: var(--color-white);
        }
      }
    }
  }

  &__container {
    min-height: 100vh;
    padding: var(--padding-page-mobile);
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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
    height: 32px;
    background-color: var(--color-background-filter);
    border: 1px solid var(--color-border-filter);

    &:last-child {
      margin-right: 0;
    }

    span {
      line-height: 32px;
    }

    &:hover {
      background-color: var(--color-background-filter-hovered);
      border: 1px solid var(--color-border-filter-hovered);
      color: var(--color-text-filter-hovered);
    }

    &--active {
      background-color: var(--color-background-filter-active);
      border: 1px solid var(--color-border-filter-active);
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

@media (min-width: 968px) {
	.projects {
    &__container {
      padding: var(--padding-page-desktop);
    }

		&__list {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
</style>
