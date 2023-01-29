export default function createState() {
	return {
		app: {
			isLoading: true,
			hasTransitionScreen: false,
			hasImageOnPreview: false,
			selectedFilter: "all",
			selectedCategory: "",
			colorTheme: "dark",
		},
		filters: {
			data: {},
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
		},
		project: {},
		practices: [],
		news: [],
		article: {},
	};
}
