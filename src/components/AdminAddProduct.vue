<template>
  <form>
    <ErrorNotification :errors="errors" />
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="name" />
    <label for="image">Imagem</label>
    <input type="file" id="image" name="image" ref="image" />
    <button class="btn" @click.prevent="addProduct">Adicionar Produto</button>
  </form>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "AdminAddProduct",
  data() {
    return {
      name: "",
      errors: []
    };
  },
  methods: {
    formatProduct() {
      const form = new FormData();
      const files = this.$refs.image.files;
      if (files.length) {
        form.append(files[0].name, files[0]);
      }
      form.append("name", this.name);

      return form;
    },
    addProduct({ currentTarget }) {
      this.errors = [];
      currentTarget.setAttribute("disabled", "");
      currentTarget.innerText = "Adicionando...";
      const product = this.formatProduct();

      api
        .post("/product", product)
        .then(() => {
          currentTarget.removeAttribute("disabled");
          this.name = "";
          this.$refs.image.value = "";
          currentTarget.innerText = "Adicionar Produto";
          this.$emit("getProducts");
        })
        .catch(error => {
          this.errors.push(error.response.data.message);
          currentTarget.innerText = "Adicionar Produto";
          currentTarget.removeAttribute("disabled");
        });
    }
  }
};
</script>

<style scoped>
.btn {
  background: #0880ba;
  display: block;
  margin-left: auto;
  margin-top: 10px;
}

.btn:hover {
  background: #124059;
}
</style>