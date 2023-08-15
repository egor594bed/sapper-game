<template>
  <v-app-bar class="pt-1" style="position: static">
    <v-container>
      <v-tabs>
        <v-tab @click="$router.push('/')">Сапер</v-tab>
        <v-tab @click="$router.push('/leaderboard')">Таблица лидеров</v-tab>
      </v-tabs>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped></style>
