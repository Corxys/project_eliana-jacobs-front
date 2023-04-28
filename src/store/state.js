export default function createState() {
	return {
		"selected": {
			"category": "",
			"filter": "all",
			"projects": [],
			"project": "",
			"article": "",
		},
		"cv": "",
		"practices": null,
		"news": null,
		"categories": null,
		"filters": null,
		"projects": null,
		"app": {
			"hasTransitionScreen": false,
			"hasImageOnPreview": false,
			"selectedFilter": "all",
			"selectedCategory": "",
			"colorTheme": "dark",
			"isLoading": true,
			"errorMessage": "",
		},
	};
}
