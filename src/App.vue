<template>
  <div class="wrapper" id="app">
    <div class="maincontent">
      <Header />
      <main class="content">
        <transition>
          <router-view></router-view>
        </transition>
        <ErrorModal />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import "@/assets/css/main.min.css";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import ErrorModal from "@/components/modals/ErrorModal.vue";

export default {
  components: {
    Header,
    Footer,
    ErrorModal,
  },
};
</script>
