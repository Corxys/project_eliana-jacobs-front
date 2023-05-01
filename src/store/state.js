export default function createState() {
	return {
		"selected": {
			"category": "",
			"filter": "",
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
			"colorTheme": "dark",
			"isLoading": true,
			"errorMessage": "",
		},
	};
}
