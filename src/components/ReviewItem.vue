<template>
  <article>
    <h1>{{review.title}}</h1>
    <p>{{review.text}}</p>
    <span>Enviado por {{review.user_name}}</span>
  </article>
</template>

<script>
export default {
  name: "ReviewItem",
  props: {
    review: Object
  }
};
</script>

<style scoped>
article {
  background: #fafafa;
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

span {
  color: #777777;
  font-size: 0.875rem;
}
</style>