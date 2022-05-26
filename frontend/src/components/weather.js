import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import './styles.css'

const refresh = () => {
    window.location.reload();
}

const disableWeekends = (date) => {
    return day_from_today(date) >= 7;
}

const day_from_today = (date) => {
    let diff_in_ms = date._d.getTime() - new Date().getTime();
    let diff_in_days = Math.ceil(diff_in_ms / (1000 * 3600 * 24));

    return diff_in_days;
}

const WeatherCard = ({weatherData, locationName}) => {
    const[date, setDate] = useState(new Date());
    const[day, setDay] = useState(0);

    return (
        <div className="main">
            <div className="top">
                <p className="header">{locationName}</p>
                <IconButton onClick={refresh}>
                    <Refresh sx={{ color: 'white' }}/>
                </IconButton>
            </div>

            <div className="flex">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                label="Choose a Date"
                value={date}
                disablePast
                shouldDisableDate={(disableWeekends)}
                onChange={(date) => {
                    setDate(date);
                    setDay(day_from_today(date))
                }}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
                <p className="description">{weatherData.daily[day].weather[0].main}</p>
            </div>

            <div className="flex">
                <p className="temp">Day: {(weatherData.daily[day].feels_like.day - 275).toFixed(2)} &deg;C</p>
                <p className="temp">Night: {(weatherData.daily[day].feels_like.night - 275).toFixed(2)} &deg;C</p>
            </div>

            <div className="flex">
              <p className="sunrise">Sunrise: {new Date(weatherData.daily[day].sunrise * 1000).toLocaleTimeString('en-IN')}</p>
              <p className="sunrise">Sunset: {new Date(weatherData.daily[day].sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>
        
        </div>
    )
}

export default WeatherCard;