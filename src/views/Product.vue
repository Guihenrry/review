<template>
  <div class="produto">
    <section class="produto-info">
      <img v-if="product.images" :src="product.images[0].src" :alt="product.name" />
      <div>
        <h1>{{product.name}}</h1>
        <transition mode="out-in">
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
        </transition>
      </div>
    </section>

    <transition-group tag="div" name="list">
      <UserReviewItem
        v-if="userReview"
        :key="userReview.id"
        :review="userReview"
        @getUserReview="getUserReview"
        @showForm="showForm = true"
      />
      <ReviewItem v-for="review in reviews" :key="review.id" :review="review" />
    </transition-group>
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
      if (!this.login) {
        this.showForm = false;
      }
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
@media screen and (max-width: 650px) {
  .produto-info {
    grid-template-columns: 1fr;
  }
}

.produto-info h1 {
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 10px;
}

.btn {
  background: #0880ba;
}

.btn:hover {
  background: #124059;
}

/* TRANSITION GROUP */
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
</style>