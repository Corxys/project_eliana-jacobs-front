// General
import {createStore} from "vuex";
import gql from "graphql-tag";

// Utils
import graphqlClient from "../utils/graphql";


const PRACTICES_QUERY = gql`query Practices {practices {data {id attributes {title text image {src {data {attributes {url}}}copyright}}}}}`;
// eslint-disable-next-line max-len
const NEWS_QUERY = gql`query News{news (pagination: {limit:100}){data{id attributes{address{name street cp city}date{date start end}email image {src {data {attributes {url alternativeText}}}copyright}publishedAt register{src}text title website}}}}`;
const CATEGORIES_QUERY = gql`query Categories{categories{data{attributes{name}id}}}`;
const TYPES_QUERY = gql`query Types{types{data{id attributes{name image{data{attributes{url alternativeText}}}category{data{id attributes{name}}}}}}}`;
// eslint-disable-next-line max-len
const PROJECTS_QUERY = gql`query Projects{projects (pagination: {limit:100}){data{id attributes{category{data{attributes{name}id}}date link{src}medias{copyright src{data{attributes{alternativeText mime url}}}id}name text type{data{id attributes{name}}}}}}}`;

export default createStore({
  state() {
    return {
      app: {
        hasFilter: false,
        hasTransitionScreen: false,
        selectedFilter: "All",
        selectedCategory: "",
        layoutProjects: "",
      },
      filters: {
        data: {},
        selected: [],
      },
      categories: [],
      projects: {
        data: {
          "circus": {
            data: [],
            medias: [],
            selectedMedia: "",
          },
          "visual art": [],
          "performance art": [],
          "music": [],
          "digital media": [],
        },
        selected: [],
      },
      project: {},
      practices: [],
      news: [],
      article: {},
    };
  },
  mutations: {
    /* General */
    setPractices(state, {practices}) {
      state.practices = practices.data;
    },
    setNews(state, {news}) {
      state.news = news.data;
    },
    setProjects(state, {projects}) {
      const circusMedias = [];
      state.projects.data["circus"].data = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Circus");
      state.projects.data["circus"].data.forEach((project) => {
        project.attributes.medias.forEach((media) => circusMedias.push(media));
      });
      state.projects.data["circus"].medias = circusMedias;
      state.projects.data["circus"].selectedMedia = state.projects.data["circus"].medias[0];
      
      state.projects.data["visual art"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Visual Art");
      state.projects.data["performance art"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Performance Art");
      state.projects.data["music"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Music");
      state.projects.data["digital media"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Digital Media");
    },
    setFilters(state, {filters}) {
      state.filters.data = filters.data;
    },
    setCategories(state, {categories}) {
      state.categories = categories.data;
    },
    
    /* Projects */
    setProject(state, {id}) {
      state.project = state.projects.selected.find((project) => project.id === id);
    },
    setCategoryForProjects(state, {isFiltered, isTransitioned, category, layout}) {
      console.log(isFiltered, isTransitioned, category, layout);
      state.app.hasFilter = isFiltered;
      state.app.hasTransitionScreen = isTransitioned;
      state.app.layoutProjects = layout;
      state.app.selectedCategory = category;
      const projects = state.projects.data[category.toLowerCase()];
      if (projects.length || projects.data.length) {
        state.projects.selected = projects.length ? projects : projects.data;
        state.filters.selected = state.filters.data.filter((filter) => filter.attributes.category.data.attributes.name.toLowerCase() === category.toLowerCase());
      }
    },
    setTransitionScreen(state, {isTransitioned}) {
      state.app.hasTransitionScreen = isTransitioned;
    },
    setSelectedMedia(state, {media}) {
      state.projects.data["circus"].selectedMedia = media;
    },
    
    /* Filters */
    setSelectedFilter(state, {name}) {
      state.app.selectedFilter = name;
      
      if (state.app.selectedCategory === "Circus") {
        const circusMedias = [];
        
        if (name === "All") {
          state.projects.data["circus"].data.forEach((project) => {
            project.attributes.medias.forEach((media) => circusMedias.push(media));
          });
          state.projects.data["circus"].medias = circusMedias;
          state.projects.data["circus"].selectedMedia = state.projects.data["circus"].medias[0];
          return;
        }
        
        state.projects.data["circus"].data.filter((project) => {
          if (project.attributes.type.data.attributes.name.toLowerCase() === name.toLowerCase()) {
            project.attributes.medias.forEach((media) => circusMedias.push(media));
          }
        });
        state.projects.data["circus"].medias = circusMedias;
        state.projects.data["circus"].selectedMedia = state.projects.data["circus"].medias[0];
        return;
      }
      
      if (name === "All") {
        state.projects.selected = state.projects.data[state.app.selectedCategory.toLowerCase()];
        return;
      }
      state.projects.selected = state.projects.data[state.app.selectedCategory.toLowerCase()].filter((project) => project.attributes.type.data.attributes.name.toLowerCase() === name.toLowerCase());
    },
    
    /* News */
    setArticle(state, {id}) {
      state.article = state.news.find((article) => article.id == id);
    },
  },
  actions: {
    /* General */
    async getData({commit}) {
      console.debug("[app] data initialization...");
      
      // Practices initialization
      console.debug("[app] get practices...");
      const responsePractices = await graphqlClient.query({"query": PRACTICES_QUERY});
      console.debug("[app] practices:", responsePractices.data.practices);
      commit("setPractices", {"practices": responsePractices.data.practices});
      
      // News initialization
      console.debug("[app] get news...");
      const responseNews = await graphqlClient.query({"query": NEWS_QUERY});
      console.debug("[app] news:", responseNews.data.news);
      commit("setNews", {"news": responseNews.data.news});
      

      // Categories initialization
      console.debug("[app] get categories...");
      const responseCategories = await graphqlClient.query({"query": CATEGORIES_QUERY});
      console.debug("[app] categories:", responseCategories.data.categories);
      commit("setCategories", {"categories": responseCategories.data.categories});

      // Filters initialization
      console.debug("[app] get filters...");
      const responseFilters = await graphqlClient.query({"query": TYPES_QUERY});
      console.debug("[app] filters:", responseFilters.data);
      commit("setFilters", {"filters": responseFilters.data.types});
      
      // // Projects initialization
      console.debug("[app] get projects...");
      const responseProjects = await graphqlClient.query({"query": PROJECTS_QUERY});
      console.debug("[app] projects:", responseProjects.data);
      commit("setProjects", {"projects": responseProjects.data.projects});
      
      console.debug("[app] data initialized.");
    },
  },
});
