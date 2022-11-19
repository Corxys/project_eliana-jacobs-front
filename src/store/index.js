import {createStore} from "vuex";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
      news: [],
      article: {},
    };
  },
  mutations: {
    /* General */
    setProjects(state, {projects}) {
      state.projects.data["circus"].data = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Circus");
      state.projects.data["circus"].data.forEach((project) => {
        project.attributes.medias.forEach((media) => state.projects.data["circus"].medias.push(media));
      });
      state.projects.data["circus"].selectedMedia = state.projects.data["circus"].medias[0];
      
      state.projects.data["visual art"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Visual art");
      state.projects.data["performance art"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Performance art");
      state.projects.data["music"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Music");
      state.projects.data["digital media"] = projects.data.filter((project) => project.attributes.category.data.attributes.name === "Digital media");
    },
    setFilters(state, {filters}) {
      state.filters.data = filters.data;
    },
    setNews(state, {news}) {
      state.news = news.data;
    },
    setCategories(state, {categories}) {
      state.categories = categories.data;
    },
    
    /* Projects */
    setProject(state, {id}) {
      state.project = state.projects.selected.find((project) => project.id === id);
    },
    setCategoryForProjects(state, {isFiltered, isTransitioned, category, layout}) {
      console.log("Category from projets page:", category);
      state.app.hasFilter = isFiltered;
      state.app.hasTransitionScreen = isTransitioned;
      state.app.layoutProjects = layout;
      state.app.selectedCategory = category;
      state.projects.selected = state.projects.data[category.toLowerCase()];
      state.filters.selected = state.filters.data.filter((filter) => filter.attributes.category.data.attributes.name.toLowerCase() === category);
    },
    setTransitionScreen(state, {isTransitioned}) {
      state.app.hasTransitionScreen = isTransitioned;
    },
    setSelectedMedia(state, {media}) {
      state.projects.data["circus"].selectedMedia = media;
    },
    
    /* Filters */
    setSelectedFilter(state, {name}) {
      if (state.app.selectedCategory === "Circus") {
        // TODO: set selected filter for circus category
        return;
      }
      
      state.app.selectedFilter = name;
      if (name === "All") {
        state.projects.selected = state.projects.data[state.app.selectedCategory.toLowerCase()];
        return;
      }
      state.projects.selected = state.projects.data[state.app.selectedCategory.toLowerCase()].filter((project) => project.attributes.type.data.attributes.name === name);
    },
    
    /* News */
    setArticle(state, {id}) {
      state.article = state.news.find((article) => article.id === id);
    },
    
    // setProjectsByCategory(state, {projects}) {
    //   state.projectsByCategory = projects;
    // },
    // setTypesByCategory(state, {types}) {
    //   state.typesByCategory = types;
    // },
    // setProjectsLayout(state, {name}) {
    //   state.projectsLayout = name;
    // },
   
  },
  actions: {
    /* General */
    async getData({commit}) {
      console.debug("[app] data initialization...");
      
      // News initialization
      console.debug("[app] get news...");
      const news = await axios.get(`${API_URL}/api/news?populate=%2A`);
      console.debug("[app] news:", news.data);
      commit("setNews", {news: news.data});
      
      // Categories initialization
      console.debug("[app] get categories...");
      const categories = await axios.get(`${API_URL}/api/categories?populate=%2A`);
      console.debug("[app] categories:", categories.data);
      commit("setCategories", {categories: categories.data});
  
      // Filters initialization
      console.debug("[app] get filters...");
      const filters = await axios.get(`${API_URL}/api/types?populate=%2A`);
      console.debug("[app] filters:", filters.data);
      commit("setFilters", {filters: filters.data});
  
      // Projects initialization
      console.debug("[app] get projects...");
      const projects = await axios.get(`${API_URL}/api/projects?populate[medias][populate]=%2A&populate[category][populate]=%2A&populate[type][populate]=%2A`);
      console.debug("[app] projects:", projects.data);
      commit("setProjects", {projects: projects.data});
      
      console.debug("[app] data initialized.");
    },

    // getProjectsByCategory({state, commit}, {categoryName}) {
    //   commit("setProjectsByCategory", {projects: state.projects[categoryName.toLowerCase()]});
    // },
    // getProjectsLayout({commit}, {categoryName}) {
    //   // let projectsLayoutName = "";
    //   // if (categoryName === "Circus") {
    //   //   projectsLayoutName = "gallery";
    //   // } else {
    //   //   projectsLayoutName = "list";
    //   // }
    //   commit("setProjectsLayout", {"name": categoryName === "Circus" ? "gallery" : "list"});
    // }
  },
});
