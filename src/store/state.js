export default function createState() {
	return {
		app: {
			hasFilter: false,
			hasTransitionScreen: false,
			selectedFilter: "All",
			selectedCategory: "",
			layoutProjects: "",
		},
		filters: {
			data: {},
			selected: [],
		},
		categories: [],
		projects: {
			data: {
				"circus": {
					data: [],
					medias: [],
				},
				"visual art": [],
				"performance art": [],
				"music": [],
				"digital media": [],
			},
			selected: [],
		},
		project: {},
		practices: [],
		news: [],
		article: {},
	};
}
