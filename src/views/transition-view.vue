<template>
	<div class="transition">
		<div class="transition__filters">
			<div
				v-for="filter of filtersByCategory"
				:key="filter.id"
				class="transition__filter"
			>
				<div
					v-if="filter"
					class="transition__filter-image"
					@click="onClickFilter(filter.name)"
				>
					<img
						class="transition__filter-src"
						:src="filter.image || ''"
						alt=""
					/>
				</div>
				<h2
					class="transition__filter-name"
					@click="onClickFilter(filter.name)"
				>
					{{ filter.name }}
				</h2>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { FilterNameSlug } from "@/common/enums";
import { slugifyString } from "@/utils/slugify";
import type { Category, Filter } from "@/common/types";

// #region Hooks
const store = useStore();
const route = useRoute();
const router = useRouter();
// #endregion

// #region Computed
const category = computed<Category>(() => store.state.selected.category);
const type = computed<Filter>(() => store.state.selected.filter);
const filtersByCategory = computed<Filter[]>(() => store.getters.filtersByCategory);
// #endregion

// #region Data
const filtersLength = ref<number>(filtersByCategory.value?.length);
// #endregion

// #region Functions
async function onClickFilter(filterName: string) {
	const slugifiedFilter = slugifyString<FilterNameSlug>(filterName);

	await store.dispatch("setFilter", slugifiedFilter);
	await router.push(`/projects/${category.value}/filter/${type.value}`);
}
// #endregion

onMounted(async () => {
	await store.dispatch("setCategory", route.params.category);
	await store.dispatch("setFilter", route.params.filter);
});
</script>

<style scoped lang="scss">
.transition {
	z-index: 100;
	position: relative;
	overflow: hidden;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--color-white);
	padding: var(--padding-page-mobile);

	&__filters {
		display: grid;
		grid-gap: 30px;
		grid-template-rows: repeat(v-bind(filtersLength), 1fr);
		grid-template-columns: 1fr;
	}

	&__filter {
		width: 100%;

		&-image {
			cursor: pointer;
			overflow: hidden;
			width: 100%;
			height: 100%;
			max-height: 300px;
		}
		&-src {
			width: 100%;
			height: 100%;
			max-height: 300px;
			object-fit: cover;
			object-position: center;
		}
		&-name {
			cursor: pointer;
			margin-top: 15px;
			text-align: center;
			font-size: 30px;
		}
	}
}

@media (min-width: 768px) {
	.transition {
		display: flex;
		justify-content: center;
		align-items: center;

		&__filters {
			grid-template-rows: 1fr;
			grid-template-columns: repeat(v-bind(filtersLength), 1fr);
		}

		&__filter {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
