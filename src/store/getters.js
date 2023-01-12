export default function createGetters() {
  return {
    filters(state) {
      return state.app.selectedCategory ?
        ["truc"] :
        null;
    },
    projects(state) {
      console.log(state.projects.data);
      return state.app.selectedCategory ?
        state.projects.data[state.app.selectedCategory.toLowerCase()] :
        null;
    },
    medias(state) {
      return state.app.selectedCategory === "Circus" ?
        ["medias"] :
        null;
    },
  };
}
