<template>
  <div>
    <ul v-if="products">
      <li v-for="product in products" :key="product.id">
        <button class="btn-remove" @click="remove(product.id, $event)">Remover</button>
        <router-link :to="{name: 'product', params: {id: product.id}}">
          <img :src="product.images[0].src" :alt="product.name" />
        </router-link>
        <h2>{{product.name}}</h2>
      </li>
    </ul>
    <PageLoading v-else />
  </div>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "AdminListProducts",
  props: {
    products: Array
  },
  methods: {
    remove(id, event) {
      const confirm = window.confirm("Deseja realmente remover está review?");

      if (confirm) {
        event.currentTarget.setAttribute("disabled", "");

        api.delete(`/product/${id}`).then(() => {
          this.$emit("getProducts");
        });
      }
    }
  }
};
</script>

<style scoped>
li {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: #fafafa;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  margin-bottom: 20px;
  padding: 10px;
}

h2 {
  text-align: center;
  padding: 10px 10px 20px 10px;
  font-size: 1.125rem;
  font-weight: 400;
}

.btn-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  text-indent: -150px;
  overflow: hidden;
  background: url("../assets/remove.svg") no-repeat center center;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remove:hover {
  opacity: 0.5;
}
</style>