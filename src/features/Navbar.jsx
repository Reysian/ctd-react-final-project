import { Link, NavLink, useNavigate } from "react-router";
import { useRef, useState } from "react";
import LocationForm from "../shared/LocationForm";
import styles from "./Navbar.module.css";

function Navbar({ currentLocation, updateCurrentLocation, addLocation }) {
  const navigate = useNavigate();

  const updateCoords = (title, latitude, longitude) => {
    const validatedTitle = title ? title : "New Location";
    updateCurrentLocation(validatedTitle, Number(latitude), Number(longitude));
    console.log("submit");
    navigate("/");
  };

  const handleSaveCurrentLocation = (event) => {
    event.preventDefault();
    addLocation(
      currentLocation.title,
      currentLocation.latitude,
      currentLocation.longitude
    );
    console.log("save current location");
    console.log(currentLocation.latitude, currentLocation.longitude);
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.title}>
        DreamWeather
      </Link>
      <ul>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/locations"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Locations
          </NavLink>
        </li>
        <li>
          <LocationForm submitLocation={updateCoords} />
        </li>
        <li>
          <button onClick={(event) => handleSaveCurrentLocation(event)}>
            Save Current Location
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
