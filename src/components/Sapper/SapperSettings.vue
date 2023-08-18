<template>
  <v-card
    width="100%"
    max-width="600px"
    color="grey-lighten-5"
    class="mx-auto pa-5"
    rounded
    elevation="4"
  >
    <v-card-title class="text-h5 text-center mb-5">Настройка игры</v-card-title>
    <v-tabs>
      <v-btn
        @click="gameMode = 'easy'"
        v-bind:color="gameMode === 'easy' ? 'blue' : 'transparent'"
        class="ml-6"
        >8 на 8</v-btn
      >
      <v-btn
        @click="gameMode = 'medium'"
        v-bind:color="gameMode === 'medium' ? 'blue' : 'transparent'"
        class="ml-6"
        >16 на 16</v-btn
      >
      <v-btn
        @click="gameMode = 'hard'"
        v-bind:color="gameMode === 'hard' ? 'blue' : 'transparent'"
        class="ml-6"
        >32 на 16</v-btn
      >
      <v-btn
        class="ml-6"
        @click="gameMode = 'custom'"
        v-bind:color="gameMode === 'custom' ? 'blue' : 'transparent'"
        >Свой размер</v-btn
      >
    </v-tabs>
    <v-expand-transition>
      <div v-show="gameMode === 'custom'">
        <div class="d-flex justify-space-between pa-5 pb-0 inputs">
          <SapperSettingsInput
            :label="'Ширина'"
            v-model:value="customSettings.rows"
          />
          <SapperSettingsInput
            :label="'Высота'"
            v-model:value="customSettings.columns"
          />
          <SapperSettingsInput
            :label="'Кол-во мин'"
            v-model:value="customSettings.mines"
          />
        </div>
      </div>
    </v-expand-transition>

    <div class="d-flex justify-center mt-5 mt-5">
      <v-btn @click="startGame" width="100%">Начать</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SapperSettingsInput from "./SapperSettingsInput.vue";
export default defineComponent({
  components: {
    SapperSettingsInput,
  },
  data() {
    return {
      gameMode: "easy",
      customSettings: {
        rows: "8",
        columns: "8",
        mines: "8",
      },
    };
  },
  methods: {
    startGame() {
      this.$emit("startGame", {
        gameMode: this.gameMode,
        customSettings: {
          rows: Number(this.customSettings.rows),
          columns: Number(this.customSettings.columns),
          mines: Number(this.customSettings.mines),
        },
      });
    },
  },
});
</script>

<style lang="css" scoped>
@media (max-width: 400px) {
  .inputs {
    gap: 10px;
    flex-direction: column;
  }
}
</style>
