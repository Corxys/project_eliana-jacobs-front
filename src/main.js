import { createApp } from "vue"
import main from "./app.vue"
import router from "./router"

import "./assets/main.css"

const app = createApp(main)

app.use(router)

app.mount("#app")
