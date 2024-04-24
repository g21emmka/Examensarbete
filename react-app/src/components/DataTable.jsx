import { useState } from "react";

function DataTable (props) {

    //Creates a new array with unique values of the years in the weatherData array 
    const years = [...new Set(props.weatherData.map(data => data.year))]

    //The initial state is set to an empty array
    const [dataFilter, setDataFilter] = useState([]);

    //Check if a checkbox is checked or unchecked 
    function handleCheckboxFilter(e) {
        const {value, checked} = e.target;
        if(!dataFilter.includes(value) && checked){
            setDataFilter([...dataFilter,value])
        } else {
            setDataFilter(dataFilter.filter(f=>f!==value))
        }
    };

    let weatherData = props.weatherData;

    //The table will update its's data depending on the checkbox filtering  
    const filterData = dataFilter.length > 0 ? weatherData.filter(data  => dataFilter.includes(data.year)) : weatherData;

    return(
        <div className="box-div"> 
        
        {/*List of filters*/}
        <div className="filter-box">
            <h2>Filter</h2>
            <p>Year</p>
            <ul>
                <li>
                {years.map((year) => {
                    return(
                    <label >
                    <input type="checkbox" value={[year]} onChange={handleCheckboxFilter}/>
                    { year }
                    </label>
                    )
                })}
                </li>
            </ul> 
        </div>
        
        {/* Data table */}
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
                    <th>Diurnal minimum temperature</th>
                    <th>Estimated daily mean temperature</th>
                </tr>
            </thead>   
            <tbody>           
            {filterData.map((data) => {
                return (
                <tr key={data.id}>
                    <td>{data.year}</td>
                    <td>{data.month}</td>
                    <td>{data.date}</td>
                    <td>{data.t1}</td>
                    <td>{data.t2}</td>
                    <td>{data.t3}</td>
                    <td>{data.tx}</td>
                    <td>{data.tn}</td>
                    <td>{data.tm}</td>
                </tr>
                );
            })}
            </tbody>       
        </table>
        </div>
    );
};

export default DataTable;