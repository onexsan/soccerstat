<template>
  <div class="filters-block">
    <b-form>
      <b-row class="filter-component__row">
        <b-col>
          <b-form-group label="From" label-for="from">
            <b-form-input type="date" id="from" v-model="filter.from" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="To" label-for="to">
            <b-form-input type="date" id="to" v-model="filter.to" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="filter-component__row">
        <b-col>
          <b-form-group label="Status" label-for="status">
            <div class="form-group__wrapper">
              <select class="custom-input" id="status" v-model="filter.status">
                <option :value="''" disabled>Select a status</option>
                <option
                  :value="status"
                  v-for="status in statuses"
                  :key="status.id"
                >
                  {{ status }}
                </option>
              </select>
              <b-button
                v-if="filter.status !== ''"
                variant="danger"
                @click.prevent="filter.status = ''"
                >Remove</b-button
              >
            </div>
          </b-form-group>
        </b-col>
        <!-- <b-col v-if="isCompetitionsPage">
          <b-form-group label="Season" label-for="year">
            <select class="custom-input" id="year" v-model="year">
              <option :value="null" disabled>Select a year</option>
              <option :value="year" v-for="year in years" :key="year.id">
                {{ year }}
              </option>
            </select>
          </b-form-group>
        </b-col> -->
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["datesFromQuery"],
  data() {
    return {
      filter: {
        from: "",
        to: "",
        status: "",
      },
      year: null,
      statuses: [
        "Scheduled",
        "Live",
        "Paused",
        "Finished",
        "Postponed",
        "Suspended",
        "Canceled",
      ],
    };
  },
  computed: {
    filters() {
      return `${this.filter.from}|${this.filter.to}|${this.filter.status}`;
    },
    years() {
      var currentYear = new Date().getFullYear();
      var years = [];
      for (var i = 1980; i <= currentYear; i++) {
        years.push(i);
      }
      return years.reverse();
    },
    isCompetitionsPage() {
      if (this.$route.fullPath.includes("competitions")) {
        return true;
      }
      return false;
    },
  },
  methods: {
    updateQuery() {
      try {
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        if (this.filter.status != "" && this.filter.status !== undefined) {
          this.$router
            .push({
              path: `/${this.$route.fullPath.replace(/^\/|\/$/g, "")}/`,
              query: { status: this.filter.status },
            })
            .catch(() => {});
        } else if (
          this.filter.status == "" ||
          this.filter.status == undefined
        ) {
          let query = Object.assign({}, this.$route.query);
          delete query.status;
          this.$router.push({ query }).catch(() => {});
        }

        if (this.filter.from != "" && this.filter.to != "") {
          queries.dateFrom = this.filter.from;
          queries.dateTo = this.filter.to;
          if (this.filter.status == "" || this.filter.status == undefined) {
            delete queries.status;
          } else {
            queries.status = this.filter.status;
          }
          this.$router
            .push({
              path: `/${this.$route.fullPath.replace(/^\/|\/$/g, "")}/`,
              query: queries,
            })
            .catch(() => {});
        } else if (this.filter.from == "" || this.filter.to == "") {
          let query = Object.assign({}, this.$route.query);

          delete query.dateFrom;
          delete query.dateTo;

          if (this.filter.status == "" || this.filter.status == undefined) {
            delete queries.status;
          } else {
            queries.status = this.filter.status;
          }

          this.$router.push({ query }).catch(() => {});
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    if (this.datesFromQuery !== undefined) {
      this.filter = this.datesFromQuery;
    }
  },
  watch: {
    filters: function (val) {
      let [from, to, status] = val.split("|");
      this.$emit("changeFilter", {
        from,
        to: to !== "|" ? to : "",
        status: status !== "|" ? status : "",
      });
      this.updateQuery();
    },
  },
};
</script>
