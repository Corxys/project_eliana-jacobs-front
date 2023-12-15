import { type Commit, type Dispatch } from "vuex";

import graphqlClient from "@/utils/graphql";
import { CATEGORIES_WITH_THE_ALL_TYPE, CATEGORIES_WITH_TRANSITION_SCREEN } from "@/common/constants";
import { CategoryNameFull, CategoryNameSlug, FilterNameFull, FilterNameSlug, ThemeName } from "@/common/enums";
import { CATEGORIES_QUERY, CV_QUERY, NEWS_QUERY, PRACTICES_QUERY, PROJECTS_QUERY, TYPES_QUERY } from "@/requests";
import { slugifyString } from "@/utils/slugify";
import type { Getters } from "@/common/types";

export default function createActions() {
	return {
		// On app initialization, get all data.
		async getData({ commit }: { commit: Commit }): Promise<void> {
			console.debug("[app] data initialization...");

			// Get practices data.
			const responsePractices = await graphqlClient.query({ query: PRACTICES_QUERY });
			commit("setPractices", responsePractices.data.practices.data);

			// Get news data.
			const responseNews = await graphqlClient.query({ query: NEWS_QUERY });
			commit("setNews", responseNews.data.news.data);

			// Get CV link.
			const responseCV = await graphqlClient.query({ query: CV_QUERY });
			commit("setCV", responseCV.data.cv.data.attributes.link);

			// Get categories (circus, visual art, performance art, music, digital media) data.
			const responseCategories = await graphqlClient.query({ query: CATEGORIES_QUERY });
			commit("setCategories", responseCategories.data.categories.data);

			// Get filters (performance gallery, artistik gallery, videos / habiter, sound, video / papercutting & installation, archive) data.
			const responseFilters = await graphqlClient.query({ query: TYPES_QUERY });
			commit("setFilters", responseFilters.data.types.data);

			// Get projects data
			const responseProjects = await graphqlClient.query({ query: PROJECTS_QUERY });
			commit("setProjects", responseProjects.data.projects.data);
		},

		// Set category for projects (allows the getter to retrieve the data).
		setCategory({ dispatch, commit, getters }: { dispatch: Dispatch; commit: Commit; getters: Getters }, category: CategoryNameFull | CategoryNameSlug): void {
			const slugifiedCategory = slugifyString<CategoryNameSlug>(category);

			window.localStorage.setItem("category", slugifiedCategory);
			commit("setCategory", slugifiedCategory);

			if (slugifiedCategory === CategoryNameSlug.EMPTY) {
				dispatch("setFilter", FilterNameSlug.EMPTY);

				return;
			}

			// Check if there's a stored filter.
			const filterName = window.localStorage.getItem("filter") as FilterNameSlug | null;

			const filterIncludesCategory = filterName
				? getters.filtersByCategory && getters.filtersByCategory.map((filter) => slugifyString<FilterNameSlug>(filter.name)).includes(filterName)
				: false;

			if (!filterName || !filterIncludesCategory) {
				// Doesn't provide a filter to allow the transition screen to be displayed.
				if (CATEGORIES_WITH_TRANSITION_SCREEN.includes(slugifiedCategory)) {
					dispatch("setFilter", FilterNameSlug.EMPTY);
				} else {
					// Provide the "All" filter by default if the category includes it.
					if (CATEGORIES_WITH_THE_ALL_TYPE.includes(slugifiedCategory)) {
						dispatch("setFilter", FilterNameSlug.ALL);
					} else {
						// Either, provide the first filter available.
						const filtersByCategory = getters.types.filter((type) => type.categories.includes(slugifiedCategory));

						if (filtersByCategory.length) {
							dispatch("setFilter", slugifyString<FilterNameSlug>(filtersByCategory[0].name));
						} else {
							// Or all, if there's no filter available.
							dispatch("setFilter", FilterNameSlug.ALL);
						}
					}
				}

				return;
			}

			// If there's a filter stored, use it.
			dispatch("setFilter", filterName);
		},
		// Set filter.
		setFilter({ commit }: { commit: Commit }, filter: FilterNameFull | FilterNameSlug): void {
			const slugifiedName = slugifyString<FilterNameSlug>(filter);

			window.localStorage.setItem("filter", slugifiedName);

			commit("setFilter", slugifiedName);
		},
		// Set project.
		setProject({ commit }: { commit: Commit }, name: string) {
			if (!name) {
				return;
			}

			const slugifiedName = slugifyString<string>(name);

			window.localStorage.setItem("project", slugifiedName);

			commit("setProject", slugifiedName);
		},
		// Set article.
		setArticle({ commit }: { commit: Commit }, title: string) {
			if (!title) {
				return;
			}

			const slugifiedTitle = slugifyString<string>(title);

			window.localStorage.setItem("article", slugifiedTitle);

			commit("setArticle", slugifiedTitle);
		},

		// Set the loading screen.
		setIsLoading({ commit }: { commit: Commit }, isLoading: boolean) {
			commit("setIsLoading", isLoading);
		},
		// Set the menu status.
		setIsMenuOpen({ commit }: { commit: Commit }, isMenuOpen: boolean) {
			commit("setIsMenuOpen", isMenuOpen);
		},
		// Set an image on preview.
		setImageOnPreview({ commit }: { commit: Commit }, isImageOnPreview: boolean) {
			commit("setImageOnPreview", isImageOnPreview);
		},
		// Error message for the error page.
		setErrorMessage({ commit }: { commit: Commit }, errorMessage: string) {
			commit("setErrorMessage", errorMessage);
		},
		// Set the color theme of the website.
		setColorTheme({ commit }: { commit: Commit }, colorTheme: ThemeName) {
			commit("setColorTheme", colorTheme);
		},
		// Set the index of the focused image on the gallery component.
		setFocusedImageIndex({ commit }: { commit: Commit }, imageIndex: string) {
			commit("setFocusedImageIndex", imageIndex);
		},
	};
}
