import {createApp} from "vue";
import main from "./app.vue";

import router from "./router";
import store from "./store";

// Font awesome imports
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {dom} from "@fortawesome/fontawesome-svg-core";
library.add(fas);
library.add(fab);
dom.watch();

// Styles
import "./assets/styles/main.scss";

store.dispatch("getData")
	.then(() => {
		// TODO: use this scope to handle the loading screen
		console.debug("[app] data initialized.");
	})
	.catch((error) => {
		console.error("An error occurred while retrieving the data.");
		console.error(error);
	});

// App init
const app = createApp(main);
app.use(router);
app.use(store);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
