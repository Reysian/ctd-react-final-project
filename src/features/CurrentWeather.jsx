import styles from "./CurrentWeather.module.css";

/*Displays current weather information for the current location*/
function CurrentWeather({
  currentLocation,
  temperature,
  precipitation,
  humidity,
  wind,
  condition,
}) {
  return (
    <div className={styles.currentWeather}>
      <div>
        <h3>
          {currentLocation.title}: {currentLocation.latitude},{" "}
          {currentLocation.longitude}
        </h3>
        <h1>{temperature}°F</h1>
      </div>
      <div>
        <ul>
          <li>Precipitation:</li>
          <li>Humidity:</li>
          <li>Wind:</li>
          <li>Conditions:</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>{precipitation} in</li>
          <li>{humidity}%</li>
          <li>{wind} mph</li>
          <li>{condition}</li>
        </ul>
      </div>
    </div>
  );
}

export default CurrentWeather;
