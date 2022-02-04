<template>
  <div class="filters-block">
    <b-form>
      <b-row class="filter-component__row">
        <b-col>
          <b-form-group label="From" label-for="from">
            <b-form-input type="date" id="from" v-model="filter.dateFrom" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="To" label-for="to">
            <b-form-input type="date" id="to" v-model="filter.dateTo" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="filter-component__row">
        <b-col>
          <b-form-group label="Status" label-for="status">
            <div class="form-group__wrapper">
              <select class="custom-input" id="status" v-model="filter.status">
                <option :value="null" disabled>Select a status</option>
                <option
                  :value="status"
                  v-for="status in statuses"
                  :key="status.id"
                >
                  {{ status }}
                </option>
              </select>
              <b-button
                v-show="filter.status !== null"
                variant="danger"
                @click.prevent="filter.status = null"
                >Remove</b-button
              >
            </div>
          </b-form-group>
        </b-col>
        <b-col v-show="pageType === 'competitions'">
          <b-form-group label="Season" label-for="year">
            <div class="form-group__wrapper">
              <select class="custom-input" id="year" v-model="filter.season">
                <option :value="null" disabled>Select a year</option>
                <option :value="year" v-for="year in years" :key="year.id">
                  {{ year }}
                </option>
              </select>
              <b-button
                v-show="filter.season !== null"
                variant="danger"
                @click.prevent="filter.season = null"
                >Remove</b-button
              >
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  data() {
    return {
      filter: {
        dateFrom: "",
        dateTo: "",
        status: null,
        season: null,
      },
      error: null,
      statuses: [
        "SCHEDULED",
        "LIVE",
        "PAUSED",
        "FINISHED",
        "POSTPONED",
        "SUSPENDED",
        "CANCELED",
      ],
    };
  },
  computed: {
    years() {
      var currentYear = new Date().getFullYear();
      var years = [];
      for (var i = 2020; i <= currentYear; i++) {
        years.push(i.toString());
      }
      return years.reverse();
    },
    pageType() {
      if (this.$route.fullPath.includes("competitions")) {
        return "competitions";
      } else if (this.$route.fullPath.includes("teams")) {
        return "teams";
      }
      return null;
    },
    apiPath() {
      if (this.pageType === "competitions") {
        return `https://api.football-data.org/v2/competitions/${this.$route.params.id}/matches`;
      } else if (this.pageType === "teams") {
        return `https://api.football-data.org/v2/teams/${this.$route.params.id}/matches`;
      }
      return null;
    },
  },
  methods: {
    updateQuery() {
      let query = Object.assign({}, this.$route.query);

      for (let key in this.filter) {
        if (this.filter[key] === "" || this.filter[key] === null) {
          delete query[key];
        } else {
          query[key] = this.filter[key];
        }
      }

      this.$router
        .push({
          query,
        })
        .catch(() => {});
    },
    getInitialFilterFromQuery() {
      if (this.$route.query && Object.keys(this.$route.query).length === 0) {
        this.filter = {
          dateFrom: null,
          dateTo: null,
          status: null,
          season: null,
        };
      } else {
        Object.assign(this.filter, this.$route.query);
      }
    },
    async getMatches(params) {
      try {
        this.$emit("updError", null);
        let response = await this.axios.get(this.apiPath, {
          params,
        });

        if (response.data.matches) {
          this.$emit("updMatches", response.data.matches);
        }

        this.updateQuery();
      } catch (error) {
        if (error.response) {
          this.$emit("updError", error.response.data.message);
        }

        this.$emit("updMatches", []);
      }
    },
    removeEmpty(obj) {
      let copy = Object.assign({}, obj);
      Object.keys(copy).forEach((key) => {
        if (copy[key] === "" || copy[key] === null) {
          delete copy[key];
        }
      });
      return copy;
    },
  },
  async mounted() {
    this.getInitialFilterFromQuery();
  },
  watch: {
    filter: {
      async handler(val) {
        await this.getMatches(this.removeEmpty(val));
      },
      deep: true,
    },
  },
};
</script>
