<template>
  <div>
    <SearchProducts />
    <ListProducts />
  </div>
</template>

<script>
import SearchProducts from "@/components/SearchProducts.vue";
import ListProducts from "@/components/ListProducts.vue";

export default {
  name: "Home",
  components: {
    SearchProducts,
    ListProducts
  },
  created() {
    document.title = "Review";
  }
};
</script>

<style>
</style>