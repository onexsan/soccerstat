<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo">
        <div class="header__icon">
          <img src="@/assets/images/icons/soccerball.svg" alt="Header icon" />
        </div>
        <router-link to="/" class="header__link">SoccerStat</router-link>
      </div>
      <div class="header__nav">
        <Nav />
      </div>
      <div class="header__hamburger header-hamburger">
        <button
          class="header-hamburger__btn"
          @click.prevent="toggleHamburger()"
        >
          <img src="@/assets/images/icons/bars.svg" alt="Menu icon" />
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
