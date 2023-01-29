import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/home-view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/about-view.vue"),
    },
    {
      path: "/article/:slug",
      name: "article",
      component: () => import("../views/article-view.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/contact-view.vue"),
    },
    {
      path: "/legal-notices",
      name: "legal-notices",
      component: () => import("../views/legal-notices-view.vue"),
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/news-view.vue"),
    },
    {
      path: "/projects/:slug",
      name: "projects",
      component: () => import("../views/projects-view.vue"),
    },
    {
      path: "/projects/:slug/:slug",
      name: "project",
      component: () => import("../views/project-view.vue"),
    },
  ],
});

export default router;
