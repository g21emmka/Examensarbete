import './App.css'
import DataTable from './components/DataTable'
import React, { useState, useEffect} from 'react';

function App() {

  const [weatherData, setWeatherData] = useState([]); 
  
  //Fetch data from json file
  useEffect(() => {
    fetch("./StockholmHistoricalWeatherObservations.json")
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, []);

  return (
    <div>
      <h1>Data Table</h1>
        <DataTable weatherData={weatherData}/>
    </div>
  );
}

export default App

