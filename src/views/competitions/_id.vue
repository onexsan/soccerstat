<template>
  <section class="section competition-page">
    <div class="container">
      <Breadcrumbs
        :firstLink="'Home'"
        :firstLinkRoute="'/'"
        :secondLink="'Competitions'"
        :secondLinkRoute="'/competitions'"
        :thirdLink="competition.name ? competition.name : 'Competition page'"
        :thirdLinkRoute="`/competitions/${$route.params.id}`"
      />
      <Loader v-if="loading === true" />
      <template v-else>
        <h1 class="title" v-if="competition">{{ competition.name }}</h1>

        <section class="section">
          <h3>About</h3>
          <b-card class="about-block" v-if="competition">
            <b-card-text>
              <p class="about-block__row">
                <span class="about-block__title">Place</span>:
                {{ competition.area.name }}
              </p>
            </b-card-text>
          </b-card>
        </section>

        <template v-if="teams && teams.length > 0">
          <section class="section">
            <h3>Teams</h3>
            <TeamsList :teams="teams" :competitionPage="true" />
          </section>
        </template>

        <section class="section">
          <h3>Matches</h3>
          <FilterComponent
            @changeFilter="changeFilter"
            :datesFromQuery="filter"
          />
          <MatchList :matches="matches" />
        </section>

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
import MatchList from "@/components/common/MatchList.vue";
import FilterComponent from "@/components/common/FilterComponent.vue";
import TeamsList from "@/components/common/TeamsList.vue";
export default {
  components: { Loader, MatchList, Breadcrumbs, FilterComponent, TeamsList },
  data() {
    return {
      competition: "",
      matches: [],
      teams: [],
      loading: null,
      filter: {
        from: "",
        to: "",
      },
      errorMessage: "",
    };
  },
  async mounted() {
    await this.getMatches();
    await this.getTeams();
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
            let response = await this.axios.get(
              `https://api.football-data.org/v2/competitions/${this.$route.params.id}/matches`
            );
            this.matches = response.data.matches;
            this.competition = response.data.competition;
          } catch (error) {
            console.log(error);
            this.errorMessage = true;
          }
          break;
        default:
          try {
            let response = await this.axios.get(
              `https://api.football-data.org/v2/competitions/${this.$route.params.id}/matches`
            );
            this.matches = response.data.matches;
            this.competition = response.data.competition;
          } catch (error) {
            console.log(error);
            this.errorMessage = true;
          }
          this.filter.from = dateFrom === undefined ? "" : dateFrom;
          this.filter.to = dateTo === undefined ? "" : dateTo;
          break;
      }

      this.loading = false;
    },
    async getTeams() {
      this.loading = true;
      try {
        let response = await this.axios.get(
          `https://api.football-data.org/v2/competitions/${this.$route.params.id}/teams`
        );
        this.teams = response.data.teams;
      } catch (error) {
        console.log(error);
        this.errorMessage = true;
      } finally {
        this.loading = false;
      }
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
            `https://api.football-data.org/v2/competitions/${this.$route.params.id}/matches`,
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

<style></style>
