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
        <ul class="country__items" v-if="filteredTeams">
          <li
            class="country__item"
            v-for="item in filteredTeams"
            :key="item.id"
          >
            <b-card>
              <router-link :to="`/teams/${item.id}`">
                <b-card-text class="country__item-wrapper">
                  <img
                    :src="item.crestUrl"
                    width="20"
                    height="15"
                    class="country-img"
                  />
                  <p class="country-name">{{ item.name }}</p>
                </b-card-text>
              </router-link>
            </b-card>
          </li>
        </ul>
        <b-alert variant="secondary" v-else>
          Not found.
        </b-alert>
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
      this.filteredTeams = response.data.teams;
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  },
};
</script>

<style>
.country__items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.country-name {
  margin-bottom: 0;
}
.country-img {
  margin-right: 5px;
}
.country__item-wrapper {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 480px) {
  .country__items {
    grid-template-columns: repeat(2, 1fr);
  }
  .country-name {
    font-size: 12px;
  }
}
</style>
