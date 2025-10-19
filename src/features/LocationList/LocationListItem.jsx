import styles from "./LocationListItem.module.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from '../../App';

function LocationListItem({ location, editLocation }) {
  const { translateCode, handleUpdateCurrentLocation } = useContext(AppContext);
  const [workingLocation, setWorkingLocation] = useState({});
  const [currentTemp, setCurrentTemp] = useState('...');
  const [currentWeatherCode, setCurrentWeatherCode] = useState('...');
  const navigate = useNavigate();

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
    fetchCurrentWeather();
  }, [location]);

  const handleClickTitle = (event) => {
    event.preventDefault();
    handleUpdateCurrentLocation(location.title, location.latitude, location.longitude);
    navigate("/");
    console.log("current location updated");
  }

  return (
    <tr key={workingLocation.id}>
      <td className={styles.clickable} onClick={(event) => handleClickTitle(event)}>
        {workingLocation.title} 
      </td>
      <td>
        {workingLocation.latitude}
      </td>
      <td>
        {workingLocation.longitude}
      </td>
      <td>
        {currentTemp}°F
      </td>
      <td>
        {translateCode(currentWeatherCode)}
      </td>
      <td className={styles.clickable} onClick={() => editLocation(location)}>
        Edit
      </td>
    </tr>
  );
}

export default LocationListItem;
