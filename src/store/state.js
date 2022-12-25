export default function createState() {
	return {
		app: {
			hasFilter: false,
			hasTransitionScreen: false,
			selectedFilter: "All",
			selectedCategory: "",
			layoutProjects: "",
			hasImageOnPreview: false,
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
				"performance art": [],
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
