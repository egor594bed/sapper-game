<template>
  <v-card
    width="100%"
    max-width="600px"
    color="grey-lighten-5"
    class="mx-auto pa-5"
    rounded
    elevation="4"
  >
    <p
      class="text-h5 text-center mb-5"
      v-bind:class="
        game.status === 'win'
          ? 'text-green'
          : game.status === 'gameover'
          ? 'text-red'
          : 'text-black'
      "
    >
      {{ game.getGameStatus() }}
    </p>
    <div class="d-flex justify-space-around mb-5">
      <v-card width="100px" class="text-center pa-2">{{
        new Date(timer * 1000).toISOString().slice(11, 19)
      }}</v-card>
      <v-card width="100px" class="text-center pa-2"
        >{{ game.minesCounter }}
      </v-card>
    </div>
    <div class="mb-5" id="gamefield">
      <v-sheet v-for="row in game.cells" class="d-flex" width="100%">
        <v-sheet v-for="cell in row">
          <SapperCell
            :cell="cell"
            :width="gamefieldWidth / game.rows"
            @update="updateGame($event)"
          />
        </v-sheet>
      </v-sheet>
    </div>

    <div class="d-flex justify-space-between">
      <v-btn @click="$emit('setGameStatus', 'settings')" width="100px"
        >Назад</v-btn
      >
      <v-btn width="100px" @click="restartGame">Заного</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SapperCell from "@/components/Sapper/SapperCell.vue";
import { SapperGameConstructor } from "@/models/SapperGameConstructor";

export default defineComponent({
  components: {
    SapperCell,
  },
  data: () => ({
    game: {} as SapperGameConstructor,
    timer: 0,
    gamefieldWidth: 0,
  }),
  props: {
    settings: {
      //Разобраться как привязать тип
      type: Object,
      required: true,
    },
  },
  methods: {
    updateGame(coords: { x: number; y: number }) {
      this.game.cellHasBeenUpdated(coords.x, coords.y);
      this.game = this.game.getGameCopy();
    },
    restartGame() {
      this.game = new SapperGameConstructor(
        this.settings.gameMode,
        this.settings.customSettings
      );
      this.timer = this.game.timer;
      this.timeTick();
    },
    timeTick() {
      if (this.game.status !== "game") return;
      setTimeout(() => {
        this.timer -= 1;
        this.timeTick();
      }, 1000);
    },
  },
  created() {
    this.game = new SapperGameConstructor(
      this.settings.gameMode,
      this.settings.customSettings
    );
    this.timer = this.game.timer;
    this.timeTick();
  },
  mounted() {
    this.gamefieldWidth =
      document.getElementById("gamefield")?.offsetWidth || 560;
  },
  watch: {
    timer: {
      handler() {
        if (this.timer === 1) {
          this.game.status = "gameover";
        }
      },
    },
  },
  emits: ["startGame", "setGameStatus"],
});
</script>
