import Vue from "vue";
import Vuex from "vuex";

import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: "",
      email: "",
      name: "",
      password: ""
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    }
  },
  actions: {
    getUser(context, payload) {
      return api.get(`/user/${payload}`).then(r => {
        context.commit("UPDATE_USER", r.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", {
        id: payload.email,
        email: payload.email,
        name: payload.name,
        password: payload.password
      });
      return api.post("/user", context.state.user);
    },
    signOut(context) {
      context.commit("UPDATE_USER", {
        id: "",
        email: "",
        name: "",
        password: ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
