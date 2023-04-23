<script setup>
import {ref, computed, watch, inject} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

import TransitionComponent from "@/components/transition-component.vue";
import GalleryComponent from "@/components/gallery-component.vue";
import ImageCustomComponent from "@/components/shared-components/image-custom-component.vue";
import CardComponent from "@/components/projects-components/card-component.vue";
import PlaceholderComponent from "@/components/projects-components/placeholder-component.vue";

import shapeBottom from "@/assets/images/shapes/projects-01.png";

const store = useStore();
const route = useRoute();
const router = useRouter();

const filters = computed(() => store.getters.filters);
const projects = computed(() => store.getters.projects);
const medias = computed(() => store.getters.medias);
const layout = computed(() => store.getters.layout);
const filtered = computed(() => store.getters.filtered);

const hasTransitionScreen = computed(() => store.state.app.hasTransitionScreen);
const selectedFilter = computed(() => store.state.app.selectedFilter);
const keysOfProjects = computed(() => store.state.projects.data);

let indexOfFocusedImage = ref(0);

const selectFilter = ({name}) => {
	indexOfFocusedImage.value = 0;
	store.dispatch("setFilter", {"filter": name.toLowerCase()});
	store.dispatch("setHasTransitionScreen", {"hasTransitionScreen": false});
};
const changeImageFocused = ({index}) => {
	indexOfFocusedImage.value = index;
};

const displayedFilters = computed(() => {
	// "Circus" are the only projects page where the "All" filter is necessary.
	if (route.fullPath === "/projects/circus") {
		const filtersMap = filters.value.map((filterMap) => filterMap);
		filtersMap.unshift({"id": 0, "attributes": {"name": "all"}});
		store.dispatch("setFilter", {"filter": "all"});
		return filtersMap;
	} else {
		return filters.value;
	}
});

// Watchers
watch(() => route, (param) => {
	Object.keys(keysOfProjects.value).forEach((key) => {
		if (param.path.includes(key.split(" ").join("-"))) {
			// "/projects/category-name" > "projects/category-name" > ["projects", "category-name"] > ["category", "name"] > "category name"
			const categoryName = param.path.slice(1, param.path.length).split("/")[1].split("-").join(" ");
			store.dispatch("setImageOnPreview", {"isImageOnPreview": false});
			store.dispatch("setCategory", {"category": categoryName});
		}
	});
}, {"deep": true, "immediate": true});
</script>

<template>
  <section class="projects">
    <div
      v-if="projects"
      class="projects__container"
    >
      <!-- Filters -->
      <div v-if="filtered" class="projects__filters">
        <div
          v-for="filter of displayedFilters"
          :key="filter.id"
          class="projects__filter"
          :class="{'projects__filter--active': filter.attributes.name.toLowerCase() === selectedFilter}"
          @click="selectFilter({'name': filter.attributes.name})"
        >
          <span>
            {{filter.attributes.name}}
          </span>
        </div>
      </div>

      <!-- Transition screen -->
      <transition-component v-if="filtered && hasTransitionScreen" :types="filters" @select-filter="selectFilter" />

      <!-- Projects -->
      <div v-if="projects || medias" class="projects__content">
        <!-- Gallery layout	-->
        <div v-if="layout === 'gallery'" class="projects__gallery">
          <img v-if="layout === 'gallery'" class="projects__shape projects__shape-01" :src="shapeBottom" alt="Shape in the bottom of the site.">

          <div class="projects__gallery-images">
            <gallery-component :on-click="changeImageFocused" :images="medias" />
          </div>
          <div v-if="medias[indexOfFocusedImage].src.data.attributes" class="projects__gallery-highlight">
            <image-custom-component
              :media="medias[indexOfFocusedImage]"
              :copyright="medias[indexOfFocusedImage].copyright"
              :has-preview="true"
            />
          </div>
        </div>

        <!-- List layout -->
        <div v-else class="projects__list">
          <card-component
            v-for="project of projects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </div>

    <!-- Placeholder when there's no projects in the category -->
    <placeholder-component v-else />
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
    &-01 {
      bottom: 0;
      right: 20%;
    }
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
