<template>
  <section class="section teams">
    <div class="container">
      <Breadcrumbs
        :firstLink="'Home'"
        :firstLinkRoute="'/'"
        :secondLink="'Teams'"
        :secondLinkRoute="'/teams'"
      />
      <Loader v-if="loading === true" />
      <template v-else>
        <h1>Teams</h1>
        <SearchComponent :items="teams" @showFiltered="showFiltered" />
        <ul
          class="cards__list"
          v-if="filteredTeams && filteredTeams.length > 0"
        >
          <li class="cards__item" v-for="item in filteredTeams" :key="item.id">
            <b-card class="card">
              <router-link
                class="card__link"
                :to="`/teams/${item.id}`"
              >
                <img
                  :src="item.crestUrl"
                  width="20"
                  height="15"
                  class="card__img"
                />
                <p class="card__title">{{ item.name }}</p>
              </router-link>
            </b-card>
          </li>
        </ul>
        <p v-else>Not found.</p>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import SearchComponent from "@/components/common/SearchComponent.vue";
export default {
  name: "Teams",
  components: { Loader, Breadcrumbs, SearchComponent },
  data() {
    return {
      teams: "",
      filteredTeams: "",
      loading: null,
    };
  },
  methods: {
    showFiltered(payload) {
      this.filteredTeams = payload;
    },
  },
  async mounted() {
    this.loading = true;
    try {
      let response = await this.axios.get(
        "https://api.football-data.org/v2/teams"
      );
      this.teams = response.data.teams;
      if (
        this.$route.query &&
        Object.getPrototypeOf(JSON.parse(JSON.stringify(this.$route.query))) ===
          Object.prototype &&
        Object.keys(JSON.parse(JSON.stringify(this.$route.query))).length === 0
      ) {
        this.filteredTeams = response.data.teams;
      }
      this.filteredTeams = response.data.teams;
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  },
};
</script>

<style>
</style>
