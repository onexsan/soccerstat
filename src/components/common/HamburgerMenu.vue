<template>
  <div class="hamburger-menu" :class="{ active: isHamburgerActive }">
    <ul class="hamburger-menu__list">
      <li class="hamburger-menu__item" @click.prevent="toggleHamburger()">
        <router-link to="/" class="hamburger-menu__link">Home</router-link>
      </li>
      <li class="hamburger-menu__item" @click.prevent="toggleHamburger()">
        <router-link to="/competitions" class="hamburger-menu__link"
          >Competitions</router-link
        >
      </li>
      <li class="hamburger-menu__item" @click.prevent="toggleHamburger()">
        <router-link to="/teams" class="hamburger-menu__link"
          >Teams</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
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
