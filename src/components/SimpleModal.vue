<template>
  <transition name="modal">
    <section class="modal" @click="clickOff">
      <div class="modal-container">
        <button class="close" @click="$emit('close')">
          <img src="../assets/close.svg" alt="close" />
        </button>
        <h1>{{titleModal}}</h1>
        <slot>
          <p>Simple Modal</p>
        </slot>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: "SimpleModal",
  props: {
    titleModal: String
  },
  methods: {
    clickOff({ target, currentTarget }) {
      if (target === currentTarget) this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.modal-container {
  position: relative;
  background: #fff;
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  transition: all 0.3s ease;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}

.close:hover {
  transform: rotate(180deg);
}

h1 {
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 20px;
}

h1::after {
  content: "";
  display: block;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: #0880ba;
  margin-top: 2px;
}

/* transition */
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: translate3d(0, -20px, 0);
}
</style>