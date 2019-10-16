<template>
  <div class="produto">
    <section class="produto-info">
      <img :src="product.src" :alt="product.name" />
      <div>
        <h1>{{product.name}}</h1>
        <p v-if="!login">Entre ou cadastre-se para adicionar sua review</p>
        <p v-else-if="userReview && !showForm">Você ja adicionou sua review neste produto</p>
        <button class="btn" v-else-if="!showForm" @click="showForm = true">Adicionar Review</button>
        <FormReview
          v-else
          :productId="product.id"
          @getUserReview="getUserReview"
          @closeForm="showForm = false"
          :userReview="userReview"
        />
      </div>
    </section>
    <div>
      <UserReviewItem
        v-if="userReview"
        :review="userReview"
        @getUserReview="getUserReview"
        @showForm="showForm = true"
      />
      <ReviewItem v-for="review in reviews" :key="review.id" :review="review" />
    </div>
  </div>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";
import FormReview from "@/components/FormReview.vue";
import ReviewItem from "@/components/ReviewItem.vue";
import UserReviewItem from "@/components/UserReviewItem.vue";

export default {
  name: "product",
  props: ["id"],
  components: {
    FormReview,
    ReviewItem,
    UserReviewItem
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
      showForm: false
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
</style>