export default function createGetters() {
  return {
    /**
     * Select the appropriate filter depending on the category.
     *
     * @param {object} state - State of the application.
     * @return {array} - Filters that must be displayed.
     **/
    filters(state) {
      return (slug) => {
        if (!slug || !state.filters) {
          return null;
        }
        
        const categoryWithFilterAll = ["circus"];
        const filtersByCategory = Object.values(state.filters)
          .filter((filter) => filter.category === slug);
        
        // If there are no filters.
        if (!filtersByCategory.length) {
          return null;
        }
        
        // "Circus" is the only category where the "all" filter is necessary.
        if (categoryWithFilterAll.includes(slug)) {
          filtersByCategory.unshift({
            "id": "0",
            "name": "All",
            "image": "",
            "category": "circus"
          });
        }
        
        return filtersByCategory;
      };
    },
    
    /**
     * Change the website theme to light.
     *
     * @param {object} state - State of the application.
     * @return {boolean} - If "true", website theme must be "light".
     */
    lightTheme(state) {
      return ["digital-media", "visual-art", "art-performance"].includes(state.selected.category);
    },
	/**
	 * The elements must be in black when the theme is light.
	 * 
	 * @param {object} state 
	 * @param {object} getters 
	 * @return {boolean} - If "true", navbar or footer must be light.
	 */

	themeMustBeLight(state, getters) {
		// Theme must be light when we visit the "digital-media", "visual-art"
		// and "art-performance" pages, if the navbar menu is not open.
		if (state.app.isMenuOpen) {
			return false;
		} else {
			return getters.lightTheme;
		}
	},
    
    /**
     * Get all the categories.
     *
     * @param {object} state = State of the application.
     * @return {array} - Categories must be displayed.
     **/
    categories(state) {
      return state.categories ?
        Object.values(state.categories).sort((category1, category2) => {
          if (category1.index < category2.index) {
            return -1;
          } else {
            return 1;
          }
        }) :
        null;
    },
  };
}
