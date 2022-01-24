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
        <section class="section">
          <h1 class="title">Competitions</h1>
          <p class="note">
            * The number of competitions is limited due to the free plan
            subscription.
          </p>
          <SearchComponent :items="competitions" @showFiltered="showFiltered" />
          <CompetitionsList :blocks="filteredCompetitions" />
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import SearchComponent from "@/components/common/SearchComponent.vue";
import CompetitionsList from "@/components/common/CompetitionsList.vue";
export default {
  components: { Loader, Breadcrumbs, SearchComponent, CompetitionsList },
  data() {
    return {
      competitions: "",
      filteredCompetitions: "",
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
    } finally {
      this.loading = false;
    }
  },
};
</script>
