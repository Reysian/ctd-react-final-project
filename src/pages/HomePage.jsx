import { useEffect, useState } from "react";
import ErrorWindow from "../shared/ErrorWindow";
import CurrentWeather from "../features/CurrentWeather";

function HomePage({ currentLocation, translateCode, errorMessage }) {
  const [temperature, setTemperature] = useState("...");
  const [humidity, setHumidity] = useState("...");
  const [precipitation, setPrecipitation] = useState("...");
  const [wind, setWind] = useState("...");
  const [weatherCode, setWeatherCode] = useState("...");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchWeather = async () => {
      try {
        const resp = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&current=temperature_2m,weather_code,precipitation,relative_humidity_2m,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const weatherData = await resp.json();
        setTemperature(weatherData.current.temperature_2m);
        setHumidity(weatherData.current.relative_humidity_2m)
        setPrecipitation(weatherData.current.precipitation)
        setWind(weatherData.current.wind_speed_10m)
        setWeatherCode(weatherData.current.weather_code);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch weather complete");
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [currentLocation]);
  return (
    <>
      <h1>Home Page</h1>
      {errorMessage && <ErrorWindow errorMessage={errorMessage} />}
      {isLoading ? "...Loading Weather Data" : (
        <CurrentWeather
          currentLocation={currentLocation}
          temperature={temperature}
          humidity={humidity}
          precipitation={precipitation}
          wind={wind}
          condition={translateCode(weatherCode)}
        />
      )}
    </>
  );
}

export default HomePage;
