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
     * @param {function} commit
     * @param {function} dispatch
     * @param {string} category - Name of the selected category in the navbar component.
     *
     * Set category for projects (allows the getter to retrieve the data).
     **/
    async setCategory({commit, dispatch}, category) {
      const categoryWithATransitionScreen = ["digital-media", "visual-art"];
      
      const slugifiedCategory = slugifyString(category);
      
      // For some categories, a transition screen needs to be displayed.
      if (categoryWithATransitionScreen.includes(slugifiedCategory)) {
        await dispatch("setHasTransitionScreen", true);
      } else {
        await dispatch("setHasTransitionScreen", false);
      }
      
      commit("setCategory", slugifiedCategory);
      
      await router.push(`/projects/${slugifiedCategory}`);
    },
    
    /**
     * @param {function} commit
     * @param {string} filter - Name of the selected filter in the filters.
     *
     * Set category for projects (allows the getter to retrieve the data).
     **/
    setFilter({commit}, filter) {
      commit("setFilter", filter);
    },
    
    /**
     * @param {Object} state
     * @param {function} commit
     * @param {string} name - Name of the selected project.
     *
     * Set project.
     **/
    async setProject({state, commit}, name) {
      const slugifiedName = slugifyString(name);
      
      window.localStorage.setItem("project", slugifiedName);
      
      commit("setProject", slugifiedName);
      
      await router.push(`/projects/${state.selected.category}/${slugifiedName}`);
    },
    
    /**
     * @param {function} commit
     * @param {string} title - Title of the selected article.
     *
     * Get article by its title.
     **/
    async setArticle({commit}, title) {
      const slugifiedTitle = slugifyString(title);
      
      window.localStorage.setItem("article", slugifiedTitle);
      
      commit("setArticle", slugifiedTitle);
      
      await router.push(`/news/${slugifiedTitle}`);
    },
    
    // Set the loading screen.
    setIsLoading({commit}, isLoading) {
      commit("setIsLoading", isLoading);
    },
    
    // Set the transition screen.
    setHasTransitionScreen({commit}, hasTransitionScreen) {
      commit("setHasTransitionScreen", hasTransitionScreen);
    },
    
    // Set an image on preview.
    setImageOnPreview({commit}, isImageOnPreview) {
      commit("setImageOnPreview", isImageOnPreview);
    },
    
    // Error message for the error page.
    setErrorMessage({commit}, errorMessage) {
      commit("setErrorMessage", errorMessage);
    },
	};
}
