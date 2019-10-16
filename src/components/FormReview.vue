<template>
  <form>
    <label for="title">Em uma frase resuma sua review</label>
    <input type="text" name="title" id="title" v-model="title" />
    <label for="text">Conte-nos o que você achou do produto</label>
    <textarea name="text" id="text" v-model="text"></textarea>

    <button v-if="userReview" class="btn" @click.prevent="updateReview">Atualizar Review</button>
    <button v-else class="btn" @click.prevent="addReview">Enviar Review</button>
  </form>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "FormReview",
  props: ["productId", "userReview"],
  data() {
    return {
      title: "",
      text: ""
    };
  },
  computed: {
    review() {
      return {
        product_id: this.productId,
        user_id: this.$store.state.user.id,
        user_name: this.$store.state.user.name,
        title: this.title,
        text: this.text
      };
    }
  },
  methods: {
    addReview() {
      api.post("/review", this.review).then(() => {
        this.$emit("closeForm");
        this.$emit("getUserReview");
      });
    },
    updateReview() {
      api.put(`/review/${this.userReview.id}`, this.review).then(() => {
        this.$emit("closeForm");
        this.$emit("getUserReview");
      });
    }
  },
  created() {
    if (this.userReview) {
      this.title = this.userReview.title;
      this.text = this.userReview.text;
    }
  }
};
</script>

<style scoped>
textarea {
  max-width: 100%;
  height: 120px;
}

.btn {
  background: #0880ba;
  display: block;
  margin-left: auto;
}

.btn:hover {
  background: #124059;
}
</style>