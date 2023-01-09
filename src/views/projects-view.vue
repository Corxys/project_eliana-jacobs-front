<script setup>
// General
import {ref, computed, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

// Components
import TransitionComponent from "@/components/transition-component.vue";
import GalleryComponent from "@/components/gallery-component.vue";
import ImageCustomComponent from "@/components/image-custom-component.vue";

// Images
import shapeBottom from "@/assets/images/projects_shape-01.png";

// Utils
import {slugifyTitle} from "@/utils/slugifyTitle";

// Hook call
const store = useStore();
const route = useRoute();
const router = useRouter();

// Store
const hasFilter = computed(() => store.state.app.hasFilter);
const hasTransitionScreen = computed(() => store.state.app.hasTransitionScreen);
const layoutProjects = computed(() => store.state.app.layoutProjects);
const selectedFilter = computed(() => store.state.app.selectedFilter);
const filters = computed(() => store.state.filters.selected);
const projects = computed(() => store.state.projects.selected);
const medias = computed(() => store.state.projects.medias);

// Ref
let indexOfFocusedImage = ref(0);

// Methods
async function selectFilter({name}) {
	indexOfFocusedImage.value = 0;
	await store.dispatch("setHasTransitionScreen", {"hasTransitionScreen": false});
  await store.dispatch("setSelectedFilter", {name});
}
const changeImageFocused = ({index}) => {
	indexOfFocusedImage.value = index;
};

// Computed
const displayedFilters = computed(() => {
	// "Circus" are the only projects page where the "All" filter is necessary.
	if (route.fullPath === "/projects/circus") {
		const filtersMap = filters.value.map((filterMap) => filterMap);
		filtersMap.unshift({"id": 0, "attributes": {"name": "All"}});
		store.dispatch("setSelectedFilter", {"name": "All"});
		return filtersMap;
	} else {
		return filters.value;
	}
});

// Watchers
watch(() => route, () => {
	store.dispatch("setImageOnPreview", {"isImageOnPreview": false});
}, {"deep": true, "immediate": true});

// Watcher
watch(() => route, (param) => {
  const categoryName = param.path.slice(1, param.path.length).split("/")[1].split("-").join(" ");
	store.dispatch("setProjectsByCategory", {"category": categoryName});
}, {"deep": true, "immediate": true});
</script>

<template>
  <section
    class="projects"
    :style="[hasTransitionScreen ? {'position': 'fixed', 'overflow': 'hidden'} : {'position': 'static', 'overflow': 'inherit'}]"
  >
    <!-- Transition screen -->
    <transition-component v-if="hasFilter && hasTransitionScreen" :types="filters" @select-filter="selectFilter" />

    <!-- Filters -->
    <div v-if="hasFilter" class="projects__filters">
      <div
        v-for="filter of displayedFilters"
        :key="filter.id"
        class="projects__filter"
        :class="{'projects__filter--active': filter.attributes.name === selectedFilter}"
        @click="selectFilter({'name': filter.attributes.name})"
      >
        {{filter.attributes.name}}
      </div>
    </div>

    <!-- Projects -->
    <div v-if="projects.length || medias.length" class="projects__content">
      <!-- Gallery layout	-->
      <div v-if="layoutProjects === 'gallery'" class="projects__gallery">
        <div class="projects__gallery-images">
          <gallery-component :on-click="changeImageFocused" :images="medias" />
        </div>
        <div v-if="medias[indexOfFocusedImage].src.data.attributes" class="projects__gallery-highlight">
          <image-custom-component
            :image="medias[indexOfFocusedImage]"
            :copyright="medias[indexOfFocusedImage].copyright"
            :has-preview="true"
          />
        </div>
      </div>

      <!-- List layout -->
      <div v-else class="projects__list">
        <div v-for="project of projects" :key="project.id" class="projects__item">
          <div
            v-if="project.attributes.medias[0].src.data.attributes"
            class="projects__item-image projects__item-image--link"
            @click="store.dispatch('setProject', {'id': project.id})"
          >
            <router-link :to="`/project/${slugifyTitle(project.attributes.name)}`">
              <image-custom-component
                :image="project.attributes.medias[0]"
              />
            </router-link>
          </div>
          <h2 class="projects__item-title projects__item-title--link" @click="store.dispatch('setProject', {'id': project.id})">
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
	padding: var(--container-padding);
	// Active only when the "transition-component" is displayed.
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
  &__filters {
    display: flex;
		flex-wrap: wrap;
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
		margin-bottom: 10px;
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
  &__item {
    width: 100%;
    padding: 5px;
    border: 1px solid var(--epj-c-white);
    &-image {
      width: 100%;
      height: 350px;
			:deep(.image) {
				height: 100%;
				img {
					cursor: pointer;
					object-fit: cover;
					height: 100%;
					width: 100%;
				}
			}
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
	&__shape {
		position: absolute;
		&-01 {
			bottom: 0;
			right: 0;
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
