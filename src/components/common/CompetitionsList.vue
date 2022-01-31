<template>
  <div class="carousel" v-if="blocks && blocks.length > 0">
    <VueSlickCarousel
      class="carousel__block"
      ref="carousel"
      v-bind="carouselSettings"
    >
      <div class="block__item" v-for="item in blocks" :key="item.id">
        <b-card class="card">
          <router-link
            class="card__link card__link--vertical"
            :to="`/competitions/${item.id}`"
          >
            <p class="card__title">
              {{ item.name }}
            </p>
            <p class="card__dates">
              {{ item.currentSeason.startDate.split("-").reverse().join(".") }}
              -
              {{ item.currentSeason.endDate.split("-").reverse().join(".") }}
            </p>
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
  props: ["blocks"],
  components: { VueSlickCarousel },
  data() {
    return {
      carouselSettings: {
        responsive: [
          {
            breakpoint: 1800,
            settings: "unslick",
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
