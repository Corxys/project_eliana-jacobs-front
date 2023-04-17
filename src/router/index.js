import {createRouter, createWebHistory} from "vue-router";
import {defineAsyncComponent} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: defineAsyncComponent(() => import("../views/home-view.vue")),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: defineAsyncComponent(() => import("../views/about-view.vue")),
    },
    {
      path: "/article/:slug",
      name: "article",
      component: defineAsyncComponent(() => import("../views/article-view.vue")),
    },
    {
      path: "/contact",
      name: "contact",
      component: defineAsyncComponent(() => import("../views/contact-view.vue")),
    },
    {
      path: "/legal-notices",
      name: "legal-notices",
      component: defineAsyncComponent(() => import("../views/legal-notices-view.vue")),
    },
    {
      path: "/news",
      name: "news",
      component: defineAsyncComponent(() => import("../views/news-view.vue")),
    },
    {
      path: "/projects/:slug",
      name: "projects",
      component: defineAsyncComponent(() => import("../views/projects-view.vue")),
    },
    {
      path: "/projects/:slug/:slug",
      name: "project",
      component: defineAsyncComponent(() => import("../views/project-view.vue")),
    },
  ],
});

export default router;
