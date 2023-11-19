import router from "@/router";

import graphqlClient from "@/utils/graphql";
import {slugifyString} from "@/utils/slugify";

import {PRACTICES_QUERY, NEWS_QUERY, CATEGORIES_QUERY, TYPES_QUERY, PROJECTS_QUERY, CV_QUERY} from "@/requests";

export default function createActions() {
  return {
    /**
     * @param {function} commit
     *
     * On app initialization, get all data.
     **/
    async getData({commit}) {
      console.debug("[app] data initialization...");
      
      // Get practices data.
      console.debug("[app] get practices...");
      const responsePractices = await graphqlClient.query({"query": PRACTICES_QUERY});
      console.debug("[app] practices:", responsePractices.data.practices);
      commit("setPractices", responsePractices.data.practices.data);
      
      // Get news data.
      console.debug("[app] get news...");
      const responseNews = await graphqlClient.query({"query": NEWS_QUERY});
      console.debug("[app] news:", responseNews.data.news);
      commit("setNews", responseNews.data.news.data);
      
      // Get CV link.
      console.debug("[app] get cv...");
      const responseCV = await graphqlClient.query({"query": CV_QUERY});
      console.debug("[app] cv:", responseCV.data.cv);
      commit("setCV", responseCV.data.cv.data.attributes.link);
      
      // Get categories (circus, visual art, performance art, music, digital media) data.
      console.debug("[app] get categories...");
      const responseCategories = await graphqlClient.query({"query": CATEGORIES_QUERY});
      console.debug("[app] categories:", responseCategories.data.categories);
      commit("setCategories", responseCategories.data.categories.data);
      
      // Get filters (performance gallery, artistik gallery, videos / habiter, sound, video / papercutting & installation, archive) data.
      console.debug("[app] get filters...");
      const responseFilters = await graphqlClient.query({"query": TYPES_QUERY});
      console.debug("[app] filters:", responseFilters.data.types);
      commit("setFilters", responseFilters.data.types.data);
      
      // Get projects data
      console.debug("[app] get projects...");
      const responseProjects = await graphqlClient.query({"query": PROJECTS_QUERY});
      console.debug("[app] projects:", responseProjects.data);
      commit("setProjects", responseProjects.data.projects.data);
    },
    
    /**
     * Set category for projects (allows the getter to retrieve the data).
     *
     * @param {function} commit
     * @param {function} dispatch
     * @param {string} category - Name of the selected category in the navbar component.
     **/
    setCategory({dispatch, commit}, category) {      
      const slugifiedCategory = slugifyString(category);
      
      window.localStorage.setItem("category", slugifyString(category));
      
      const filterName = window.localStorage.getItem("filter");
      
      if (filterName) {
        dispatch("setFilter", filterName);
      } else {
        dispatch("setFilter", "");
      }
      
      commit("setCategory", slugifyString(slugifiedCategory));
    },
    
    /**
     * Set filter.
     *
     * @param {function} commit
     * @param {string} filter - Name of the selected filter in the filters.
     **/
    setFilter({commit}, filter) {
      if (!filter) {
        return;
      }
      
      const slugifiedName = slugifyString(filter);

      window.localStorage.setItem("filter", slugifyString(filter));
      
      commit("setFilter", slugifiedName);
    },
    
    /**
     * Set project.
     * @param {Object} state
     * @param {function} commit
     * @param {string} name - Name of the selected project.
     **/
    setProject({commit}, name) {
      if (!name) {
        return;
      }
      
      const slugifiedName = slugifyString(name);
      
      window.localStorage.setItem("project", slugifyString(name));
      
      commit("setProject", slugifiedName);
    },
    
    /**
     * Set article.
     * @param {function} commit
     * @param {string} title - Title of the selected article.
     **/
    setArticle({commit}, title) {
      if (!title) {
        return;
      }
      
      const slugifiedTitle = slugifyString(title);
      
      window.localStorage.setItem("article", slugifyString(title));
      
      commit("setArticle", slugifiedTitle);
    },
    
    // Set the loading screen.
    setIsLoading({commit}, isLoading) {
      commit("setIsLoading", isLoading);
    },

	// Set the menu status.
	setIsMenuOpen({commit}, isMenuOpen) {
		commit("setIsMenuOpen", isMenuOpen);
	},
    
    // Set an image on preview.
    setImageOnPreview({commit}, isImageOnPreview) {
      commit("setImageOnPreview", isImageOnPreview);
    },
    
    // Error message for the error page.
    setErrorMessage({commit}, errorMessage) {
      commit("setErrorMessage", errorMessage);
    },
    
    // Set the color theme of the website.
    setColorTheme({commit}, colorTheme) {
      commit("setColorTheme", colorTheme);
    },
    
    // Set the index of the focused image on the gallery component.
    setFocusedImageIndex({commit}, imageIndex) {
      commit("setFocusedImageIndex", imageIndex);
    },
	};
}
