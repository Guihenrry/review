<template>
  <ul v-if="produtos">
    <li v-for="produto in produtos" :key="produto.id">
      <img :src="produto.src" :alt="produto.nome" />
      <h2>{{produto.nome}}</h2>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ListaProdutos",
  data() {
    return {
      produtos: null
    };
  },
  methods: {
    getProdutos() {
      fetch("http://localhost:3000/produto")
        .then(r => r.json())
        .then(r => {
          this.produtos = r;
        });
    }
  },
  created() {
    this.getProdutos();
  }
};
</script>

<style>
</style>