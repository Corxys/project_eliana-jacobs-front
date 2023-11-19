import {createRouter, createWebHistory} from "vue-router";

import store from "@/store";

const router = createRouter({
  "history": createWebHistory(import.meta.env.BASE_URL),
  "routes": [
    {
      "path": "/",
      "name": "home",
      "component": () => import("../views/home-view.vue"),
    },
    {
      "path": "/about",
      "name": "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      "component": () => import("../views/about-view.vue"),
    },
    {
      "path": "/news",
      "name": "news",
      "component": () => import("../views/news-view.vue"),
    },
    {
      "path": "/news/:slug",
      "name": "article",
      "component": () => import("../views/article-view.vue"),
    },
    {
      "path": "/contact",
      "name": "contact",
      "component": () => import("../views/contact-view.vue"),
    },
    {
      "path": "/legal-notices",
      "name": "legal-notices",
      "component": () => import("../views/legal-notices-view.vue"),
    },

    {
      "path": "/projects/:slug",
      "name": "projects",
      "component": () => import("../views/projects-view.vue"),
    },
    {
      "path": "/projects/:slug/:slug",
      "name": "project",
      "component": () => import("../views/project-view.vue"),
    },
    {
      "path": "/error",
      "name": "error",
      "component": () => import("../components/shared-components/error-component.vue"),
    },
    {
      "path": "/:pathMatch(.*)*",
      "name": "not-found",
      "component": () => import("../components/shared-components/error-component.vue"),
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
