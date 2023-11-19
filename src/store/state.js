export default function createState() {
	return {
		"selected": {
			"category": "",
			"filter": "",
			"project": "",
			"article": "",
		},
		"cv": "",
		"practices": null,
		"news": null,
		"categories": null,
		"filters": null,
		"projects": null, // Projects by names.
		"app": {
			"hasImageOnPreview": false,
			"colorTheme": "dark",
			"isMenuOpen": false,
			"isLoading": true,
			"errorMessage": "",
			"focusedImageIndex": 0,
		},
	};
}
