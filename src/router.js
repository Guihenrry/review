import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import Admin from "@/views/Admin.vue";
import PageNotFound from "@/views/PageNotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: PageNotFound
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/produto/:id",
      name: "product",
      component: Product,
      props: true
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        admin: true
      }
    }
  ]
});
