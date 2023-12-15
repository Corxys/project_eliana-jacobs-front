<template>
	<section
		class="projects"
		:class="{ 'projects--light': lightTheme }"
	>
		<!-- Placeholder when there's no projects or layout defined for the category -->
		<placeholder-component v-if="!layout || !projects || !projects.length" />

		<div
			v-else
			class="projects__container"
		>
			<!-- Filters -->
			<div
				v-if="filters"
				class="projects__filters"
			>
				<div
					v-for="filter of filters"
					:key="filter.id"
					class="projects__filter"
					:class="{ 'projects__filter--active': slugifyString(filter.name) === selectedFilter }"
					@click="onSelectFilter(filter.name)"
				>
					<span>
						{{ filter.name }}
					</span>
				</div>
			</div>

			<!-- Projects -->
			<div class="projects__content">
				<div class="projects__content">
					<!-- Gallery layout-->
					<div
						v-if="layout === Layout.GALLERY"
						class="projects__gallery"
					>
						<div class="projects__gallery-images">
							<gallery-component
								:on-click="onChangeImageFocused"
								:images="medias"
							/>
						</div>
						<div
							v-if="focusedMedia"
							class="projects__gallery-highlight"
						>
							<media-component
								:media="focusedMedia"
								:has-preview="true"
							/>
						</div>
					</div>

					<!-- List layout -->
					<div
						v-if="layout === Layout.LIST"
						class="projects__list"
					>
						<card-component
							v-for="project of projects"
							:key="project.id"
							:project="project"
						/>
					</div>
				</div>

				<!-- Shape in the background -->
				<img
					v-if="layout === Layout.GALLERY"
					class="projects__shape"
					:src="shapeBottom"
					alt="Shape in the bottom of the site."
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import shapeBottom from "@/assets/images/shapes/projects-01.png";
import GalleryComponent from "@/components/shared-components/gallery-component.vue";
import MediaComponent from "@/components/shared-components/media-component.vue";
import CardComponent from "@/components/projects-components/card-component.vue";
import PlaceholderComponent from "@/components/projects-components/placeholder-component.vue";
import { CategoryNameSlug, FilterNameSlug } from "@/common/enums";
import { CIRCUS_TYPES_WITH_LIST_LAYOUT } from "@/common/constants";
import { slugifyString } from "@/utils/slugify";
import { shuffleArray } from "@/utils/shuffleArray";
import type { ObjectById, Media, Project } from "@/common/types";

// #region Interface/enum
enum Layout {
	LIST = "list",
	GALLERY = "gallery",
}
// #endregion

// #region Hooks
const store = useStore();
const route = useRoute();
const router = useRouter();
// #endregion

// #region Computed
const category = computed<CategoryNameSlug>(() => store.state.selected.category);
const type = computed<FilterNameSlug>(() => store.state.selected.filter);
const indexOfFocusedImage = computed(() => store.state.app.focusedImageIndex);
const selectedFilter = computed(() => store.state.selected.filter);
const lightTheme = computed(() => store.getters.lightTheme);
const filters = computed(() => store.getters.filtersByCategory);

const focusedMedia = computed<Media | null>(() => {
	if (!medias.value || !medias.value[indexOfFocusedImage.value]) {
		return null;
	}

	return medias.value[indexOfFocusedImage.value];
});
// Determine the page layout for the projects.
const layout = computed<Layout | null>(() => {
	if (!store.state.selected.category) {
		return null;
	}

	if (store.state.selected.category === CategoryNameSlug.CIRCUS && !CIRCUS_TYPES_WITH_LIST_LAYOUT.includes(store.state.selected.filter)) {
		return Layout.GALLERY;
	} else {
		return Layout.LIST;
	}
});

// Select the appropriate projects, according to the category and the filter selected.
const projects = computed<Project[] | null>(() => {
	if (!store.state.projects || store.state.selected.category === CategoryNameSlug.EMPTY) {
		return null;
	}

	const projectsFiltered = Object.values(store.state.projects as ObjectById<Project>)
		.filter((project) => {
			// Filters by categories.
			return project.categories.map((category) => slugifyString<CategoryNameSlug>(category)).includes(store.state.selected.category);
		})
		.filter((project) => {
			const TYPES_RETURN_ALL_PROJECTS = [FilterNameSlug.EMPTY, FilterNameSlug.ALL, FilterNameSlug.NONE];

			// Filters by type.
			if (TYPES_RETURN_ALL_PROJECTS.includes(store.state.selected.filter)) {
				return project;
			}

			return slugifyString(project.type) === store.state.selected.filter;
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

	return projectsFiltered;
});

// Returns a shuffled list of medias if the selected category is circus.
const medias = computed<Media[] | null>(() => {
	if (!projects.value || store.state.selected.category !== CategoryNameSlug.CIRCUS) {
		return null;
	}

	return shuffleArray(
		projects.value.reduce((acc: Media[], project) => {
			acc.push(
				...project.medias.map((media) => ({
					...media,
					type: slugifyString(project.type) as FilterNameSlug,
				})),
			);

			return acc;
		}, []),
	);
});
// #endregion

// #region Functions
// Changes the focused image.
function onChangeImageFocused({ index }: { index: string }): void {
	store.dispatch("setFocusedImageIndex", index);
}
// Changes the selected filter.
async function onSelectFilter(name: FilterNameSlug): Promise<void> {
	await store.dispatch("setFocusedImageIndex", 0);
	await store.dispatch("setFilter", name);
	await router.push(`/projects/${category.value}/filter/${type.value}`);
}
// #endregion

// #region Lifecycles
onMounted(async () => {
	// Retrieve the selected category and filter with the slugs.
	await store.dispatch("setCategory", route.params.category as CategoryNameSlug);
	await store.dispatch("setFilter", route.params.filter as FilterNameSlug);
});
// #endregion
</script>

<style scoped lang="scss">
.projects {
	min-height: 100vh;
	background: radial-gradient(circle at 27.28% 77.78%, #110f10, transparent 61%), radial-gradient(circle at 42.94% 50.05%, #110f10, transparent 100%),
		radial-gradient(circle at 45.89% 30.01%, #110f10, transparent 100%), radial-gradient(circle at 99.17% 46.73%, #205251, transparent 100%),
		radial-gradient(circle at 66.28% 54.41%, #110f10, transparent 100%), radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

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

		&-images,
		&-highlight {
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
