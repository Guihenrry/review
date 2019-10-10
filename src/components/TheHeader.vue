<template>
  <header>
    <div class="container">
      <a href="/">
        <img src="@/assets/review.png" alt="Review" />
      </a>
      <button class="btn">Login</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped>
header {
  background: #02273b;
  padding: 20px 0;
}

.container {
  max-width: 950px;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>