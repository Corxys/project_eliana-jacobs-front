export default function createState() {
	return {
		"app": {
			"hasTransitionScreen": false,
			"hasImageOnPreview": false,
			"selectedFilter": "all",
			"selectedCategory": "",
			"colorTheme": "dark",
			"isLoading": true,
		},
		"cv": "",
		"filters": {
			"data": {},
		},
		"categories": [],
		"projects": {
			"data": {
				"circus": [],
				"visual art": [],
				"art performance": [],
				"music": [],
				"digital media": [],
			},
			"medias": [],
		},
		"project": {},
		"practices": [],
		"news": [],
		"article": {},
	};
}
