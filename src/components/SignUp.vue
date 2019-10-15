<template>
  <form>
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome" v-model="user.name" />
    <label for="email">Email</label>
    <input type="email" id="email" name="email" v-model="user.email" />
    <label for="senha">Senha</label>
    <input
      :type="showPassword ? 'text' : 'password'"
      id="senha"
      name="senha"
      v-model="user.password"
    />
    <input type="checkbox" id="show-password" v-model="showPassword" />
    <label for="show-password">Exibir Senha</label>
    <button class="btn" @click.prevent="createUser">Criar Conta</button>
  </form>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      showPassword: false,
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch("createUser", this.user).then(() => {
        this.$store.dispatch("getUser", this.user.email);
      });
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

#show-password {
  display: none;
}

#show-password + label {
  color: #777777;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}
#show-password + label::before {
  content: "";
  display: inline-block;
  background: #e7ecee;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 5px;
  color: #000;
  text-align: center;
}

#show-password:checked + label::before {
  content: "✔";
}
</style>