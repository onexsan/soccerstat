<template>
  <li
    class="match-item"
    :class="{
      draw: areWeWinning === 'draw',
      win: areWeWinning === true,
      lose: areWeWinning === false,
      scheduled: item.status === 'SCHEDULED',
    }"
  >
    <div class="match-item__header">
      <div class="match-item__date">
        <span>Date</span>
        {{ item.utcDate.slice(0, 10).split("-").reverse().join(".") }}
      </div>
      <div class="match-item__winner" v-if="item.score.winner">
        <span>Winner</span>
        {{
          item.score.winner === "DRAW"
            ? "Draw"
            : item.score.winner === "HOME_TEAM"
            ? item.homeTeam.name
            : item.score.winner === "AWAY_TEAM"
            ? item.awayTeam.name
            : ""
        }}
      </div>
      <div class="match-item__winner" v-else>
        <span>{{ item.status }}</span>
      </div>
    </div>
    <div class="match-item__body">
      <div class="match-item__team">
        <p class="match-item__team-name">{{ item.homeTeam.name }}</p>
        <p class="match-item__team-type">Home team</p>
      </div>
      <div class="match-item__score">
        <template v-if="item.status === 'FINISHED'">
          <span>{{ item.score.fullTime.homeTeam }}</span>
          <span>:</span>
          <span>{{ item.score.fullTime.awayTeam }}</span>
        </template>
        <template v-else>
          <span>VS</span>
        </template>
      </div>
      <div class="match-item__team">
        <p class="match-item__team-name">{{ item.awayTeam.name }}</p>
        <p class="match-item__team-type">Away team</p>
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
      return "COMPETITION";
    },
  },
};
</script>
