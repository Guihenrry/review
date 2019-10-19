<template>
  <div id="app">
    <TheHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { api } from "@/services.js";

export default {
  name: "app",
  components: {
    TheHeader,
    TheFooter
  },
  created() {
    if (window.localStorage.token) {
      api
        .validateToken()
        .then(() => {
          this.$store.dispatch("getUser");
        })
        .catch(() => {
          window.localStorage.removeItem("token");
        });
    }
  }
};
</script>

<style>
/* RESET */
* {
  box-sizing: border-box;
}

body,
h1,
h2,
h3,
p,
ul {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
}

a {
  text-decoration: none;
  color: #0f1417;
}
/* GERAL */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#main {
  flex: 1;
}

body {
  font-family: "Rubik", sans-serif;
}

.btn {
  border: none;
  padding: 10px 15px;
  background: #124059;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.125rem;
  transition: 0.3s all;
}

.btn:hover {
  background: #0880ba;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  font-family: "Rubik", sans-serif;
  font-size: 1.125rem;
  padding: 15px;
  background: #e7ecee;
  border: 1px solid #e7ecee;
  border-radius: 5px;
  transition: all 0.3s;
  width: 100%;
  margin-bottom: 10px;
}

input:focus {
  border: 1px solid #0f1417;
  outline: none;
}

/* TRANSITION */
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>