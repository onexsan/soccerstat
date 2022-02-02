<template>
  <div>
    <ul class="match-list" v-if="paginatedData && paginatedData.length > 0">
      <MatchItem
        v-for="item in paginatedData"
        :key="item.id"
        :item="item"
        :team="team"
      />
    </ul>
    <b-alert show variant="warning" v-if="paginatedData.length === 0 && !error"
      >Not found.</b-alert
    >
    <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
    <pagination
      v-if="pageCount > 1"
      :records="matches.length"
      v-model="page"
      :per-page="size"
      @paginate="changePage"
      :options="{
        chunk: 5,
      }"
    >
    </pagination>
  </div>
</template>

<script>
import MatchItem from "@/components/common/MatchItem.vue";
export default {
  props: ["matches", "team", "error"],
  components: { MatchItem },
  data() {
    return {
      page: 1,
      size: 12,
    };
  },
  computed: {
    paginatedData() {
      if (this.matches && this.pageCount) {
        let num = this.page;
        if (num === 1) {
          return this.matches.slice(0, this.size);
        } else {
          let start = this.size * (num - 1);
          return this.matches.slice(start, start + this.size);
        }
      }
      return [];
    },
    pageCount() {
      let l = this.matches.length,
        s = this.size;
      return Math.ceil(l / s);
    },
  },
  methods: {
    changePage(page) {
      console.log(page);
    },
  },
  watch: {
    matches: function (val, oldVal) {
      if (val !== oldVal) {
        this.page = 1;
      }
    },
  },
};
</script>
