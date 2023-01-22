import {shuffleArray} from "@/utils/shuffleArray";

export default function createGetters() {
  return {
    filters(state) {
      let filters = [];
      
      if (state.app.selectedCategory) {
        filters = state.filters.data.filter((filter) => {
          return filter.attributes.category.data.attributes.name.toLowerCase() === state.app.selectedCategory;
        })
      }
      
      return filters.length ? filters : null;
    },
    projects(state) {
      // console.log("Projects getters.");
      let projects = [];
      
      if (state.app.selectedCategory) {
        // console.log("Selected category: true.");
        // If the selected filter is "all", select all the projects.
        if (state.app.selectedFilter === "all") {
          // console.log("Selected filter: 'all'.");
          projects = state.projects.data[state.app.selectedCategory.toLowerCase()];
        } else {
          // console.log("Selected filter: !'all'.")
          // If the selected filter isn't "all", select the projects corresponding to the selected filter.
          projects = state.projects.data[state.app.selectedCategory].filter((project) => {
            return project.attributes.type.data.attributes.name.toLowerCase() === state.app.selectedFilter;
          });
        }
      }
      
      return projects.length ? projects : null;
    },
    medias(state) {
      const medias = [];
      
      // When the selected category corresponds to "Circus"
      if (state.app.selectedCategory === "circus") {
        // And the selected filter is "all".
        if (state.app.selectedFilter === "all") {
          // Take the all medias in the "Circus" project and displays them.
          state.projects.data[state.app.selectedCategory].forEach((project) => {
            project.attributes.medias.forEach((media) => medias.push(media));
          });
          // Shuffle the medias.
          shuffleArray(medias);
        }
        // If the selected filter isn't "all".
        else {
          state.projects.data[state.app.selectedCategory].filter((project) => {
            // Select the medias corresponding to the selected filter.
            if (project.attributes.type.data.attributes.name.toLowerCase() === state.app.selectedFilter) {
              project.attributes.medias.forEach((media) => medias.push(media));
            }
          });
        }
      }
  
      return medias.length ? medias : null;
    },
    /**
     * @name layout
     * @param {function} state
     * Select the appropriate layout for the projects.
    **/
    layout(state) {
      if (state.app.selectedCategory === "circus") {
        return "gallery"
      } else {
        return "list";
      }
    },
    /**
     * @name filtered
     * @param {function} state
     * @param {function} getters
     * If there is filters for the selected projects, allow them to be displayed.
     **/
    filtered(state, getters) {
      return getters.filters ? true : false;
    },
  };
}
