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
              <p class="about-block__row">
                <span class="about-block__title">Code</span>:
                {{ competition.code }}
              </p>
            </b-card-text>
          </b-card>
        </section>

        <template v-if="teams && teams.length > 0">
          <section class="section">
            <h3>Teams</h3>
            <TeamsSlider :teams="teams" :competitionPage="true" />
          </section>
        </template>

        <section class="section">
          <h3>Matches</h3>
          <FilterComponent @updError="updError" @updMatches="updMatches" />
          <MatchList :matches="matches" :error="error" />
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import MatchList from "@/components/common/MatchList.vue";
import FilterComponent from "@/components/common/FilterComponent.vue";
import TeamsSlider from "@/components/common/TeamsSlider.vue";
export default {
  name: "CompetitionPage",
  components: { Loader, MatchList, Breadcrumbs, FilterComponent, TeamsSlider },
  data() {
    return {
      competition: "",
      matches: [],
      teams: [],
      loading: null,
      error: null,
    };
  },
  async mounted() {
    await this.getTeams();
  },
  methods: {
    updError(val) {
      this.error = val;
    },
    updMatches(val) {
      this.matches = val;
    },
    async getTeams() {
      this.loading = true;
      try {
        let response = await this.axios.get(
          `https://api.football-data.org/v2/competitions/${this.$route.params.id}/teams`
        );
        this.teams = response.data.teams;
        this.competition = response.data.competition;
      } catch (error) {
        console.log(error);
        if (error.response) {
          this.error = error.response.data.message;
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
