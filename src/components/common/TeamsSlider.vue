<template>
  <div
    class="carousel"
    :class="{ 'carousel--competition-page': competitionPage === true }"
    v-if="teams && teams.length > 0"
  >
    <VueSlickCarousel
      v-if="competitionPage && competitionPage === true"
      class="carousel__block"
      v-bind="competitionCarouselSettings"
      ref="carousel"
    >
      <div class="block__item" v-for="item in teams" :key="item.id">
        <b-card class="card">
          <router-link class="card__link" :to="`/teams/${item.id}`">
            <img
              :src="item.crestUrl"
              width="20"
              height="15"
              class="card__img"
            />
            <p class="card__title">{{ item.name }}</p>
          </router-link>
        </b-card>
      </div>
    </VueSlickCarousel>

    <div class="carousel__buttons">
      <button class="btn" @click="showPrev">&lt;</button>
      <button class="btn" @click="showNext">></button>
    </div>
  </div>
  <b-alert show variant="warning" v-else>Not found.</b-alert>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: { VueSlickCarousel },
  props: ["teams", "competitionPage"],
  data() {
    return {
      competitionCarouselSettings: {
        dots: false,
        arrows: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 480,
            settings: {
              dots: false,
              arrows: false,
              infinite: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    showPrev() {
      this.$refs.carousel.prev();
    },
    showNext() {
      this.$refs.carousel.next();
    },
  },
};
</script>
