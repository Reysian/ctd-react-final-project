import styles from "./LocationListItem.module.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../App';

function LocationListItem({ location }) {
  const { translateCode, handleUpdateCurrentLocation } = useContext(AppContext);
  const [hasFetched, setHasFetched] = useState(false);
  const [workingLocation, setWorkingLocation] = useState({});
  const [currentTemp, setCurrentTemp] = useState('...');
  const [currentWeatherCode, setCurrentWeatherCode] = useState('...');
  useEffect(() => {
    setWorkingLocation({...location});

    const fetchCurrentWeather = async () => {
        try {
            const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`);
            if (!resp.ok) {
                throw new Error(resp.message);
            }
            const currentWeatherData = await resp.json();
            setCurrentTemp(currentWeatherData.current.temperature_2m);
            setCurrentWeatherCode(currentWeatherData.current.weather_code);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("fetch weather complete");
        }
    };
    if(!hasFetched) {
      fetchCurrentWeather();
    }

    return () => {
      setHasFetched(true);
    }
  }, [location]);

  const handleClickTitle = (event) => {
    event.preventDefault();
    handleUpdateCurrentLocation(location.title, location.latitude, location.longitude);
    console.log("current location updated");
  }

  return (
    <li key={workingLocation.id}>
      <span className={styles.title} onClick={(event) => handleClickTitle(event)}>
        {workingLocation.title} 
      </span>
      : Lat = {workingLocation.latitude}, Long = {workingLocation.longitude}, Temp = {currentTemp}°F, Code = {translateCode(currentWeatherCode)}
    </li>
  );
}

export default LocationListItem;
