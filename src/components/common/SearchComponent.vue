<template>
  <div class="filters-block">
    <b-form
      @submit.prevent="searchForText(searchText)"
      class="search-component"
    >
      <b-form-group>
        <b-row class="search-component__row">
          <b-input-group>
            <b-form-input
              class="search-component__input"
              type="search"
              v-model="searchText"
              placeholder="Search for a name..."
            ></b-form-input>
            <b-input-group-append>
              <b-button
                class="search-component__btn"
                type="submit"
                variant="success"
                @click.prevent="searchForText(searchText)"
                >Search</b-button
              >
            </b-input-group-append>
          </b-input-group>
          <b-input-group>
            <b-button
              class="search-component__cancel"
              variant="danger"
              v-show="searchText !== ''"
              @click.prevent="searchText = ''"
              >Cancel</b-button
            >
          </b-input-group>
        </b-row>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    findAMatch(text) {
      if (
        text !== null &&
        this.items &&
        this.items != undefined &&
        this.items.length > 0
      ) {
        text = text.toLowerCase().split(" ");
        return this.items.filter(function (item) {
          return text.every(function (el) {
            return item.name.toLowerCase().indexOf(el) > -1;
          });
        });
      } else {
        return [];
      }
    },
    getSearchRequestFromQuery() {
      if (this.$route.query && !this.$route.query.search) {
        this.searchText = null;
        this.returnOriginalItems();
      } else {
        this.searchText = this.$route.query.search;
        this.searchForText(this.searchText);
      }
    },
    updateQuery() {
      let query = Object.assign({}, this.$route.query);

      if (this.searchText === "" || this.searchText === null) {
        delete query.search;
      } else {
        query.search = this.searchText;
      }
      this.$router
        .push({
          query,
        })
        .catch(() => {});
    },
    searchForText(val) {
      let result = this.findAMatch(val);

      if (result != undefined) {
        this.$emit("showFiltered", result);
        this.updateQuery();
      }
    },
    returnOriginalItems() {
      this.$emit("showFiltered", this.items);
    },
  },
  mounted() {
    this.getSearchRequestFromQuery();
  },
  watch: {
    searchText: function (val) {
      if (val === "") {
        this.updateQuery();
        this.returnOriginalItems();
      }
    },
  },
};
</script>

<style></style>
