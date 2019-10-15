<template>
  <form>
    <label for="title">Em uma frase resuma sua review</label>
    <input type="text" name="title" id="title" />
    <label for="text">Conte-nos o que você achou do produto</label>
    <textarea name="text" id="text"></textarea>
    <button class="btn" @click.prevent>Enviar Review</button>
  </form>
</template>

<script>
export default {
  name: "AddReview"
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