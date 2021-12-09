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

<style>
ul.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}

.breadcrumbs__item,
.breadcrumbs__divider {
  margin-right: 5px;
}
.breadcrumbs__item:last-child,
.breadcrumbs__divider:last-child {
  margin-right: 0px;
}

.breadcrumbs__divider {
  font-size: 12px;
  color: #666666;
}

.breadcrumbs__item.active .breadcrumbs__link {
  color: darkgreen;
}
</style>