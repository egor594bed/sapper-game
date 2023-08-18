<template>
  <v-text-field
    :label="label"
    :value="value"
    @input="updateValue"
    type="number"
    variant="outlined"
    class="mr-2"
    hide-details="auto"
    min="1"
    max="32"
  ></v-text-field>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      if (Number(event.target.value) < 1 || !event.target.value)
        this.$emit("update:value", "1");
      else if (Number(event.target.value) > 32)
        this.$emit("update:value", "32");
      else this.$emit("update:value", event.target.value);
    },
  },
});
</script>
