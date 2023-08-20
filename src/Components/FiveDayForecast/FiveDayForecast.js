import React from 'react';
import { format, parseISO } from 'date-fns';
import './FiveDayForecast.css';

const FiveDayForecast = ({ forecastData }) => {
  const firstRowData = forecastData.slice(0, 2);
  const secondRowData = forecastData.slice(2, 4);
  const thirdRowData = forecastData.slice(4);

  const weatherImages = [
    'https://www.iconarchive.com/download/i18091/icons-land/weather/Overcast.ico',       
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Weather_icon_-_heavy_rain.svg/1200px-Weather_icon_-_heavy_rain.svg.png',       
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Weather_icon_-_heavy_rain.svg/1200px-Weather_icon_-_heavy_rain.svg.png', 
    'https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-day-icon.png',        
    'https://www.iconarchive.com/download/i18091/icons-land/weather/Overcast.ico',        
  ];

  return (
    <div className='container'>
      <h2 style={{color:"white"}}>Five Days Forecast</h2>
      <div className='forecast-container'>
        <div className="centered-row-container">
          {firstRowData.map((forecastItem, index) => (
            <div key={index} className='forecast-card'>
              <div className='forecast-date'>
                {format(parseISO(forecastItem.dt_txt.split(' ')[0]), 'dd-MMM-yyyy')}
              </div>
              <div className='forecast-day'>
                {format(parseISO(forecastItem.dt_txt.split(' ')[0]), 'iii')}
              </div>
              <div className='forecast-image' style={{ backgroundImage: `url(${weatherImages[index % 2]})` }}>
              </div>
              <p>{forecastItem.main?.temp}°C</p>
            </div>
          ))}
        </div>
        <div className="centered-row-container">
          {secondRowData.map((forecastItem, index) => (
            <div key={index} className='forecast-card'>
              <div className='forecast-date'>
                {format(parseISO(forecastItem.dt_txt.split(' ')[0]), 'dd-MM-yyyy')}
              </div>
              <div className='forecast-day'>
                {format(parseISO(forecastItem.dt_txt.split(' ')[0]), 'iii')}
              </div>
              <div className='forecast-image' style={{ backgroundImage: `url(${weatherImages[index % 2 + 2]})` }}>
              </div>
              <p>{forecastItem.main?.temp}°C</p>
            </div>
          ))}
        </div>
        <div className="centered-row-container">
          {thirdRowData.map((forecastItem, index) => (
            <div key={index} className='forecast-card'>
              <div className='forecast-date'>
                {format(parseISO(forecastItem.dt_txt.split(' ')[0]), 'dd-MM-yyyy')}
              </div>
              <div className='forecast-day'>
                {format(parseISO(forecastItem.dt_txt.split(' ')[0]), 'iii')}
              </div>
              <div className='forecast-image' style={{ backgroundImage: `url(${weatherImages[4]})` }}>
              </div>
              <p>{forecastItem.main?.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiveDayForecast;
