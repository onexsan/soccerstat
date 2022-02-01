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
          <ul
            class="block__list"
            v-if="filteredCompetitions && filteredCompetitions.length > 0"
          >
            <li
              class="block__item"
              v-for="item in filteredCompetitions"
              :key="item.id"
            >
              <b-card class="card">
                <router-link
                  class="card__link card__link--vertical"
                  :to="`/competitions/${item.id}`"
                >
                  <p class="card__title">
                    {{ item.name }}
                  </p>
                  <p class="card__dates">
                    {{
                      item.currentSeason.startDate
                        .split("-")
                        .reverse()
                        .join(".")
                    }}
                    -
                    {{
                      item.currentSeason.endDate.split("-").reverse().join(".")
                    }}
                  </p>
                </router-link>
              </b-card>
            </li>
          </ul>
          <b-alert show variant="warning" v-else>Not found.</b-alert>
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import SearchComponent from "@/components/common/SearchComponent.vue";
export default {
  name: "Competitions",
  components: { Loader, Breadcrumbs, SearchComponent },
  data() {
    return {
      competitions: [],
      filteredCompetitions: [],
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
        "https://api.football-data.org/v2/competitions/",
        {
          params: {
            plan: "TIER_ONE",
          },
        }
      );
      this.competitions = response.data.competitions;
      if (
        this.$route.query &&
        Object.getPrototypeOf(JSON.parse(JSON.stringify(this.$route.query))) ===
          Object.prototype &&
        Object.keys(JSON.parse(JSON.stringify(this.$route.query))).length === 0
      ) {
        this.filteredCompetitions = response.data.competitions;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
