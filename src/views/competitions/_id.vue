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
        <h1 class="title mb-3" v-if="competition">{{ competition.name }}</h1>
        <h3>About</h3>
        <b-card class="mb-3" v-if="competition">
          <b-card-text>
            <p class="about-competition">
              <span>Competition</span>: {{ competition.name }}
            </p>
            <p class="about-competition">
              <span>Place</span>: {{ competition.area.name }}
            </p>
          </b-card-text>
        </b-card>
        <FilterComponent @changeFilter="changeFilter" />
        <h3>Matches</h3>
        <ul class="match__list" v-if="matches && matches.length > 0">
          <MatchItem v-for="item in matches" :key="item.id" :item="item" />
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
import MatchItem from "@/components/common/MatchItem.vue";
import FilterComponent from "@/components/common/FilterComponent.vue";
export default {
  components: { Loader, MatchItem, Breadcrumbs, FilterComponent },
  data() {
    return {
      competition: "",
      matches: [],
      loading: null,
      filter: {
        from: "",
        to: "",
      },
      errorMessage: ''
    };
  },
  async mounted() {
    this.loading = true;
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
    this.loading = false;
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
        this.$router.replace({ query: queries });
      } catch (err) {
        console.log(err);
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
          `https://api.football-data.org/v2/teams/${this.$route.params.id}/matches`,
          {
            params: params,
          }
        );
        this.matches = response.data.matches;
        this.updateQuery();
        } catch(err) {
          console.log(err)
          this.errorMessage = true;
        }
        
      }
    },
  },
};
</script>

<style>
.about-competition span {
  font-weight: bold;
}

.matches__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
</style>