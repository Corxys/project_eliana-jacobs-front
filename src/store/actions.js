/* eslint-disable max-len */

// General
import router from "../router";
import gql from "graphql-tag";

// Utils
import graphqlClient from "../utils/graphql";
import {slugifyTitle} from "../utils/slugifyTitle";

// Queries
const PRACTICES_QUERY = gql`query Practices {practices {data {id attributes {title text image {src {data {attributes {url}}}copyright}}}}}`;
const NEWS_QUERY = gql`query News{news (pagination: {limit:100}){data{id attributes{address{name street cp city}date{date start end}email image {src {data {attributes {url alternativeText}}}copyright}publishedAt register{src}text title website}}}}`;
const CATEGORIES_QUERY = gql`query Categories{categories{data{attributes{name}id}}}`;
const TYPES_QUERY = gql`query Types{types{data{id attributes{name image{data{attributes{url alternativeText}}}category{data{id attributes{name}}}}}}}`;
const PROJECTS_QUERY = gql`query Projects{projects (pagination: {limit:100}){data{id attributes{category{data{attributes{name}id}}date link{src}medias{copyright src{data{attributes{alternativeText mime url}}}id}name text type{data{id attributes{name}}}}}}}`;

export default function createActions() {
  return {
    /* GENERAL */
    async getData({commit}) {
      console.debug("[app] data initialization...");

      // Practices
      console.debug("[app] get practices...");
      const responsePractices = await graphqlClient.query({"query": PRACTICES_QUERY});
      console.debug("[app] practices:", responsePractices.data.practices);
      commit("setPractices", {"practices": responsePractices.data.practices});

      // News
      console.debug("[app] get news...");
      const responseNews = await graphqlClient.query({"query": NEWS_QUERY});
      console.debug("[app] news:", responseNews.data.news);
      commit("setNews", {"news": responseNews.data.news});

      // Categories
      console.debug("[app] get categories...");
      const responseCategories = await graphqlClient.query({"query": CATEGORIES_QUERY});
      console.debug("[app] categories:", responseCategories.data.categories);
      commit("setCategories", {"categories": responseCategories.data.categories});

      // Filters
      console.debug("[app] get filters...");
      const responseFilters = await graphqlClient.query({"query": TYPES_QUERY});
      console.debug("[app] filters:", responseFilters.data);
      commit("setFilters", {"filters": responseFilters.data.types});

      // Projects
      console.debug("[app] get projects...");
      const responseProjects = await graphqlClient.query({"query": PROJECTS_QUERY});
      console.debug("[app] projects:", responseProjects.data);
      
      const visualArtProjects = responseProjects.data.projects.data.filter((project) => project.attributes.category.data.attributes.name === "Visual Art");
      const performanceArtProjects = responseProjects.data.projects.data.filter((project) => project.attributes.category.data.attributes.name === "Performance Art");
      const musicProjects = responseProjects.data.projects.data.filter((project) => project.attributes.category.data.attributes.name === "Music");
      const digitalMediaProjects = responseProjects.data.projects.data.filter((project) => project.attributes.category.data.attributes.name === "Digital Media");
      
      const circusMedias = [];
      const circusProjects = responseProjects.data.projects.data.filter((project) => project.attributes.category.data.attributes.name === "Circus");
      circusProjects.forEach((project) => project.attributes.medias.forEach((media) => circusMedias.push(media)));
  
      circusMedias.sort(() => {
        return Math.random() - 0.5;
      });
      
      commit("setProjects", {
        circusProjects,
        circusMedias,
        visualArtProjects,
        performanceArtProjects,
        musicProjects,
        digitalMediaProjects,
      });
    },
    
    /* PROJECTS */
    // Clicking on a link in the navigation bar.
    setCategoryForProjects({state, commit}, {isFiltered, isTransitioned, category, layout}) {
      let selectedProjects, selectedFilters = [];
      
      // Get projects for the categories (circus, music, performance art, digital media, visual art).
      const projects = state.projects.data[category.toLowerCase()];
  
      // For the circus projects, the key is "projects.data", otherwise is "projects".
      selectedProjects = projects.data ? projects.data : projects;
      
      // If there is projects in the selected category, select associated filters and push to the route.
      if (selectedProjects.length) {
        selectedFilters = state.filters.data.filter((filter) => {
          return filter.attributes.category.data.attributes.name.toLowerCase() === category.toLowerCase();
        });
        router.push(`/projects/${slugifyTitle(category)}`);
  
        commit("setCategoryForProjects", {
          isFiltered,
          isTransitioned,
          category,
          layout,
          selectedProjects,
          selectedFilters,
        });
      }
      // If not, push to the waiting route.
      else {
        router.push("/projects/waiting");
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
    setSelectedFilter({state, commit}, {name}) {
      const circusMedias = [];
      let selectedProjects = {};
      
      // When the selected category corresponds to "Circus".
      if (state.app.selectedCategory === "Circus") {
        // And the selected filter is "All".
        if (name === "All") {
          // Take the all medias in the "Circus" project and displays them.
          state.projects.data["circus"].data.forEach((project) => {
            project.attributes.medias.forEach((media) => circusMedias.push(media));
          });
        }
        
        // If the selected filter isn't "All".
        state.projects.data["circus"].data.filter((project) => {
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
      }
      
      // If the selected filter isn't "All", select the projects corresponding to the selected filter.
      selectedProjects = state.projects.data[state.app.selectedCategory.toLowerCase()].filter((project) => {
        return project.attributes.type.data.attributes.name.toLowerCase() === name.toLowerCase();
      });
      
      commit("setSelectedFilter", {"selectedFilterName": name, selectedProjects});
    },
	};
}
