<template>
  <li
    class="match__item"
    :class="{
      draw: areWeWinning === 'draw',
      win: areWeWinning === true,
      lose: areWeWinning === false,
      scheduled: item.status === 'SCHEDULED',
    }"
  >
    <div class="match__item-header">
      <div class="match__item-team">
        <p>{{ item.homeTeam.name }}</p>
        <p>Home team</p>
      </div>
      <div class="match__item-score">
        <template v-if="item.status === 'FINISHED'">
          <span>{{ item.score.fullTime.homeTeam }}</span>
          <span>-</span>
          <span>{{ item.score.fullTime.awayTeam }}</span>
        </template>
        <template v-else>
          <span>VS</span>
        </template>
      </div>
      <div class="match__item-team">
        <p>{{ item.awayTeam.name }}</p>
        <p>Away team</p>
      </div>
    </div>
    <div class="match__item-body">
      <div class="match__item-winner">
        {{
          item.score.winner === "DRAW"
            ? "Draw"
            : item.score.winner === "HOME_TEAM"
            ? item.homeTeam.name
            : item.score.winner === "AWAY_TEAM"
            ? item.awayTeam.name
            : "SCHEDULED"
        }}
      </div>
      <div class="match__item-footer">
        <div class="match__item-date">
          <p>Date</p>
          <p>{{ item.utcDate.slice(0, 10).split("-").reverse().join(".") }}</p>
        </div>
        <div class="match__item-season">
          <p>Season</p>
          <p>
            <span>{{
              item.season.startDate.split("-").reverse().join(".")
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              item.season.endDate.split("-").reverse().join(".")
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MatchItem",
  props: ["item", "team"],
  computed: {
    areWeWinning() {
      if (this.team) {
        if (this.item.score.winner === "HOME_TEAM") {
          return this.item.homeTeam.name === this.team.name;
        } else if (this.item.score.winner === "AWAY_TEAM") {
          return this.item.awayTeam.name === this.team.name;
        } else if (this.item.score.winner === "DRAW") {
          return "draw";
        }
        return "SCHEDULED";
      }
      return 'COMPETITION'
    },
  },
};
</script>

<style>
.match__item-body {
  background-color: #e0dede;
  flex: 1;
}

.match__item,
.match__item-body {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.match__item-footer {
  flex: 1;
}
</style>