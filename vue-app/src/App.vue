<script setup>

import DataTable from "./components/DataTable.vue";
import { onMounted, ref } from "vue";

const weatherData = ref([]);

//Fetch data from json file
onMounted(async () => {
  const response = await fetch("/StockholmHistoricalWeatherObservations.json");
  weatherData.value = await response.json();
});

</script>

<template>
  <div >
  <h1> Data Table</h1>
   <DataTable :weatherData="weatherData" />
  </div>
</template>

