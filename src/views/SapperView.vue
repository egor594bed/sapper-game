<template>
  <v-container>
    <SapperSettings
      v-if="gameStatus === 'settings'"
      @startGame="startGame($event)"
    />
    <SapperGame
      v-else
      @setGameStatus="gameStatus = $event"
      :settings="settings"
    />
  </v-container>
</template>

<script lang="ts">
import SapperSettings from "@/components/Sapper/SapperSettings.vue";
import SapperGame from "@/components/Sapper/SapperGame.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SapperSettings,
    SapperGame,
  },
  data() {
    return {
      gameStatus: "settings",
      settings: {},
    };
  },
  methods: {
    startGame(settings: {
      gameMode: string;
      customSettings: { rows: number; columns: number; mines: number };
    }) {
      this.settings = settings;
      this.gameStatus = "game";
    },
  },
});
</script>

<style lang="scss" scoped></style>
