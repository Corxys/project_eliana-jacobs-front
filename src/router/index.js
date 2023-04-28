import {createRouter, createWebHistory} from "vue-router";
import {defineAsyncComponent} from "vue";

import store from "@/store";

const router = createRouter({
  "history": createWebHistory(import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL),
  "routes": [
    {
      "path": "/",
      "name": "home",
      "component": defineAsyncComponent(() => import("../views/home-view.vue")),
    },
    {
      "path": "/about",
      "name": "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      "component": defineAsyncComponent(() => import("../views/about-view.vue")),
    },
    {
      "path": "/news",
      "name": "news",
      "component": defineAsyncComponent(() => import("../views/news-view.vue")),
    },
    {
      "path": "/news/:slug",
      "name": "article",
      "component": defineAsyncComponent(() => import("../views/article-view.vue")),
    },
    {
      "path": "/contact",
      "name": "contact",
      "component": defineAsyncComponent(() => import("../views/contact-view.vue")),
    },
    {
      "path": "/legal-notices",
      "name": "legal-notices",
      "component": defineAsyncComponent(() => import("../views/legal-notices-view.vue")),
    },

    {
      "path": "/projects/:slug",
      "name": "projects",
      "component": defineAsyncComponent(() => import("../views/projects-view.vue")),
    },
    {
      "path": "/projects/:slug/:slug",
      "name": "project",
      "component": defineAsyncComponent(() => import("../views/project-view.vue")),
    },
    {
      "path": "/error",
      "name": "error",
      "component": defineAsyncComponent(() => import("../components/shared-components/error-component.vue")),
    },
    {
      "path": "/:pathMatch(.*)*",
      "name": "not-found",
      "component": defineAsyncComponent(() => import("../components/shared-components/error-component.vue")),
    }
  ],
});

router.beforeEach(async (_to, _from, next) => {
  await store.dispatch("getData")
    .then(() => {
      store.dispatch("setIsLoading", false)
        .then(() => {
          console.debug("[app] data initialized.");
          next();
        });
    })
    .catch((error) => {
      store.dispatch("setIsLoading", false);
      store.dispatch("setErrorMessage", "An error occurred while retrieving the data.");
      
      console.error(error);
      
      next();
    });
});

export default router;
