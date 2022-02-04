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
        <h1 class="title">{{ team.name }}</h1>

        <section class="section">
          <h3>About</h3>
          <b-card class="about-block about-block--team" v-if="team">
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
                <a
                  class="d-inline-block"
                  target="_blank"
                  :href="team.website"
                  >{{ team.website }}</a
                >
              </p>
            </div>
          </b-card>
        </section>

        <section class="section">
          <h3>Matches</h3>
          <FilterComponent @updError="updError" @updMatches="updMatches" />
          <MatchList :matches="matches" :team="team" :error="error" />
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import FilterComponent from "@/components/common/FilterComponent.vue";
import MatchList from "@/components/common/MatchList.vue";
export default {
  name: "TeamPage",
  components: { Loader, MatchList, Breadcrumbs, FilterComponent },
  data() {
    return {
      loading: null,
      matches: [],
      team: "",
      error: null,
    };
  },
  async mounted() {
    await this.getTeamDescription();
  },
  methods: {
    updError(val) {
      this.error = val;
    },
    updMatches(val) {
      this.matches = val;
    },
    async getTeamDescription() {
      this.loading = true;
      try {
        this.error = null;
        let team = await this.axios.get(
          `https://api.football-data.org/v2/teams/${this.$route.params.id}`
        );
        this.team = team.data;
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
