import React from "react";
import moment from "moment";
import { IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material'
import './styles.css';

const refresh = () => {
    window.location.reload();
}

const WeatherCard = ({weatherData}) => (
    <div className="main">
        <div className="top">
            <p className="header">{weatherData.name}</p>
            <IconButton onClick={refresh}>
                <Refresh sx={{ color: 'white' }}/>
            </IconButton>
        </div>
        
        <div className="flex">
            <p className="day">
                {moment().format('dddd')}, 
                <span>
                {moment().format('LL')}
                </span>
            </p>
            <p className="description">{weatherData.weather[0].main}</p>
        </div>
        
        <div className="flex">
            <p className="temp">Temperature: {(weatherData.main.temp - 275).toFixed(2)} &deg;C</p>
            <p className="temp">Humidity: {(weatherData.main.humidity)}</p>
        </div>

        <div className="flex">
          <p className="sunrise">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
          <p className="sunrise">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        </div>
        
    </div>
)

export default WeatherCard;