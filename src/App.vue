<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header/Header.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
  },
});
</script>

<template>
  <v-app>
    <Header />
    <RouterView />
  </v-app>
</template>

<style scoped></style>
