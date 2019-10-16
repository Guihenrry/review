<template>
  <article v-if="review">
    <button class="btn-edit" @click="edit">Editar</button>
    <button class="btn-remove" @click="remove">Remover</button>
    <h1>{{review.title}}</h1>
    <p>{{review.text}}</p>
  </article>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "UserReviewItem",
  props: {
    review: Object
  },
  methods: {
    remove() {
      const confirm = window.confirm("Deseja realmente remover está review?");

      if (confirm) {
        api.delete(`/review/${this.review.id}`).then(() => {
          this.$emit("getUserReview");
        });
      }
    },
    edit() {
      this.$emit("showForm");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped>
article {
  background: #eaeaea;
  position: relative;
  border-left: 4px solid #0880ba;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  padding: 30px 60px;
  margin-bottom: 30px;
}

h1 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

p {
  font-size: 1.125rem;
  line-height: 1.5;
  margin-bottom: 10px;
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

.btn-edit {
  margin-bottom: 30px;
  padding: 10px 0 10px 40px;
  background: url("../assets/edit.svg") no-repeat center left;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
}

.btn-edit:hover {
  opacity: 0.5;
}
</style>