import { Link, NavLink, useNavigate } from "react-router";
import LocationForm from "../shared/LocationForm";
import styles from "./Navbar.module.css";

/*Handles page navigation and allows the user to set a custom location as the current location without saving it to Airtable*/
function Navbar({ currentLocation, updateCurrentLocation, addLocation }) {
  const navigate = useNavigate();

  const updateCoords = (title, latitude, longitude) => {
    const validatedTitle = title ? title : "New Location";
    updateCurrentLocation(validatedTitle, Number(latitude), Number(longitude));
    console.log("submit");
    navigate("/");
  };

  /*Saves the current location to persistent storage (Airtable) and adds it to the list*/
  const handleSaveCurrentLocation = (event) => {
    event.preventDefault();
    addLocation(
      currentLocation.title,
      currentLocation.latitude,
      currentLocation.longitude
    );
    console.log("save current location");
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/" className={styles.title}>
            DreamWeather
          </Link>
        </li>
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
      </ul>
      <ul>
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
