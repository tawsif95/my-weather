import React, { useEffect, useState } from 'react';
import WeatherCard from './components/weather';
import { CircularProgress } from '@mui/material';

import './components/weather'
import './App.css';

const App = () => {

  const[lat, setLat] = useState([]);
  const[long, setLong] = useState([]);
  const[data, setData] = useState([]);
  const[name, setName] = useState("");
  

  useEffect(() => {

    const fetchData = async () => {

      navigator.geolocation.getCurrentPosition( function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL_WEEKLY}lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(res => {
          setData(res);
        })
        await fetch(`${process.env.REACT_APP_API_URL}lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(res => {
          setName(res.name);
        })
    };

    fetchData();
  },[lat, long]);

  return (
    <div className="App">

      {
        (typeof data.current != 'undefined') ? (
          <WeatherCard weatherData={data} locationName={name}/>
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
