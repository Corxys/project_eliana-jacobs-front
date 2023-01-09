export default function createState() {
	return {
		app: {
			hasFilter: false,
			hasTransitionScreen: false,
			selectedFilter: "All",
			selectedCategory: "",
			layoutProjects: "",
			hasImageOnPreview: false,
			isLoading: true,
		},
		filters: {
			data: {},
			selected: [],
		},
		categories: [],
		projects: {
			data: {
				"circus": [],
				"visual art": [],
				"art performance": [],
				"music": [],
				"digital media": [],
			},
			medias: [],
			selected: [],
		},
		project: {},
		practices: [],
		news: [],
		article: {},
	};
}
