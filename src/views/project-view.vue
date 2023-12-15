<template>
	<section
		class="project"
		:class="{ 'project--light': lightTheme }"
	>
		<div v-if="project">
			<arrow-back-component :on-click="backOnProjectsPage" />

			<div class="project__container">
				<div class="project__content">
					<h1 class="project__title">
						{{ project.name }}
					</h1>

					<div class="project__date">
						{{ project.date }}
					</div>
					<p
						v-if="project.text"
						class="project__text"
						v-html="marked.parse(project.text)"
					/>

					<div
						v-if="project.medias.length > 1"
						class="project__images"
					>
						<gallery-component
							:images="project.medias"
							:on-click="changeImageFocused"
						/>
					</div>
				</div>

				<div
					v-if="project.medias[indexOfFocusedImage]"
					class="project__highlight"
				>
					<media-component
						:media="project.medias[indexOfFocusedImage]"
						:copyright="project.medias[indexOfFocusedImage].copyright"
						:has-preview="true"
					/>
				</div>
			</div>
		</div>

		<!-- Placeholder for the project page. -->
		<div v-else>
			Oops, an error occurred while fetching the project.
			<br />
			Try again later, and don't hesitate to contact me if the problem persists!
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { marked } from "marked";

import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import ArrowBackComponent from "@/components/shared-components/arrow-back-component.vue";
import MediaComponent from "@/components/shared-components/media-component.vue";
import GalleryComponent from "@/components/shared-components/gallery-component.vue";
import { CategoryNameSlug, FilterNameSlug, ThemeName } from "@/common/enums";
import type { Project } from "@/common/types";
import { defineRouteToPush } from "@/utils/pushRoute";

// #region Hooks
const store = useStore();
const route = useRoute();
const router = useRouter();
// #endregion

// #region Data
let viewportWidth = ref<number>(0);
// #endregion

// #region Computed
const category = computed<CategoryNameSlug>(() => store.state.selected.category);
const filter = computed<FilterNameSlug>(() => store.state.selected.filter);
const indexOfFocusedImage = computed<number>(() => store.state.app.focusedImageIndex);
const lightTheme = computed<ThemeName>(() => store.getters.lightTheme);
const project = computed<Project>(() => {
	if (store.state.selected.project === "") {
		return null;
	}

	return store.state.projects[store.state.selected.project];
});
// #endregion

// #region Functions
// Change the image focused in the window.
async function changeImageFocused({ index }: { index: number }): Promise<void> {
	store.dispatch("setFocusedImageIndex", index);

	if (viewportWidth.value < 768) {
		await store.dispatch("setImageOnPreview", true);
	}
}

// Clicking on the "Back" arrow takes the user back to the page of the projects.
async function backOnProjectsPage(): Promise<void> {
	await store.dispatch("setCategory", route.params.category);
	await store.dispatch("setFilter", route.params.filter);

	const routeToPush = await defineRouteToPush(category.value, filter.value);

	await router.push(routeToPush);
}

// Set the viewport width in the "viewportWidth" data.
function setViewportWidth(event: Event): void {
	if (!event.target) {
		return;
	}

	const eventTarget = event.target as Window;
	viewportWidth.value = eventTarget.innerWidth;
}
// #endregion

// #region Lifecycles
// Un-displays the image on preview if we return in the project page.
watch(
	() => route,
	async () => {
		await store.dispatch("setImageOnPreview", false);
	},
	{ deep: true, immediate: true },
);

// Retrieve the selected project and the category with the slug,
// and according to the viewport width, decides if the selected image
// must be previewed or displayed in the "media-component".
onMounted(async () => {
	viewportWidth.value = window.innerWidth;
	window.addEventListener("resize", setViewportWidth);

	await store.dispatch("setCategory", route.params.category);
	await store.dispatch("setFilter", route.params.filter as FilterNameSlug);
	await store.dispatch("setProject", route.params.project);
	await store.dispatch("setFocusedImageIndex", 0);
});
// Remove listener on the window resizing.
onUnmounted(() => {
	window.removeEventListener("resize", setViewportWidth);
});
// #endregion
</script>

<style scoped lang="scss">
.project {
	min-height: 100vh;
	background: radial-gradient(circle at 27.28% 77.78%, #110f10, transparent 61%), radial-gradient(circle at 42.94% 50.05%, #110f10, transparent 100%),
		radial-gradient(circle at 45.89% 30.01%, #110f10, transparent 100%), radial-gradient(circle at 99.17% 46.73%, #205251, transparent 100%),
		radial-gradient(circle at 66.28% 54.41%, #110f10, transparent 100%), radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

	&--light {
		background-image: none;
		background-color: var(--color-white);
		color: var(--color-black);
	}

	&__container {
		display: flex;
		flex-direction: column-reverse;
	}

	&__text {
		white-space: pre-wrap;
	}

	&__content,
	&__highlight {
		width: 100%;
	}

	&__title {
		margin: 30px 0;
	}

	&__date {
		margin-bottom: 30px;
	}

	&__highlight {
		height: 100%;
		margin-left: 0;
	}
}

@media (min-width: 768px) {
	.project {
		&__container {
			flex-direction: row;
		}

		&__date {
			margin-bottom: 50px;
		}

		&__content,
		&__highlight {
			width: 50%;
		}

		&__highlight {
			position: sticky;
			top: 30px;
			height: 100%;
			margin-left: 30px;

			:deep(.image__src) {
				cursor: pointer;
				width: 100%;
				object-fit: cover;
				object-position: top center;
			}
		}
	}
}
</style>
