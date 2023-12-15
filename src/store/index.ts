import { createStore } from "vuex";

import { state } from "./state";
import { getters } from "./getters";

import createMutations from "./mutations";
import createActions from "./actions";

import type { State } from "@/common/types";

export const store = createStore<State>({
	state: () => state,
	getters,
	mutations: createMutations(),
	actions: createActions(),
});
