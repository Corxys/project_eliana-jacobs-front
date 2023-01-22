/* eslint-disable max-len */

// General
import router from "@/router";
import gql from "graphql-tag";

// Utils
import graphqlClient from "@/utils/graphql";
import {slugifyTitle} from "@/utils/slugifyTitle";

// Queries
const PRACTICES_QUERY = gql`query Practices {practices {data {id attributes {title text image {src {data {attributes {url alternativeText mime}}} link copyright}}}}}`;
const NEWS_QUERY = gql`query News{news (pagination: {limit:100}){data{id attributes{address{name street cp city}date{date start end}email image {src {data {attributes {url alternativeText mime}}}copyright link}publishedAt register{src}text title website}}}}`;
const CATEGORIES_QUERY = gql`query Categories{categories{data{attributes{name}id}}}`;
const TYPES_QUERY = gql`query Types{types{data{id attributes{name image{data{attributes{url alternativeText}}}category{data{id attributes{name}}}}}}}`;
const PROJECTS_QUERY = gql`query Projects{projects (pagination: {limit:100}){data{id attributes{category{data{attributes{name}id}}date link{src} medias{copyright link src{data{attributes{alternativeText mime url}}}id}name text type{data{id attributes{name}}}}}}}`;

export default function createActions() {
  return {
    /**
     * GENERAL
     * @method
     * @name getData
     * @param {function} state
     * @param {function} commit
     * On app initialization, get all data.
     **/
    async getData({state, commit}) {
      console.debug("[app] data initialization...");

      // Get practices data
      console.debug("[app] get practices...");
      const responsePractices = await graphqlClient.query({"query": PRACTICES_QUERY});
      console.debug("[app] practices:", responsePractices.data.practices);
      commit("setPractices", {"practices": responsePractices.data.practices});

      // Get news data
      console.debug("[app] get news...");
      const responseNews = await graphqlClient.query({"query": NEWS_QUERY});
      console.debug("[app] news:", responseNews.data.news);
      commit("setNews", {"news": responseNews.data.news});

      // Get categories (circus, visual art, performance art, music, digital media) data
      console.debug("[app] get categories...");
      const responseCategories = await graphqlClient.query({"query": CATEGORIES_QUERY});
      console.debug("[app] categories:", responseCategories.data.categories);
      commit("setCategories", {"categories": responseCategories.data.categories});

      // Get filters (performance gallery, artistik gallery, videos / habiter, sound, video / papercutting & installation, archive) data
      console.debug("[app] get filters...");
      const responseFilters = await graphqlClient.query({"query": TYPES_QUERY});
      console.debug("[app] filters:", responseFilters.data);
      commit("setFilters", {"filters": responseFilters.data.types});

      // Get projects data
      console.debug("[app] get projects...");
      const responseProjects = await graphqlClient.query({"query": PROJECTS_QUERY});
      console.debug("[app] projects:", responseProjects.data);
      
      // Use a copy of "projects" to next dispatched them by the different categories.
      const dispatchedProjects = {...state.projects};
      
      responseCategories.data.categories.data.forEach((category) => {
        // Get the name of the category.
        const categoryName = category.attributes.name;
        // And filter projects to store them in the good category.
        dispatchedProjects.data[categoryName.toLowerCase()] = responseProjects.data.projects.data.filter((project) => project.attributes.category.data.attributes.name === categoryName);
      });
      
      // For the circus projects, medias needs to be extracted and store in a specific key.
      dispatchedProjects.data["circus"].forEach((project) => project.attributes.medias.forEach((media) => dispatchedProjects.medias.push(media)));
      
      commit("setProjects", {"projects": dispatchedProjects});
    },
    setIsLoading({commit}, {isLoading}) {
      commit("setIsLoading", {isLoading});
    },
    setHasFilter({commit}, {hasFiltered}) {
      commit("setHasFilter", {hasFiltered});
    },
    setHasTransitionScreen({commit}, {hasTransitionScreen}) {
      commit("setHasTransitionScreen", {hasTransitionScreen});
    },
    setLayoutProjects({commit}, {layoutName}) {
      commit("setLayoutProjects", {layoutName});
    },
    
    /**
     * CATEGORY
     * @method
     * @name setCategory
     * @param {function} commit
     * @param {function} dispatch
     * @param {function} getters
     * @param {string} category - Name of the selected category in the navbar component.
     * Set category for projects (allows the getter to retrieve the data).
     **/
    async setCategory({commit, dispatch, getters}, {category}) {
      await commit("setCategory", {category});
  
      // For the Digital media and Visual art projects, a transition screen needs to be displayed.
      if (category === "digital media" || category === "visual art") {
      	await dispatch("setHasTransitionScreen", {"hasTransitionScreen": true});
      } else {
      	await dispatch("setHasTransitionScreen", {"hasTransitionScreen": false});
      }
      
      await router.push(`/projects/${slugifyTitle(category)}`);
    },
    
    /**
     * FILTER
     * @method
     * @name setFilter
     * @param {function} commit
     * @param {function} dispatch
     * @param {function} getters
     * @param {string} filter - Name of the selected filter in the filters.
     * Set category for projects (allows the getter to retrieve the data).
     **/
    async setFilter({commit, dispatch, getters}, {filter}) {
      await commit("setFilter", {filter});
    },
    
    // PREVIEW
    setImageOnPreview({commit}, {isImageOnPreview}) {
      commit("setImageOnPreview", {isImageOnPreview});
    },
  
    // PROJECT
    setProject({state, commit, getters}, {id}) {
      const project = getters.projects.find((project) => project.id === id);
      commit("setProject", {project});
    },
  
    // ARTICLE
    setArticle({state, commit}, {id}) {
      const article = state.news.find((article) => article.id == id);
      commit("setArticle", {article});
    },
  
    // FILTERS
    setTransitionScreen({commit}, {isTransitioned}) {
      commit("setTransitionScreen", {isTransitioned});
    },
  
    /* PROJECTS */
    // Clicking on a link in the navigation bar.
    // async setProjectsByCategory({state, commit, dispatch}, {category}) {
    // // Get projects for the categories (circus, music, performance art, digital media, visual art).
    // let selectedProjects = state.projects.data[category.toLowerCase()];
    // console.log(state.projects.data[category.toLowerCase()]);
    //
    // let selectedFilters = [];
    //
    // // If there is projects in the selected category, select associated filters and push to the route.
    // if (selectedProjects.length) {
    //   console.log("There is projects!");
    //   selectedFilters = state.filters.data.filter((filter) => {
    //     return filter.attributes.category.data.attributes.name.toLowerCase() === category.toLowerCase();
    //   });
    //
    //   if (state.app.selectedFilter !== "All") {
    //     // If the selected filter isn't "All", select the projects corresponding to the selected filter.
    //     selectedProjects = state.projects.data[category.toLowerCase()].filter((project) => {
    //       return project.attributes.type.data.attributes.name === state.app.selectedFilter;
    //     });
    //     console.log("Filter isn't 'All' and this is selected projects:", selectedProjects);
    //   }
    //
    //   await commit("setProjectsByCategory", {
    //     category,
    //     selectedProjects,
    //     selectedFilters,
    //   });
    // }
    // // If not, push to the waiting route.
    // else {
    //   await router.push("/projects/waiting");
    // }
    // },
    // // Clicking on a filter.
    // setSelectedFilter({state, commit}, {name}) {
    //   const circusMedias = [];
    //   let selectedProjects = {};
    //
    //   // When the selected category corresponds to "Circus".
    //   if (state.app.selectedCategory === "circus") {
    //
    //     commit("setSelectedFilter", {"selectedFilterName": name, circusMedias});
    //     return;
    //   }
    //
    //   // When the selected category isn't "Circus", displays all projects.
    //   if (name === "all") {
    //     selectedProjects = state.projects.data[state.app.selectedCategory.toLowerCase()];
    //     return;
    //   }
    //
    //   // // If the selected filter isn't "All", select the projects corresponding to the selected filter.
    //   // selectedProjects = state.projects.data[state.app.selectedCategory].filter((project) => {
    //   //   return project.attributes.type.data.attributes.name === name;
    //   // });
    //
    //   commit("setSelectedFilter", {"selectedFilterName": name, circusMedias, selectedProjects});
    // },
	};
}
