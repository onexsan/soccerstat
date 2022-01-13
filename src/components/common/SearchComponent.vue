<template>
  <div class="filters-block">
    <b-form @submit.prevent="submitFiltered">
      <b-form-group>
        <b-input-group class="search-input-wrapper">
          <b-form-input
            class="search-input"
            type="search"
            v-model="searchText"
            placeholder="Search for a name..."
          ></b-form-input>
          <b-input-group-append>
            <b-button class="search-btn" type="submit" variant="success"
              >Search</b-button
            >
          </b-input-group-append>
        </b-input-group>
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
      result: [],
    };
  },
  methods: {
    find(text) {
      if (this.items && this.items != undefined && this.items.length > 0) {
        text = text.toLowerCase().split(" ");
        return this.items.filter(function (item) {
          return text.every(function (el) {
            return item.name.toLowerCase().indexOf(el) > -1;
          });
        });
      }
    },
    updateQuery() {
      try {
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        if (this.searchText != "") {
          queries.search = this.searchText;
        } else {
          delete queries.search;
        }
        this.$router
          .push({
            path: `/${this.$route.path.replace(/\\|\//g, "")}/`,
            query: { search: queries.search },
          })
          .catch(() => {});
      } catch (err) {
        console.log(err);
      }
    },
    submitFiltered() {
      if (this.result != undefined) {
        this.$emit("showFiltered", this.result);
        this.updateQuery();
      }
    },
  },
  mounted() {
    let params = null;
    if (
      this.$route.query &&
      Object.getPrototypeOf(JSON.parse(JSON.stringify(this.$route.query))) ===
        Object.prototype &&
      Object.keys(JSON.parse(JSON.stringify(this.$route.query))).length > 0
    ) {
      params = JSON.parse(JSON.stringify(this.$route.query));
    }
    if (params !== null && params.search) {
      this.searchText = params.search;
      this.result = this.find(params.search);
      this.submitFiltered();
    }
  },
  watch: {
    searchText: function (val) {
      this.result = this.find(val);

      if (val === "") {
        this.submitFiltered();
      }
    },
  },
};
</script>

<style>
.search-input-wrapper {
  position: relative;
}

.search-input-wrapper .search-input-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 10px;
}

input.search-input {
  border-radius: 5px 0px 0px 5px;
}
input.search-input:focus,
input.search-input:active {
  outline: none;
  box-shadow: none;
  border: 1px solid green;
}

.search-btn {
  border-radius: 0px 5px 5px 0px;
}
</style>