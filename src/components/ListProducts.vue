<template>
  <ul v-if="products" class="produtos">
    <li v-for="product in products" :key="product.id">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        <img :src="product.src" :alt="product.name" />
        <h2>{{product.name}}</h2>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "ListProducts",
  data() {
    return {
      products: null
    };
  },
  computed: {
    url() {
      const query = this.$route.query;
      let queryString = "";

      for (let key in query) {
        queryString += `&${key}=${query[key]}`;
      }

      return "/product?" + queryString;
    }
  },
  watch: {
    url() {
      this.getProducts();
    }
  },
  methods: {
    getProducts() {
      api.get(this.url).then(r => {
        this.products = r.data;
      });
    }
  },
  created() {
    this.getProducts();
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

@media screen and (max-width: 650px) {
  .produtos {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 350px) {
  .produtos {
    grid-template-columns: 1fr;
  }
}

img {
  padding: 10px;
}

li {
  background: #fafafa;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  transition: all 0.3s;
}

li:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 8px 10px rgba(0, 0, 0, 0.14);
}

h2 {
  text-align: center;
  padding: 10px 10px 20px 10px;
  font-size: 1.125rem;
  font-weight: 400;
}
</style>