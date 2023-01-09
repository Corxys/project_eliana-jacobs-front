/* eslint-disable max-len */

// General
import router from "@/router";
import gql from "graphql-tag";

// Utils
import graphqlClient from "@/utils/graphql";
import {slugifyTitle} from "@/utils/slugifyTitle";
import {shuffleArray} from "@/utils/shuffleArray";

// Queries
const PRACTICES_QUERY = gql`query Practices {practices {data {id attributes {title text image {src {data {attributes {url}}} link copyright}}}}}`;
const NEWS_QUERY = gql`query News{news (pagination: {limit:100}){data{id attributes{address{name street cp city}date{date start end}email image {src {data {attributes {url alternativeText mime}}}copyright link}publishedAt register{src}text title website}}}}`;
const CATEGORIES_QUERY = gql`query Categories{categories{data{attributes{name}id}}}`;
const TYPES_QUERY = gql`query Types{types{data{id attributes{name image{data{attributes{url alternativeText}}}category{data{id attributes{name}}}}}}}`;
const PROJECTS_QUERY = gql`query Projects{projects (pagination: {limit:100}){data{id attributes{category{data{attributes{name}id}}date link{src} medias{copyright link src{data{attributes{alternativeText mime url}}}id}name text type{data{id attributes{name}}}}}}}`;

export default function createActions() {
  return {
    /* GENERAL */
    // On app initialization, get all data.
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
    
    /* PROJECTS */
    // Clicking on a link in the navigation bar.
    async setProjectsByCategory({state, commit, dispatch}, {category}) {
      // Get projects for the categories (circus, music, performance art, digital media, visual art).
      let selectedProjects = state.projects.data[category.toLowerCase()];
      
      let selectedFilters = [];
      // If there is projects in the selected category, select associated filters and push to the route.
      if (selectedProjects.length) {
        selectedFilters = state.filters.data.filter((filter) => {
          return filter.attributes.category.data.attributes.name.toLowerCase() === category.toLowerCase();
        });
        
        // If there is filters for the selected projects, allow them to be displayed.
        if (selectedFilters.length) {
          dispatch("setHasFilter", {"hasFiltered": true});
        }
        
        if (state.app.selectedFilter !== "All") {
          // If the selected filter isn't "All", select the projects corresponding to the selected filter.
          selectedProjects = state.projects.data[category].filter((project) => {
            return project.attributes.type.data.attributes.name === state.app.selectedFilter;
          });
        }
        
        // Select the appropriate layout for the projects.
        if (category.toLowerCase() === "circus") {
          dispatch("setLayoutProjects", {"layoutName": "gallery"});
        } else {
          dispatch("setLayoutProjects", {"layoutName": "list"});
        }
        
        await commit("setProjectsByCategory", {
          category,
          selectedProjects,
          selectedFilters,
        });
      }
      // If not, push to the waiting route.
      else {
        await router.push("/projects/waiting");
      }
    },
    
    /* PREVIEW */
    setImageOnPreview({commit}, {isImageOnPreview}) {
      commit("setImageOnPreview", {isImageOnPreview});
    },
  
    /* PROJECT */
    setProject({state, commit}, {id}) {
      const project = state.projects.selected.find((project) => project.id === id);
      commit("setProject", {project});
    },
  
    /* ARTICLE */
    setArticle({state, commit}, {id}) {
      const article = state.news.find((article) => article.id == id);
      commit("setArticle", {article});
    },
  
    /* FILTERS */
    setTransitionScreen({commit}, {isTransitioned}) {
      commit("setTransitionScreen", {isTransitioned});
    },
    // Clicking on a filter.
    setSelectedFilter({state, commit}, {name}) {
      const circusMedias = [];
      let selectedProjects = {};
      
      // When the selected category corresponds to "Circus".
      if (state.app.selectedCategory === "Circus") {
        // And the selected filter is "All".
        if (name === "All") {
          // Take the all medias in the "Circus" project and displays them.
          state.projects.data["circus"].forEach((project) => {
            project.attributes.medias.forEach((media) => circusMedias.push(media));
          });
          // Shuffle the medias.
          shuffleArray(circusMedias);
        }
        
        // If the selected filter isn't "All".
        state.projects.data["circus"].filter((project) => {
          // Select the medias corresponding to the selected filter.
          if (project.attributes.type.data.attributes.name.toLowerCase() === name.toLowerCase()) {
            project.attributes.medias.forEach((media) => circusMedias.push(media));
          }
        });
        commit("setSelectedFilter", {"selectedFilterName": name, circusMedias});
        return;
      }
      
      // When the selected category isn't "Circus", displays all projects.
      if (name === "All") {
        selectedProjects = state.projects.data[state.app.selectedCategory.toLowerCase()];
        return;
      }
  
      // If the selected filter isn't "All", select the projects corresponding to the selected filter.
      selectedProjects = state.projects.data[state.app.selectedCategory].filter((project) => {
        return project.attributes.type.data.attributes.name === name;
      });
      
      commit("setSelectedFilter", {"selectedFilterName": name, circusMedias, selectedProjects});
    },
	};
}
