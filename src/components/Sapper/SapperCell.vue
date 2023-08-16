<template>
  <v-sheet
    v-if="!cell.isOpen"
    id="embossment"
    @click="openCell"
    @click.right="changeFlag"
    @contextmenu.capture.prevent
    :width="width"
    :height="width"
    class="bg-grey-lighten-2 d-flex justify-center align-center"
  >
    <svg-icon
      v-if="cell.flag"
      type="mdi"
      :path="cell.flag === 'flag' ? iconPaths[0] : iconPaths[1]"
    ></svg-icon>
  </v-sheet>

  <v-sheet
    v-if="cell.isOpen"
    :width="width"
    :height="width"
    class="d-flex justify-center align-center"
    :color="cell.isMine ? 'red' : 'white'"
    border
    ><p
      v-if="cell.aroundMines > 0 && !cell.isMine"
      class="font-size-50 d-flex justify-center align-center"
      :style="{ color: cell.color }"
    >
      {{ cell.aroundMines }}
    </p>
    <svg-icon
      v-if="cell.isOpen && cell.isMine"
      type="mdi"
      :path="iconMine"
    ></svg-icon>
  </v-sheet>
</template>

<script lang="ts">
//@ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMine } from "@mdi/js";
import { mdiHelp } from "@mdi/js";
import { mdiFlag } from "@mdi/js";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconPaths: [mdiFlag, mdiHelp],
      iconMine: mdiMine,
    };
  },
  props: {
    cell: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  methods: {
    update() {
      this.$emit("update", { x: this.cell.x, y: this.cell.y });
    },
    openCell() {
      this.cell.open();
      this.update();
    },
    changeFlag() {
      this.cell.setFlag();
      this.update();
    },
  },
  emits: ["update"],
});
</script>

<style lang="css" scoped>
#embossment {
  box-shadow: inset rgba(206, 206, 206, 0.2) 8px 8px 18px 5px,
    inset rgba(146, 145, 145, 0.5) -8px -8px 18px 5px;
}
</style>
