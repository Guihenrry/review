<template>
  <div class="container">
    <section class="adicionar">
      <h2>Adicionar Produto</h2>
      <AdminAddProduct @getProducts="getProducts" />
    </section>
    <section class="produtos">
      <AdminListProducts :products="products" @getProducts="getProducts" />
    </section>
  </div>
</template>

<script>
import AdminAddProduct from "@/components/AdminAddProduct.vue";
import AdminListProducts from "@/components/AdminListProducts.vue";
import { api } from "@/services.js";

export default {
  name: "admin",
  components: {
    AdminAddProduct,
    AdminListProducts
  },
  data() {
    return {
      products: null
    };
  },
  methods: {
    getProducts() {
      api.get("/product").then(r => {
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
.container {
  max-width: 950px;
  margin: 0 auto;
  padding: 60px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
}

.produtos {
  grid-column: 2;
  grid-row: 1 / 3;
}

.adicionar {
  position: sticky;
  top: 30px;
}

@media screen and (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }

  .produtos {
    grid-column: auto;
    grid-row: auto;
  }

  .adicionar {
    position: initial;
  }
}

h2 {
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 20px;
}

h2::after {
  content: "";
  display: block;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: #0880ba;
  margin-top: 2px;
}
</style>