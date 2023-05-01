import {clone} from "lodash";

import {shuffleArray} from "@/utils/shuffleArray";
import {slugifyString} from "@/utils/slugify";

export default function createGetters() {
  return {
    practices(state) {
      return state.practices ? Object.values(state.practices) : null;
    },
    
    news(state) {
      return state.news ? Object.values(state.news) : null;
    },
    
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
    
    projects(state) {
      const projects = {};
      
      if (!state.categories || !state.projects) {
        return null;
      }
      
      Object.values(state.categories).forEach((category) => {
        const name = slugifyString(category.name);
        
        projects[name] = Object.values(state.projects).filter((project) => {
          return slugifyString(project.category) === name;
        });
      });
      
      projects["circus"] = shuffleArray(projects["circus"].reduce((acc, project) => {
        acc.push(
          ...project.medias.map((media) => {
            return ({
              ...media,
              "type": slugifyString(project.type),
            });
          }),
        );
        
        return acc;
      }, []));
      
      return projects;
    },
    
    /**
     * @param {function} state
     *
     * Select the appropriate layout for the projects.
     **/
    layout(state) {
      if (!state.selected.category) {
        return;
      }
      
      if (state.selected.category === "circus") {
        return "gallery";
      } else {
        return "list";
      }
    },
  };
}
