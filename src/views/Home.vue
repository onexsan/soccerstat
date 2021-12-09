<template>
  <section class="section home">
    <div class="container home__container">
      <ul class="home__routes">
        <router-link to="/teams" class="home__route">Teams</router-link>
        <router-link to="/competitions" class="home__route"
          >Competitions</router-link
        >
      </ul>
    </div>
  </section>
</template>

<style scoped>
.home__route {
  color: #ffffff;
  text-decoration: none;
}

@media screen and (max-width: 480px) {
  .home__route {
    font-size: 35px;
  }
}
</style>