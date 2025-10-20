import { useContext } from "react";
import { AppContext } from "../App";
import styles from "./WeeklyForecast.module.css";

function WeeklyForecast({ dates, dailyHighs, dailyLows, dailyWeatherCodes }) {
  const { translateCode } = useContext(AppContext);
  return (
    <table className={styles.forecast}>
      <thead>
        <tr>
          {dates.map((date) => (
            <th key={date}>{date}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {dates.map((date, i) => (
            <td key={date}>
              <p>High: {dailyHighs[i]}°F</p>
              <p>Low: {dailyLows[i]}°F</p>
              <p>{translateCode(dailyWeatherCodes[i])}</p>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default WeeklyForecast;
