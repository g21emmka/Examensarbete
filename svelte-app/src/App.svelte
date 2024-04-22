<script>

  import DataTable from './lib/DataTable.svelte';
  import { onMount } from 'svelte';
  
  let weatherData = []
  
  //Fetch data from json file
  onMount(async () => {
    const res = await fetch('./StockholmHistoricalWeatherObservations.json');
    weatherData = await res.json();
  })

</script>

<div>
  <h1> Data Table</h1>
   <DataTable {weatherData} />
</div>

