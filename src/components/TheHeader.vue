<template>
  <div>
    <header>
      <div class="container">
        <router-link :to="{name: 'home'}">
          <img src="@/assets/review.png" alt="Review" />
        </router-link>
        <div>
          <button class="btn login" @click="showLogin = true">Login</button>
          <button class="btn" @click="showCadastro = true">Cadastra-se</button>
        </div>
      </div>
    </header>
    <SimpleModal titleModal="Login" v-if="showLogin" @close="showLogin = false"></SimpleModal>
    <SimpleModal titleModal="Criar Conta" v-if="showCadastro" @close="showCadastro = false"></SimpleModal>
  </div>
</template>

<script>
import SimpleModal from "@/components/SimpleModal.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      showLogin: false,
      showCadastro: false
    };
  },
  components: {
    SimpleModal
  }
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

.btn.login {
  background: none;
}
.login:hover {
  color: #0880ba;
}
</style>