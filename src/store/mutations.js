export default function createMutations() {
	return {
    // General
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
		setProjects(state, {circusProjects, circusMedias, visualArtProjects, performanceArtProjects, musicProjects, digitalMediaProjects}) {
      state.projects.data["circus"].data = circusProjects;
      state.projects.data["circus"].medias = circusMedias;
      state.projects.data["visual art"] = visualArtProjects;
      state.projects.data["performance art"] = performanceArtProjects;
      state.projects.data["music"] = musicProjects;
      state.projects.data["digital media"] = digitalMediaProjects;
    },
		
		// Projects
		setCategoryForProjects(state, {isFiltered, isTransitioned, category, layout, selectedProjects, selectedFilters}) {
			state.app.hasFilter = isFiltered;
			state.app.hasTransitionScreen = isTransitioned;
			state.app.layoutProjects = layout;
			state.app.selectedCategory = category;
			state.projects.selected = selectedProjects;
			state.filters.selected = selectedFilters;
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
    setSelectedFilter(state, {selectedFilterName, circusMedias = [], selectedProjects = []}) {
      state.app.selectedFilter = selectedFilterName;
			state.projects.data["circus"].medias = circusMedias;
			state.projects.selected = selectedProjects;
    },
	};
}
