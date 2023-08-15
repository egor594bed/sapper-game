<template>
  <v-card
    width="100%"
    max-width="600px"
    color="grey-lighten-5"
    class="mx-auto pa-5"
    rounded
    elevation="4"
  >
    <div class="d-flex justify-space-around mb-5">
      <v-card width="100px" class="text-center pa-2">{{
        gameSettings.timer
      }}</v-card>
      <v-card width="100px" class="text-center pa-2">{{
        gameSettings.mines
      }}</v-card>
    </div>
    <div class="mb-5">
      <v-sheet v-for="row in gameSettings.cells" class="d-flex" width="100%">
        <v-sheet v-for="cell in row">
          <v-sheet
            width="70px"
            height="70px"
            v-bind:color="cell.isMine ? 'red' : 'white'"
            border
            ><p
              v-if="cell.aroundMines > 0 && !cell.isMine"
              class="d-flex justify-center align-center font-size-50"
              style="height: 100%"
            >
              {{ cell.aroundMines }}
            </p></v-sheet
          >
        </v-sheet>
      </v-sheet>
    </div>

    <div class="d-flex justify-space-between">
      <v-btn @click="$emit('setGameStatus', 'settings')" width="100px"
        >Назад</v-btn
      >
      <v-btn width="100px">Заного</v-btn>
    </div>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    gameSettings: {
      //Разобраться как привязать тип
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
