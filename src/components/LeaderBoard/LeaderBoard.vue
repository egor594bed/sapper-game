<template>
  <v-container>
    <h1 class="text-center">Таблица лидеров</h1>
    <div class="d-flex justify-center mb-5 mt-5">
      <v-btn
        @click="leaderBoardName = 'easy'"
        v-bind:color="leaderBoardName === 'easy' ? 'blue' : 'transparent'"
        >8 на 8</v-btn
      >
      <v-btn
        @click="leaderBoardName = 'medium'"
        v-bind:color="leaderBoardName === 'medium' ? 'blue' : 'transparent'"
        class="ml-6"
        >16 на 16</v-btn
      >
      <v-btn
        @click="leaderBoardName = 'hard'"
        v-bind:color="leaderBoardName === 'hard' ? 'blue' : 'transparent'"
        class="ml-6"
        >32 на 16</v-btn
      >
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th class="text-center">Имя</th>
          <th class="text-center">Время решения</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(winner, index) in leaderBoardStore.leaderBoard[leaderBoardName as gameModes]"
          :key="index + winner.name"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ winner.name }}</td>
          <td class="text-center">{{ winner.time }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLeaderBoardStore } from "@/stores/leaderBoardStore";
import type { gameModes } from "@/types/gameModes";

export default defineComponent({
  name: "LeaderBoard",
  data: () => ({
    leaderBoardStore: useLeaderBoardStore(),
    leaderBoardName: "easy",
  }),
});
</script>

<style lang="scss" scoped></style>
