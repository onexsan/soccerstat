<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link :to="firstLinkRoute" class="breadcrumbs__link">{{
        firstLink
      }}</router-link>
    </li>
    <li class="breadcrumbs__divider" v-if="secondLink">></li>
    <li
      class="breadcrumbs__item"
      :class="{ active: !thirdLink }"
      v-if="secondLink"
    >
      <router-link :to="secondLinkRoute" class="breadcrumbs__link">{{
        secondLink
      }}</router-link>
    </li>
    <li class="breadcrumbs__divider" v-if="thirdLink">></li>
    <li
      class="breadcrumbs__item"
      :class="{ active: thirdLink }"
      v-if="thirdLink"
    >
      <router-link :to="thirdLinkRoute" class="breadcrumbs__link">{{
        thirdLink
      }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    "firstLink",
    "firstLinkRoute",
    "secondLink",
    "secondLinkRoute",
    "thirdLink",
    "thirdLinkRoute",
  ],
};
</script>
