import { CategoryNameSlug, ThemeName, FilterNameFull } from "@/common/enums";
import type { State } from "@/common/types";

export const state: State = {
	app: {
		colorTheme: ThemeName.DARK,
		errorMessage: "",
		focusedImageIndex: 0,
		hasImageOnPreview: false,
		isLoading: true,
		isMenuOpen: false,
	},
	categories: null,
	cv: "",
	filters: null,
	news: null,
	practices: null,
	projects: null,
	selected: {
		article: "",
		category: CategoryNameSlug.EMPTY,
		filter: FilterNameFull.EMPTY,
		project: "",
	},
};
