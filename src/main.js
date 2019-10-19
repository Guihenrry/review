import Vue from "vue";
import App from "@/App.vue";

import router from "@/router.js";
import store from "@/store.js";

import ErrorNotification from "@/components/ErrorNotification.vue";
import PageLoading from "@/components/PageLoading.vue";

Vue.component("ErrorNotification", ErrorNotification);
Vue.component("PageLoading", PageLoading);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
