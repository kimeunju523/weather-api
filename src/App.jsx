import axios from "axios";
import { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRainWind,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

const weatherIcon = {
  "01": {
    textColor: "text-orange-700",
    icon: <WiDaySunny size={120} />,
  },
  "02": {
    textColor: "text-pink-500",
    icon: <WiDayCloudy size={120} />,
  },
  "03": {
    textColor: "text-gray-500",
    icon: <WiCloud size={120} />,
  },
  "04": {
    textColor: "text-gray-700",
    icon: <WiCloudy size={120} />,
  },
  "09": {
    textColor: "text-gray-700",
    icon: <WiShowers size={120} />,
  },
  10: {
    textColor: "text-gray-700",
    icon: <WiRainWind size={120} />,
  },
  11: {
    textColor: "text-pink-500",
    icon: <WiThunderstorm size={120} />,
  },
  13: {
    textColor: "text-gray-700",
    icon: <WiFog size={120} />,
  },
  50: {
    textColor: "text-gray-700",
    icon: <WiDaySunny size={120} />,
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2217cfa97a230ed07f54484b252b2871&units=metric`
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    getWeather();
  }, [latitude, longitude]);

  useEffect(() => {
    console.log(process.env.REACT_APP_WEATHER_KEY);
  }, []);
  // 날씨가져오기
  return (
    <div className="min-h-screen flex flex-col justify-center ietms-center text-2xl">
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherData.name}, {weatherData.main.temp}
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
