<template>
  <ul v-if="produtos" class="produtos">
    <li v-for="produto in produtos" :key="produto.id">
      <img :src="produto.src" :alt="produto.nome" />
      <h2>{{produto.nome}}</h2>
    </li>
  </ul>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "ListaProdutos",
  data() {
    return {
      produtos: null
    };
  },
  methods: {
    getProdutos() {
      api.get("/produto").then(r => {
        this.produtos = r.data;
      });
    }
  },
  created() {
    this.getProdutos();
  }
};
</script>

<style scoped>
.produtos {
  margin: 60px auto;
  padding: 0 10px;
  max-width: 950px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}

li {
  background: #fafafa;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  padding: 10px 10px 30px 10px;
  transition: all 0.3s;
}

li:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 8px 10px rgba(0, 0, 0, 0.14);
}

h2 {
  text-align: center;
  margin: 20px;
  font-size: 1.125rem;
  font-weight: 400;
}
</style>