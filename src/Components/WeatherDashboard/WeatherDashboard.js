import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import ForecastChart from "../ForecastChart/ForecastChart";
import FiveDayForecast from "../FiveDayForecast/FiveDayForecast";
import "./WeatherDashboard.css";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [forecast, setForecast] = useState([]);

  const url = "https://api.openweathermap.org/data/2.5/weather";
  const appid = "87057d4374b4156060a3164fe14a3628";
  const city = "Jhansi";

  useEffect(() => {
    // Fetching current weather data
    axios
      .get(url, {
        params: {
          q: city,
          appid: appid,
          units: "metric",
        },
      })
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    // Fetching forecast data for five days excluding today
    const currentDate = new Date().toISOString().slice(0, 10);
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          appid: appid,
          units: "metric",
          cnt: 5 * 8,
        },
      })
      .then((response) => {
        const filteredForecastData = response.data.list.filter(
          (item) => !item.dt_txt.includes(currentDate)
        );
        const groupedForecastData = groupForecastByDay(filteredForecastData);
        setForecastData(groupedForecastData);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });

    // Fetching forecast data for the current day
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          appid: appid,
          units: "metric",
          cnt: 8, // Fetching 8 forecasts for today (3-hour intervals)
        },
      })
      .then((response) => {
        setForecast(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching hourly forecast data:", error);
      });
  }, [city]);

  const groupForecastByDay = (forecastList) => {
    const groupedData = {};

    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const formattedDate = format(parseISO(date), "dd-MM-yyyy (iii)");
      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = item;
      }
    });

    return Object.values(groupedData);
  };

  // Getting today's date
  const today = new Date();
  const formattedToday = format(today, "dd MMM");

  return (
    <div className="weather-dashboard">
      <div className="left-section">
        <div className="location">
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {city}, Uttar Pradesh,
            India
          </p>
        </div>
        <p className="date">
          <FontAwesomeIcon icon={faCalendarAlt} /> Today {formattedToday}
        </p>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3845/3845731.png"
            alt="Weather"
            style={{ width: "150px" }}
          />
        </div>
        <p className="temperature">{weatherData.main?.temp}°C</p>
        <p className="weather-description">
          {weatherData.weather?.[0]?.description.charAt(0).toUpperCase() +
            weatherData.weather?.[0]?.description.slice(1)}
        </p>
        <img
          src="https://www.india.com/wp-content/uploads/2019/07/Jhansi-Fort.-.jpg"
          alt="Jhansi"
          width={200}
          style={{ borderRadius: "18px" }}
        />
      </div>

      <div className="middle-section">
        <h2>Today's Highlight</h2>
        <div className="card-container">
          <div
            className="card"
            style={{
              backgroundImage:
                "url('https://st4.depositphotos.com/7844634/22978/i/450/depositphotos_229788914-stock-photo-misted-glass-background-strong-humidity.jpg')",
              backgroundSize: "cover",
              color: "white",
            }}
          >
            <h3>Humidity</h3>
            <p>
              {weatherData.main?.humidity}%
            </p>
          </div>
          <div
            className="card"
            style={{
              backgroundImage:
                "url('https://c.pxhere.com/photos/52/a4/road_straight_wet_rainy_traffic_danger_visibility_fog-1087335.jpg!s2')",
              backgroundSize: "cover",
              color: "white",
            }}
          >
            <h3 style={{ color:"#fff9e3" }}>Visibility</h3>
            <p style={{ color:"#fff9e3" }}>
              {weatherData.visibility
                ? (weatherData.visibility / 1000).toFixed(2)
                : 0}{" "}
              km
            </p>
          </div>
          <div
            className="card"
            style={{
              backgroundImage:
                "url('https://www.denverpost.com/wp-content/uploads/2019/09/AP19245038083813.jpg?w=526')",
              backgroundSize: "cover",
              color: "white",
            }}
          >
            <h3>Wind Speed</h3>
            <p>
              {weatherData.wind?.speed} m/s
            </p>
          </div>
        </div>

        <div className="chart">
          <ForecastChart forecast={forecast} />
        </div>
      </div>

      <div className="right-section">
        <FiveDayForecast forecastData={forecastData} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
