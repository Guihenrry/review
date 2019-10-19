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
      administrator: ""
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
    getUser(context) {
      return api.get("/user").then(r => {
        context.commit("UPDATE_USER", r.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    createUser(context, payload) {
      return api.post("/user", {
        email: payload.email,
        name: payload.name,
        password: payload.password
      });
    },
    signIn(context, payload) {
      return api
        .signIn({
          username: payload.email,
          password: payload.password
        })
        .then(r => {
          window.localStorage.token = `Bearer ${r.data.token}`;
        });
    },
    signOut(context) {
      context.commit("UPDATE_USER", {
        id: "",
        email: "",
        name: "",
        administrator: ""
      });
      context.commit("UPDATE_LOGIN", false);
      window.localStorage.removeItem("token");
    }
  }
});
