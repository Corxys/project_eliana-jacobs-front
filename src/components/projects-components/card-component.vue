<template>
	<div
		class="card"
		:class="{ 'card--light': !lightTheme }"
	>
		<div
			v-if="projectImage"
			class="card__image"
		>
			<img
				class="card__src"
				:src="projectImage"
				:alt="imageAlt"
				@click="onClickProjectCard(projectName)"
			/>
		</div>

		<h2
			class="card__title"
			@click="onClickProjectCard(projectName)"
		>
			{{ projectName }}
		</h2>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { slugifyString } from "@/utils/slugify";
import { CategoryNameSlug, FilterNameSlug } from "@/common/enums";
import type { Project } from "@/common/types";

const store = useStore();
const router = useRouter();

interface Props {
	project: Project;
}
const props = defineProps<Props>();

// #region Computed
const lightTheme = computed<boolean>(() => store.getters.themeMustBeLight);
const category = computed<CategoryNameSlug>(() => store.state.selected.category);
const type = computed<FilterNameSlug>(() => store.state.selected.filter);
const projectName = computed<string>(() => props.project.name);
const projectImage = computed<string>(() => (props.project.medias?.length ? props.project.medias[0].url : ""));
const imageAlt = computed<string>(() => (projectImage.value ? `Cover picture of the project ${projectName.value}` : "There's no picture for this project"));
// #endregion

// #region Functions
// Go to the page of the selected project.
async function onClickProjectCard(projectName: string): Promise<void> {
	await store.dispatch("setProject", projectName);

	if (type.value && type.value !== FilterNameSlug.NONE) {
		await router.push(`/projects/${category.value}/filter/${type.value}/project/${slugifyString<string>(projectName)}`);
	} else {
		await router.push(`/projects/${category.value}/project/${slugifyString<string>(projectName)}`);
	}
}
// #endregion
</script>

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

	&--light {
		border-color: var(--color-white);
	}
}
</style>
