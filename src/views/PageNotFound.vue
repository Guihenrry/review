<template>
  <div>
    <p>Pagina não encontrada 🙁</p>
    <router-link :to="{name: 'home'}">Voltar para home</router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style scoped>
div {
  margin-top: 60px;
  text-align: center;
  font-size: 1.125rem;
}

p {
  margin: 10px;
}

a {
  text-decoration: underline;
}
</style>