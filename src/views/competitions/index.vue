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
        <b-alert show variant="warning" v-if="error"
          >Please try again later.</b-alert
        >
        <ul class="competitions__list" v-if="competitions">
          <li
            class="competitions__item"
            v-for="item in competitions.filter((el) => el.plan === 'TIER_ONE')"
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
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/common/Loader.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
export default {
  components: { Loader, Breadcrumbs },
  data() {
    return {
      competitions: "",
      error: "",
      loading: null,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      let response = await this.axios.get(
        "https://api.football-data.org/v2/competitions/"
      );
      this.competitions = response.data.competitions;
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