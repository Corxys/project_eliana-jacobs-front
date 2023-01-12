export default function createState() {
	return {
		app: {
			isLoading: true,
			hasTransitionScreen: false,
			hasImageOnPreview: false,
			selectedFilter: "all",
			selectedCategory: "",
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
