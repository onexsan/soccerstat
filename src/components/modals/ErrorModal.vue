<template>
  <b-modal
    id="modal-error"
    class="modal modal-error"
    title="Error"
    header-bg-variant="dark"
    header-text-variant="light"
    v-model="isShown"
  >
    <p class="modal__desc">
      A network error occurred. This could be caused by too many requests, a
      CORS issue or a dropped internet connection. Please try to reload the page
      or go to the main page.
    </p>
    <template #modal-footer>
      <div class="modal__footer">
        <b-row>
          <b-col>
            <b-button class="modal__btn" variant="success" @click="reload()">
              Reload
            </b-button>
          </b-col>
          <b-col>
            <b-button
              class="modal__btn"
              variant="secondary"
              @click="goToMain()"
            >
              To the main page
            </b-button>
          </b-col>
        </b-row>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  computed: {
    showErrorModal() {
      return this.$store.state.showErrorModal;
    },
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    reload() {
      this.$router.go();
    },
    goToMain() {
      this.$store.dispatch("toggleError");
      this.$router.push("/");
    },
  },
  watch: {
    showErrorModal: function (val) {
      this.isShown = val;
    },
  },
};
</script>

<style></style>
