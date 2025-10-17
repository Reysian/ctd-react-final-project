import { Link } from "react-router";
import { useRef, useState } from "react";
import styles from "./Navbar.module.css";

function Navbar({ currentLocation, updateCurrentLocation, addLocation }) {
  const titleInput = useRef(document.querySelector("#title"))
  const latitudeInput = useRef(document.querySelector("#lat"));
  const longitudeInput = useRef(document.querySelector("#lon"));

  const [workingTitle, setWorkingTitle] = useState("");
  const [workingLatitude, setWorkingLatitude] = useState(0);
  const [workingLongitude, setWorkingLongitude] = useState(0);

  const handleUpdateCoords = (event) => {
    event.preventDefault();
    const title = workingTitle ? workingTitle : "New Location";
    updateCurrentLocation(title, Number(workingLatitude), Number(workingLongitude));
    console.log("submit");
  };

  const handleSaveCurrentLocation = (event) => {
    event.preventDefault();
    addLocation(currentLocation.title, currentLocation.latitude, currentLocation.longitude);
    console.log("save current location");
  }

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
              id="title"
              ref={titleInput}
              type="text"
              placeholder="Place Name"
              value={workingTitle}
              onChange={(event) => setWorkingTitle(event.target.value)}
            ></input>
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
        <li>
          <button onClick={(event) => (handleSaveCurrentLocation(event))}>Save Current Location</button> 
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
