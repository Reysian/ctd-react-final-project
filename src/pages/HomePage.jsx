import { useEffect, useState } from "react";

function HomePage({ currentLocation, translateCode }) {
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState('...');
  const [weatherCode, setWeatherCode] = useState('...');
  useEffect(() => {
    const fetchWeather = async () => {
        try {
            const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`);
            if (!resp.ok) {
                throw new Error(resp.message);
            }
            const weatherData = await resp.json();
            setTemp(weatherData.current.temperature_2m);
            setWeatherCode(weatherData.current.weather_code);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("fetch weather complete");
        }
    };
    fetchWeather();
  }, [currentLocation])
  return (
    <>
      <h1>Home Page</h1>
      <p>See weather here.</p>
      <p>{currentLocation.title}</p>
      <p>{currentLocation.latitude}, {currentLocation.longitude}</p>
      <div>{temp}°F, {translateCode(weatherCode)}</div>
    </>
  );
}

export default HomePage;