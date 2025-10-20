import styles from "./CurrentWeather.module.css";

function CurrentWeather({ currentLocation, temperature, precipitation, humidity, wind, condition }) {

    return(
        <div className={styles.currentWeather}>
            <div>
                <h3>{currentLocation.title}: {currentLocation.latitude}, {currentLocation.longitude}</h3>
                <h1>{temperature}°F</h1>
            </div>
            <div>
                <ul>
                    <li>Precipitation: {precipitation} in</li>
                    <li>Humidity: {humidity}%</li>
                    <li>Wind: {wind} mph</li>
                    <li>{condition}</li>
                </ul>
            </div>
        </div>
    );
}

export default CurrentWeather;