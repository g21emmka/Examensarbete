<script setup>

import {computed, ref} from "vue"; 

// Defines the props for the component 
const props = defineProps ({
    weatherData: {
        type: Array,
        required: true,
    }
});

// Returns a new array with unique values of the years in the weatherData array 
const years = computed( ()=> {
   return [...new Set(props.weatherData.map(data => data.year))];
});

//Ref with a default value of an empty array
const dataFilter = ref([]);

//Check if a checkbox is checked or unchecked 
function handleCheckboxFilter(e) {
    const checked = e.target.value;
    if (dataFilter.value.includes(checked)) {
           dataFilter.value.splice(dataFilter.value.indexOf(checked), 1);
    } else{
        dataFilter.value.push(checked);
    }
};
 
//The table will update its's data depending on the checkbox filtering  
const filterData = computed ( () => {  
   let weatherData = props.weatherData;
    if (dataFilter.value.length){ 
        weatherData = weatherData.filter(data => dataFilter.value.includes(data.year));
    }
   return weatherData;
});                                        

</script>

<template>
    <div class="box-div">
        
        <!-- List of filters-->
        <div class="filter-box">  
            <h2> Filter</h2>
            <p>Year</p>
            <ul>
                <li v-for="(year, index) in years"> 
                    <input type="checkbox" :value="year"  @change="handleCheckboxFilter">  
                    <label> {{ year }}</label>
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
                <tr  v-for="data in filterData" > 
                    <td>{{ data.year }}</td>
                    <td> {{ data.month}} </td>
                    <td> {{ data.date }}</td>
                    <td> {{ data.t1 }}</td>
                    <td> {{ data.t2 }}</td>
                    <td> {{ data.t3 }}</td>
                    <td> {{ data.tx }}</td>
                    <td> {{ data.tn }}</td>
                    <td> {{ data.tm }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>