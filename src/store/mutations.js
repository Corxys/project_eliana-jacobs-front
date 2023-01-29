export default function createMutations() {
	return {
    // GENERAL
    setPractices(state, {practices}) {
      state.practices = practices.data;
    },
    setNews(state, {news}) {
      state.news = news.data;
    },
		setCategories(state, {categories}) {
			state.categories = categories.data;
		},
		setFilters(state, {filters}) {
			state.filters.data = filters.data;
		},
		setProjects(state, {projects}) {
			state.projects = {...state.projects, ...projects};
    },
		setIsLoading(state, {isLoading}) {
			state.app.isLoading = isLoading;
		},
		setHasFilter(state, {hasFiltered}) {
			state.app.hasFilter = hasFiltered;
		},
		setHasTransitionScreen(state, {hasTransitionScreen}) {
			state.app.hasTransitionScreen = hasTransitionScreen;
		},
		setLayoutProjects(state, {layoutName}) {
			state.app.layoutProjects = layoutName;
		},
		
		// CATEGORIES
		setCategory(state, {category}) {
			state.app.selectedCategory = category;
		},
		
		// FILTERS
		setFilter(state, {filter}) {
			state.app.selectedFilter = filter;
		},
		
		// Preview
		setImageOnPreview(state, {isImageOnPreview}) {
			state.app.hasImageOnPreview = isImageOnPreview;
		},
		
		// Project
		setProject(state, {project}) {
      state.project = project;
    },
		
		// Article
		setArticle(state, {article}) {
			state.article = article;
		},
		
		/* Filters */
		setTransitionScreen(state, {isTransitioned}) {
			state.app.hasTransitionScreen = isTransitioned;
		},
    // setSelectedFilter(state, {selectedFilterName, circusMedias = [], selectedProjects = []}) {
		// 	state.app.selectedFilter = selectedFilterName;
		// 	state.projects.medias = circusMedias;
		// 	state.projects.selected = selectedProjects;
		// },
	};
}
