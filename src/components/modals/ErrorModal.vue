<template>
  <b-modal
    id="modal-error"
    title="Error"
    header-bg-variant="danger"
    header-text-variant="light"
    v-model="showErrorModal"
  >
    <p class="my-4">
      A network error occurred. This could be a CORS issue or a dropped internet
      connection. Please try to reload the page or go to the main page.
    </p>
    <template #modal-footer>
      <div class="w-100">
        <b-row>
          <b-col class="d-flex justify-content-center">
            <b-button class="w-100" variant="dark" @click="reload()">
              Reload
            </b-button>
          </b-col>
          <b-col class="d-flex justify-content-center">
            <b-button class="w-100" variant="secondary" @click="goToMain()">
              To the main page
            </b-button>
          </b-col>
        </b-row>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["showErrorModal"]),
  methods: {
    reload() {
      this.$router.go();
    },
    goToMain() {
      this.$store.dispatch("toggleError");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>