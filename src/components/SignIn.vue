<template>
  <div>
    <PageLoading v-if="loading" />
    <form v-show="!loading">
      <ErrorNotification :errors="errors" />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="user.email" />
      <label for="senha">Senha</label>
      <input type="password" id="senha" name="senha" v-model="user.password" />
      <p>
        Não tem uma conta?
        <a @click="$emit('createAccount')">Crie uma!</a>
      </p>
      <p>
        Perdeu a senha?
        <a
          href="https://reviewapi.guilhermehenrry.com.br/wp-login.php?action=lostpassword"
          target="_blank"
        >Clique aqui.</a>
      </p>
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: [],
      loading: false
    };
  },
  methods: {
    async logar() {
      this.loading = true;
      this.errors = [];

      try {
        await this.$store.dispatch("signIn", this.user);
        await this.$store.dispatch("getUser");
      } catch (error) {
        this.errors.push(error.response.data.message);
      }

      this.loading = false;
    }
  }
};
</script>

<style scoped>
.btn {
  display: block;
  margin-left: auto;
  margin-top: 10px;
  background: #0880ba;
}

.btn:hover {
  background: #124059;
}

p {
  font-size: 0.875rem;
  color: #777777;
  margin-bottom: 5px;
}

a {
  color: #0880ba;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>