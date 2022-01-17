<template>
  <section class="section team-page">
    <div class="container">
      <Breadcrumbs
        :firstLink="'Home'"
        :firstLinkRoute="'/'"
        :secondLink="'Teams'"
        :secondLinkRoute="'/teams'"
        :thirdLink="team.name ? team.name : 'Team page'"
        :thirdLinkRoute="`/teams/${$route.params.id}`"
      />
      <Loader v-if="loading === true" />
      <template v-else>
        <h1>{{ team.name }}</h1>
        <h3>About</h3>
        <b-card class="mb-3 about-block" v-if="team">
          <img
            class="about-block__img"
            :src="team.crestUrl"
            width="100"
            height="auto"
          />
          <div class="about-block__content">
            <p class="about-block__row">
              <span class="about-block__title">Place:</span>
              {{ team.area.name }}
            </p>
            <p class="about-block__row">
              <span class="about-block__title">Website: </span>
              <a class="d-inline-block" target="_blank" :href="team.website">{{
                team.website
              }}</a>
            </p>
          </div>
        </b-card>
        <h3>Matches</h3>
        <FilterComponent
          @changeFilter="changeFilter"
          :datesFromQuery="filter"
        />
        <ul class="match__list" v-if="matches && matches.length > 0">
          <MatchItem
            v-for="item in matches"
            :key="item.id"
            :item="item"
            :team="team"
          />
        </ul>
        <p v-else>Not found.</p>
        <b-alert variant="danger" v-if="errorMessage === true">
          Please try again later.
        </b-alert>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import FilterComponent from "@/components/common/FilterComponent.vue";
import MatchItem from "@/components/common/MatchItem.vue";
export default {
  components: { Loader, MatchItem, Breadcrumbs, FilterComponent },
  data() {
    return {
      loading: null,
      matches: [],
      team: "",
      filter: {
        from: "",
        to: "",
      },
      errorMessage: "",
    };
  },
  async mounted() {
    await this.getMatches();
  },
  computed: {
    fromAndTo() {
      return `${this.filter.from}|${this.filter.to}`;
    },
  },
  methods: {
    changeFilter(val) {
      this.filter = val;
    },
    updateQuery() {
      try {
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        queries.dateFrom = this.filter.from;
        queries.dateTo = this.filter.to;
        this.$router
          .push({
            path: `/${this.$route.fullPath.replace(/^\/|\/$/g, "")}/`,
            query: queries,
          })
          .catch(() => {});
      } catch (err) {
        console.log(err);
      }
    },
    async getMatches() {
      this.loading = true;
      let params = null;
      if (
        this.$route.query &&
        Object.getPrototypeOf(JSON.parse(JSON.stringify(this.$route.query))) ===
          Object.prototype &&
        Object.keys(JSON.parse(JSON.stringify(this.$route.query))).length > 0
      ) {
        params = JSON.parse(JSON.stringify(this.$route.query));
      }
      let { dateFrom, dateTo } = JSON.parse(JSON.stringify(this.$route.query));
      switch (params) {
        case null:
          try {
            let team = await this.axios.get(
              `https://api.football-data.org/v2/teams/${this.$route.params.id}`
            );
            let response = await this.axios.get(
              `https://api.football-data.org/v2/teams/${this.$route.params.id}/matches`
            );
            this.team = team.data;
            this.matches = response.data.matches;
          } catch (error) {
            console.log(error);
            this.errorMessage = true;
          }
          break;

        default:
          try {
            let team = await this.axios.get(
              `https://api.football-data.org/v2/teams/${this.$route.params.id}`
            );
            this.team = team.data;
          } catch (err) {
            console.log(err);
            this.errorMessage = true;
          }
          this.filter.from = dateFrom === undefined ? "" : dateFrom;
          this.filter.to = dateTo === undefined ? "" : dateTo;
          break;
      }

      this.loading = false;
    },
  },
  watch: {
    fromAndTo: async function (val) {
      let [from, to] = val.split("|");
      if (from !== "" && to !== "") {
        try {
          let params = {
            dateFrom: from,
            dateTo: to,
          };
          let response = await this.axios.get(
            `https://api.football-data.org/v2/teams/${this.$route.params.id}/matches`,
            {
              params: params,
            }
          );

          this.matches = response.data.matches;
          this.updateQuery();
        } catch (err) {
          console.log(err);
          this.errorMessage = true;
        }
      }
    },
  },
};
</script>

<style>
</style>