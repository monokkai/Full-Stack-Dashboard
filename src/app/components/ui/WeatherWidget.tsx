"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { WeatherData } from "@/app/interfaces/WeatherData";

interface WeatherWidgetProps {
  lat?: string;
  lon?: string;
  city?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  lat = "54.715424",
  lon = "20.509207",
  city = "Kaliningrad",
}) => {
  const getCurrentDateTime = () => {
    const now = new Date();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return {
      time: `${hours}:${minutes}:${seconds}`,
      date: `${dayOfWeek}, ${day} ${month} ${year}`,
    };
  };

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  const API_KEY = "5f7e949b103da1232d6a74766fe9821a";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat,
              lon,
              appid: API_KEY,
              lang: "en",
              units: "metric",
            },
          }
        );

        setWeatherData(response.data);
      } catch (err) {
        console.error("Error loading weather data:", err);
        setError("Error loading weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon, API_KEY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getBackgroundImage = (description: string): string => {
    const weatherBackgrounds = new Map<string, string>([
      ["clear", "/weather/sunny.png"],
      ["clear sky", "/weather/sunny.png"],
      ["rain", "/weather/rainy.png"],
      ["overcast", "/weather/overcast.png"],
      ["overcast clouds", "/weather/overcast.png"],
      ["clouds", "/weather/cloudy.png"],
      ["scattered clouds", "/weather/cloudy.png"],
      ["few clouds", "/weather/cloudy.png"],
      ["broken clouds", "/weather/cloudy.png"],
      ["light rain", "/weather/rainy.png"],
    ]);

    return (
      weatherBackgrounds.get(description.toLowerCase()) || "/weather/cloudy.png"
    );
  };

  if (loading) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg shadow-md w-full max-w-xs">
        <div className="text-right font-bold text-2xl">{dateTime.time}</div>
        <div className="text-right text-gray-600">{dateTime.date}</div>
        <div className="mt-6 flex justify-center items-center">
          <div className="h-2 w-full bg-red-200 rounded-full">
            <div className="h-2 bg-red-500 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
        <div className="mt-2 text-center text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg shadow-md w-full max-w-xs">
        <div className="text-right font-bold text-2xl">{dateTime.time}</div>
        <div className="text-right text-gray-600">{dateTime.date}</div>
        <div className="mt-6 text-center text-red-500">{error}</div>
        <div className="h-2 w-full bg-red-200 rounded-full mt-4">
          <div className="h-2 bg-red-500 rounded-full w-full"></div>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;
  const description = weatherData.weather[0].description || "clouds";
  const bgImage = getBackgroundImage(description);

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs relative overflow-hidden"
      style={{ position: "relative" }}
    >
      <div className="relative z-10 text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
        <p className="text-xl text-gray-700 mt-2">{description}</p>
      </div>

      <div
        className="absolute inset-0 opacity-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          filter: "blur(3px)",
          zIndex: 1,
        }}
      ></div>

      <div className="relative z-10 mt-4 space-y-2 text-gray-800">
        <p className="text-xl">
          Temperature: {Math.round(weatherData.main.temp)}°C
        </p>
        <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-lg">Wind speed: {weatherData.wind.speed} m/s</p>
      </div>

      <div className="text-right mt-4 relative z-10">
        <div className="font-bold text-2xl">{dateTime.time}</div>
        <div className="text-gray-700">{dateTime.date}</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
