<template>
  <form>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" v-model="user.email" />
    <label for="senha">Senha</label>
    <input type="password" id="senha" name="senha" v-model="user.password" />
    <p class>
      Não tem uma conta?
      <a @click="$emit('createAccount')">Crie uma!</a>
    </p>
    <button class="btn" @click.prevent="logar">Logar</button>
  </form>
</template>

<script>
import SimpleModal from "@/components/SimpleModal.vue";

export default {
  name: "SignIn",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("getUser", this.user.email);
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
}

a {
  color: #0880ba;
  cursor: pointer;
}
</style>