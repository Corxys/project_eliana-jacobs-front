import {createStore} from "vuex";
import createState from "./state";
import createGetters from "./getters";
import createMutations from "./mutations";
import createActions from "./actions";

export default createStore({
  "state": createState(),
  "getters": createGetters(),
  "mutations": createMutations(),
  "actions": createActions(),
});
