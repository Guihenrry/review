<template>
  <div id="app">
    <TheHeader />
    <main id="main"></main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "app",
  components: {
    TheHeader,
    TheFooter
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
</style>