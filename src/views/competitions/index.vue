<template>
  <section class="section competitions">
    <div class="container">
      <Breadcrumbs
        :firstLink="'Home'"
        :firstLinkRoute="'/'"
        :secondLink="'Competitions'"
        :secondLinkRoute="'/competitions'"
      />
      <Loader v-if="loading === true" />
      <template v-else>
        <h1>Competitions</h1>
        <SearchComponent :items="competitions" @showFiltered="showFiltered" />
        <b-alert show variant="warning" v-if="error"
          >Please try again later.</b-alert
        >
        <ul
          class="competitions__list"
          v-if="filteredCompetitions && filteredCompetitions.length > 0"
        >
          <li
            class="competitions__item"
            v-for="item in filteredCompetitions"
            :key="item.id"
          >
            <b-card>
              <b-card-text>
                <router-link :to="`/competitions/${item.id}`">{{
                  item.name
                }}</router-link>
                <p>
                  {{
                    item.currentSeason.startDate.split("-").reverse().join(".")
                  }}
                  -
                  {{
                    item.currentSeason.endDate.split("-").reverse().join(".")
                  }}
                </p>
              </b-card-text>
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
  components: { Loader, Breadcrumbs, SearchComponent },
  data() {
    return {
      competitions: "",
      filteredCompetitions: "",
      error: "",
      loading: null,
    };
  },
  methods: {
    showFiltered(payload) {
      this.filteredCompetitions = payload;
    },
  },
  async mounted() {
    this.loading = true;
    try {
      let response = await this.axios.get(
        "https://api.football-data.org/v2/competitions/"
      );
      this.competitions = response.data.competitions.filter(
        (el) => el.plan === "TIER_ONE"
      );
      if (
        this.$route.query &&
        Object.getPrototypeOf(JSON.parse(JSON.stringify(this.$route.query))) ===
          Object.prototype &&
        Object.keys(JSON.parse(JSON.stringify(this.$route.query))).length === 0
      ) {
        this.filteredCompetitions = response.data.competitions.filter(
          (el) => el.plan === "TIER_ONE"
        );
      }
    } catch (error) {
      console.log(error);
      this.error = error;
    }
    this.loading = false;
  },
};
</script>

<style>
.competitions__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  row-gap: 15px;
}

@media screen and (max-width: 420px) {
  .competitions__list {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>