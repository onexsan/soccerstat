<template>
  <div class="filters-block">
    <b-form>
      <b-row class="my-1">
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
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        from: "",
        to: "",
      },
    };
  },
  computed: {
    fromAndTo() {
      return `${this.filter.from}|${this.filter.to}`;
    },
  },
  watch: {
    fromAndTo: function (val) {
      let [from, to] = val.split("|");
      this.$emit("changeFilter", {
        from,
        to: to !== "|" ? to : "",
      });
    },
  },
};
</script>

<style>
.filters-block {
  margin-bottom: 20px;
  padding: 20px 10px;
  background-color: #e0dede;
  border-radius: 5px;
}

.filters-block label {
  font-weight: bold;
}
</style>