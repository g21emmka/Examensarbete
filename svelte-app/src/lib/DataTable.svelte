<script>

export let weatherData

//Creates a new array with unique values of the years in the weatherData array 
$: years = [...new Set(weatherData.map(data => data.year))]

//New empty array
let dataFilter = []; 
  
//Check if a checkbox is checked or unchecked 
function handleCheckboxFilter(e) {
    const {value, checked} = e.target;
    if(!dataFilter.includes(value) && checked){
        dataFilter = ([...dataFilter,value])
    } else {
        dataFilter = (dataFilter.filter(f=>f!==value))
    }
};

 //The table will update its's data depending on the checkbox filtering  
  $:filterData = dataFilter.length > 0 ? weatherData.filter(data  => dataFilter.includes(data.year)) : weatherData;

</script>

<div class="box-div">
  
    <!-- List of filters-->
    <div class="filter-box">  
        <h2> Filter</h2>
        <p>Year</p>
        <ul>
            <li> 
                {#each years as year}
                <input id ="checkbox" type="checkbox" value= {year} on:change={handleCheckboxFilter}>  
                <label for="checkbox">{year} </label>
                {/each}
            </li>
        </ul>
    </div>

    <!-- Data table -->
    <table>
    <thead>
        <tr> 
            <th>Year</th>
            <th>Month</th>
            <th>Date</th>
            <th>Morning temperature</th>
            <th>Noon temperature</th>
            <th>Evening temperature</th>
            <th>Diurnal maximum temperature</th>
            <th>Diurnal minimum temperature.</th>
            <th>Estimated daily mean temperature</th>
        </tr>
    </thead>
    <tbody>
        {#each filterData as data}
        <tr > 
            <td >{data.year}</td>
            <td >{data.month}</td>
            <td >{data.date}</td>
            <td >{data.t1}</td>
            <td >{data.t2}</td>
            <td >{data.t3}</td>
            <td >{data.tx}</td>
            <td >{data.tn}</td>
            <td >{data.tm}</td>
        <tr>
        {/each}
    </tbody>
    </table>
</div>
