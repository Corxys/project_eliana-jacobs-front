import { useRoute } from "vue-router";

import { CATEGORIES_WITH_THE_ALL_TYPE, CATEGORIES_WITH_LIGHT_THEME } from "@/common/constants";
import { CategoryNameSlug, FilterNameFull } from "@/common/enums";
import type { State, Getters, Filter, Category } from "@/common/types";

export const getters = {
	// #region General
	// Determine if the website theme must be light.
	lightTheme(state: State): boolean {
		return CATEGORIES_WITH_LIGHT_THEME.includes(state.selected.category as CategoryNameSlug);
	},
	themeMustBeLight(state: State, getters: Getters): boolean {
		// Theme must be light when we visit the "digital-media", "visual-art"
		// and "art-performance" pages, if the navbar menu is not open.
		if (state.app.isMenuOpen) {
			return false;
		} else {
			return getters.lightTheme;
		}
	},
	// #endregion

	// #region Categories/category
	// Categories from the state, return as an array.
	categories(state: State): Category[] | null {
		return state.categories
			? Object.values(state.categories).sort((category1, category2) => {
					if (category1.index < category2.index) {
						return -1;
					} else {
						return 1;
					}
			  })
			: null;
	},
	// Determine if the "All" option is necessary in the filters.
	categoriesIncludesTheAllFilter(state: State): boolean {
		return state.selected.category ? CATEGORIES_WITH_THE_ALL_TYPE.includes(state.selected.category) : false;
	},
	// #endregion

	// #region Types/type
	// Types from the state, return as an array.
	types(state: State): Filter[] | null {
		return state.filters ? Object.values(state.filters) : null;
	},
	// Types filtered by the selected category.
	filtersByCategory(state: State, getters: Getters): Filter[] | null {
		if (!state.filters || !state.selected.category) {
			return null;
		}

		const typesFiltered = getters.types.filter((type) => type.categories.includes(state.selected.category));

		if (!typesFiltered.length) {
			return null;
		}

		if (getters.categoriesIncludesTheAllFilter) {
			typesFiltered.unshift({
				id: "0",
				name: FilterNameFull.ALL,
				image: "",
				categories: CATEGORIES_WITH_THE_ALL_TYPE,
			});
		}

		return typesFiltered;
	},
	// #endregion
};
