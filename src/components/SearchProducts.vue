<template>
  <form>
    <input type="text" id="busca" placeholder="Buscar" v-model="search" />
    <input type="submit" id="lupa" value="Buscar" @click.prevent="searchProducts" />
  </form>
</template>

<script>
export default {
  name: "SearchProducts",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    searchProducts() {
      if (this.$route.query.q !== this.search) {
        this.$router.push({ query: { q: this.search } });
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 60px auto;
  padding: 0 10px;
  max-width: 400px;
  display: grid;
}

#busca {
  width: 100%;
  grid-area: 1/1;
  padding-right: 40px;
}

#lupa {
  grid-area: 1/1;
  cursor: pointer;
  width: 50px;
  justify-self: end;
  text-indent: -150px;
  background: transparent url("../assets/search.svg") no-repeat center center;
  border: none;
}
</style>