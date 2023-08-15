<template>
  <v-container>
    <SapperSettings
      v-if="gameStatus === 'settings'"
      @startGame="startGame($event)"
    />
    <SapperGame
      v-if="gameStatus !== 'settings'"
      @setGameStatus="gameStatus = $event"
      :gameSettings="gameSettings"
    />
  </v-container>
</template>

<script lang="ts">
import SapperSettings from "@/components/Sapper/SapperSettings.vue";
import SapperGame from "@/components/Sapper/SapperGame.vue";
import { defineComponent } from "vue";
import { SapperGameConstructor } from "@/models/SapperGameConstructor";

export default defineComponent({
  components: {
    SapperSettings,
    SapperGame,
  },
  data() {
    return {
      gameStatus: "settings",
      gameSettings: {},
    };
  },
  methods: {
    startGame(settings: {
      gameMode: string;
      customSettings: { rows: number; columns: number; mines: number };
    }) {
      console.log(
        new SapperGameConstructor(settings.gameMode, settings.customSettings)
      );
      this.gameSettings = new SapperGameConstructor(
        settings.gameMode,
        settings.customSettings
      );
      this.gameStatus = "game";
    },
  },
});
</script>

<style lang="scss" scoped></style>
