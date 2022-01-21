<template>
  <ul class="match-list" v-if="matches && matches.length > 0">
    <MatchItem
      v-for="item in matches"
      :key="item.id"
      :item="item"
      :team="team"
    />
  </ul>
  <p v-else>Not found.</p>
</template>

<script>
import MatchItem from "@/components/common/MatchItem.vue";
export default {
  props: ["matches", "team"],
  components: { MatchItem },
};
</script>
