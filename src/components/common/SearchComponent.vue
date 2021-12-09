<template>
  <div class="filters-block">
    <b-form>
      <b-form-group>
        <b-input-group class="search-input-wrapper">
          <b-form-input
            type="search"
            v-model="searchText"
            placeholder="Search for a name..."
          ></b-form-input>
          <b-icon
            font-scale="1.2"
            class="search-input-icon"
            icon="search"
          ></b-icon>
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
      text = text.toLowerCase().split(" ");
      return this.items.filter(function (item) {
        return text.every(function (el) {
          return item.name.toLowerCase().indexOf(el) > -1;
        });
      });
    },
  },
  watch: {
    searchText: function (val) {
      this.result = this.find(val);
    },
    result: function (val) {
      if (val && val.length > 0) {
        this.$emit("showFiltered", val);
      } else {
        this.$emit("showFiltered", this.items);
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
</style>