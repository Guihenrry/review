<template>
  <div>
    <header>
      <div class="container">
        <router-link class="logo" :to="{name: 'home'}">
          <img src="@/assets/review.png" alt="Review" />
        </router-link>
        <div v-if="login">
          <span class="user-name">{{name}}</span>
          <router-link v-if="user.administrator" class="btn" :to="{name: 'admin'}">Admin</router-link>
          <button class="btn" @click="$store.dispatch('signOut')">Sair</button>
        </div>
        <div v-else>
          <button class="btn login" @click="showSignIn = true">Login</button>
          <button class="btn" @click="showSignUp = true">Cadastra-se</button>
        </div>
      </div>
    </header>
    <div v-if="! $store.state.login">
      <SimpleModal v-if="showSignIn" titleModal="Login" @close="showSignIn = false">
        <SignIn @createAccount="openSignUp" />
      </SimpleModal>
      <SimpleModal v-if="showSignUp" titleModal="Criar Conta" @close="showSignUp = false">
        <SignUp />
      </SimpleModal>
    </div>
  </div>
</template>

<script>
import SimpleModal from "@/components/SimpleModal.vue";
import { mapState } from "vuex";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      showSignIn: false,
      showSignUp: false
    };
  },
  components: {
    SimpleModal,
    SignIn,
    SignUp
  },
  methods: {
    openSignUp() {
      this.showSignIn = false;
      this.showSignUp = true;
    }
  },
  computed: {
    ...mapState(["login", "user"]),
    name() {
      let name = this.$store.state.user.name.split(" ")[0];
      if (name.length >= 9) {
        name = name.substr(0, 9) + "...";
      }

      return name;
    }
  },
  watch: {
    login() {
      if (this.login) {
        this.showSignIn = false;
        this.showSignUp = false;
      }
    }
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

@media screen and (max-width: 450px) {
  .container {
    flex-direction: column;
  }

  .logo {
    margin: 20px;
  }
}

.btn.login {
  background: none;
}
.login:hover {
  color: #0880ba;
}

.btn {
  margin-left: 15px;
}

.user-name {
  color: #fff;
  font-size: 1.125rem;
}
</style>