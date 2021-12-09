<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo">
        <div class="header__logo-icon">
          <font-awesome-icon size="lg" icon="futbol" />
        </div>
        <router-link to="/" class="header__logo-link">SoccerStat</router-link>
      </div>
      <div class="header__nav">
        <Nav />
      </div>
      <div class="header__hamburger">
        <button
          class="header__hamburger-btn"
          @click.prevent="toggleHamburger()"
        >
          <font-awesome-icon size="lg" icon="bars" />
        </button>
      </div>
    </div>
    <HamburgerMenu />
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import HamburgerMenu from "@/components/common/HamburgerMenu.vue";
import Nav from "@/components/common/Nav.vue";
export default {
  components: { HamburgerMenu, Nav },
  computed: {
    ...mapState({
      isHamburgerActive: "isHamburgerActive",
    }),
  },
  methods: {
    ...mapMutations({
      toggleHamburger: "toggleHamburger",
    }),
  },
};
</script>

<style>
.header__logo:hover .fa-futbol {
  -webkit-animation: fa-spin 2s infinite linear;
  -moz-animation: fa-spin 2s infinite linear;
  -o-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}

.header__logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo-icon {
  margin-right: 5px;
}

.header__hamburger-btn {
  color: #ffffff;
}
</style>