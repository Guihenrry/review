<template>
  <div class="produto">
    <section class="produto-info">
      <img :src="product.src" :alt="product.name" />
      <div>
        <h1>{{product.name}}</h1>
        <p v-if="!login">Entre ou cadastre-se para adicionar sua review</p>
        <button class="btn" v-else-if="!addReview" @click="addReview = true">Adicionar Review</button>
        <AddReview v-else />
      </div>
    </section>
    <div>
      <article class="review user-review" v-if="userReview">
        <button class="btn-edit">Editar</button>
        <button class="btn-remove">Remover</button>
        <h1>{{userReview.title}}</h1>
        <p>{{userReview.text}}</p>
      </article>

      <article class="review" v-for="review in reviews" :key="review.id">
        <h1>{{review.title}}</h1>
        <p>{{review.text}}</p>
        <span>Enviado por {{review.user_name}}</span>
      </article>
    </div>
  </div>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";
import AddReview from "@/components/AddReview.vue";

export default {
  name: "product",
  props: ["id"],
  components: {
    AddReview
  },
  data() {
    return {
      product: {
        id: "",
        name: "",
        src: ""
      },
      reviews: null,
      userReview: null,
      addReview: false
    };
  },
  methods: {
    getProduct() {
      api.get(`/product/${this.id}`).then(r => {
        this.product = r.data;
      });
    },
    getReviews() {
      api.get(`/review?product_id=${this.id}`).then(r => {
        this.reviews = r.data.filter(review => review.user_id !== this.user.id);
      });
    },
    getUserReview() {
      api
        .get(`/review?product_id=${this.id}&user_id=${this.user.id}`)
        .then(r => {
          this.userReview = r.data[0];
        });
    }
  },
  watch: {
    login() {
      this.getReviews();
      this.getUserReview();
    }
  },
  computed: {
    ...mapState(["user", "login"])
  },
  created() {
    this.getProduct();
    this.getReviews();
    this.getUserReview();
  }
};
</script>

<style scoped>
.produto {
  max-width: 950px;
  margin: 0 auto;
  padding: 60px 10px;
}

.produto-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 60px;
}

.produto-info h1 {
  font-size: 4.5rem;
  font-weight: 400;
  margin-bottom: 30px;
}

.btn {
  background: #0880ba;
}

.btn:hover {
  background: #124059;
}

/* REVIEW */
.review {
  background: #fafafa;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  padding: 30px 60px;
  margin-bottom: 30px;
}

.review h1 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.review p {
  font-size: 1.125rem;
  line-height: 1.5;
  margin-bottom: 10px;
}

.review span {
  color: #777777;
  font-size: 0.875rem;
}

/* USER REVIEW */
.user-review {
  position: relative;
  background: #eaeaea;
  border-left: 4px solid #0880ba;
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