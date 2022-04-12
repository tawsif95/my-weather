import './App.css';
import React, { useEffect, useState } from 'react';
import './components/weather'
import WeatherCard from './components/weather';
import { CircularProgress } from '@mui/material';

const App = () => {

  const[lat, setLat] = useState([]);
  const[long, setLong] = useState([]);
  const[data, setData] = useState([]);
  
  useEffect(() => {

    const fetchData = async () => {

      navigator.geolocation.getCurrentPosition( function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      
      await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setData(res);
        })
    };

    fetchData();
  },[lat, long]);

  return (
    <div className="App">
      {
        (typeof data.main != 'undefined') ? (
          <WeatherCard weatherData={data}/>
        ) : (
          <div>
            <CircularProgress color="secondary" />
          </div>
        )
      }
    </div>
  );
}

export default App;
