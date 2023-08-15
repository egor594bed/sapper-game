<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Имя</th>
          <th class="text-left">Время</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Иван</td>
          <td>500</td>
        </tr>
        <tr>
          <td>Гость</td>
          <td>499</td>
        </tr>
        <!-- <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr> -->
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped></style>
