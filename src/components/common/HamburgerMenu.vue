<template>
	<div class="hamburger-menu" :class="{ active: isHamburgerActive }">
      <ul class="hamburger-menu__nav">
        <li class="hamburger-menu__nav-item" @click.prevent="toggleHamburger()">
          <router-link to="/" class="hamburger-menu__nav-link"
            >Home</router-link
          >
        </li>
        <li class="hamburger-menu__nav-item" @click.prevent="toggleHamburger()">
          <router-link to="/competitions" class="hamburger-menu__nav-link"
            >Competitions</router-link
          >
        </li>
        <li class="hamburger-menu__nav-item" @click.prevent="toggleHamburger()">
          <router-link to="/teams" class="hamburger-menu__nav-link"
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

<style>
.hamburger-menu__nav {
	margin-bottom: 0;
}
</style>