import { slugifyString } from "@/utils/slugify";

export default function createMutations() {
	return {
		/**
		 * @name setPractices
		 * @name setNews
		 * @name setCV
		 * @name setCategories
		 * @name setFilters
		 * @name setProjects
		 *
		 * Load data in state.
		 **/
		setPractices(state, practices) {
			if (!practices.length) {
				state.practices = null;

				return;
			}

			state.practices = practices.reduce((acc, practice) => {
				const title = slugifyString(practice.attributes.title);

				acc[title] = {
					...practice.attributes,
					id: practice.id,
					image: {
						...practice.attributes.image.src.data.attributes,
						copyright: practice.attributes.image.copyright,
						link: practice.attributes.image.link,
					},
				};

				return acc;
			}, {});
		},
		setNews(state, news) {
			if (!news.length) {
				state.news = null;

				return;
			}

			state.news = news.reduce((acc, article) => {
				const title = slugifyString(article.attributes.title);

				acc[title] = {
					...article.attributes,
					id: article.id,
					image: {
						...article.attributes.image.src.data.attributes,
						copyright: article.attributes.image.copyright,
						link: article.attributes.image.link,
					},
				};

				return acc;
			}, {});
		},
		setCV(state, cv) {
			state.cv = cv ? cv : "";
		},
		setCategories(state, categories) {
			if (!categories.length) {
				state.categories = null;

				return;
			}

			state.categories = categories.reduce((acc, category) => {
				const name = slugifyString(category.attributes.name);

				acc[name] = {
					...category.attributes,
					id: category.id,
					placeholder: category.attributes.placeholder.data?.attributes.url || null,
					types: [...category.attributes.types.data.map((type) => type.attributes.name)],
				};

				return acc;
			}, {});
		},
		setFilters(state, filters) {
			state.filters = filters.reduce((acc, filter) => {
				const name = slugifyString(filter.attributes.name);

				acc[name] = {
					...filter.attributes,
					id: filter.id,
					image: filter.attributes.image.data?.attributes.url || null,
					categories: [...filter.attributes.categories.data.map((category) => slugifyString(category.attributes.name))],
					layout: filter.attributes.layout,
				};

				return acc;
			}, {});
		},
		setProjects(state, projects) {
			state.projects = projects.reduce((acc, project) => {
				const name = slugifyString(project.attributes.name);

				acc[name] = {
					...project.attributes,
					id: project.id,
					date: project.attributes.date?.split("-")[0] || null,
					categories: [...project.attributes.categories.data.map((category) => category.attributes.name)],
					link: project.attributes.link?.src || null,
					type: project.attributes.type.data?.attributes.name || null,
					medias: [
						...project.attributes.medias.map((media) => ({
							...media.src.data.attributes,
							link: media.link,
							copyright: media.copyright,
						})),
					],
				};

				return acc;
			}, {});
		},

		// Set the selected category.
		setCategory(state, category) {
			state.selected.category = category;
		},

		// Set the selected filter.
		setFilter(state, filter) {
			state.selected.filter = filter;
		},

		// Display or hide the loading screen.
		setIsLoading(state, isLoading) {
			state.app.isLoading = isLoading;
		},

		// Open or close the menu.
		setIsMenuOpen(state, isMenuOpen) {
			state.app.isMenuOpen = isMenuOpen;
		},

		// Display or hide the image on preview.
		setImageOnPreview(state, isImageOnPreview) {
			state.app.hasImageOnPreview = isImageOnPreview;
		},

		// Set the selected projet.
		setProject(state, project) {
			state.selected.project = project;
		},

		// Set the selected article.
		setArticle(state, article) {
			state.selected.article = article;
		},

		// Set the error message for the error page.
		setErrorMessage(state, errorMessage) {
			state.app.errorMessage = errorMessage;
		},

		// Set the color theme of the website.
		setColorTheme(state, colorTheme) {
			state.app["colorTheme"] = colorTheme;
		},

		setFocusedImageIndex(state, imageIndex) {
			state.app.focusedImageIndex = imageIndex;
		},
	};
}
