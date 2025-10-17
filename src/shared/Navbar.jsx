import { Link } from "react-router";
import { useRef, useState } from "react";
import styles from "./Navbar.module.css";

function Navbar({ currentLocation, updateCurrentLocation }) {
  const latitudeInput = useRef(document.querySelector("#lat"));
  const longitudeInput = useRef(document.querySelector("#lon"));

  const [workingLatitude, setWorkingLatitude] = useState(0);
  const [workingLongitude, setWorkingLongitude] = useState(0);

  const handleUpdateCoords = (event) => {
    event.preventDefault();
    updateCurrentLocation("New Location", Number(workingLatitude), Number(workingLongitude));
    console.log("submit");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.title}>
        DreamWeather
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/locations">Locations</Link>
        </li>
        <li>
          <form onSubmit={(event) => handleUpdateCoords(event)}>
            <input
              id="lat"
              ref={latitudeInput}
              type="text"
              placeholder="Latitude"
              value={workingLatitude}
              onChange={(event) => setWorkingLatitude(event.target.value)}
            ></input>
            <input
              id="lon"
              ref={longitudeInput}
              type="text"
              placeholder="Longitude"
              value={workingLongitude}
              onChange={(event) => setWorkingLongitude(event.target.value)}
            ></input>
            <button onSubmit={(event) => (handleUpdateCoords(event))}>Submit Coords</button>
          </form>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
