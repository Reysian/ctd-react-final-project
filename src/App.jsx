import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./features/Navbar";
import styles from "./App.module.css";
import AppContext from "./shared/AppContext";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;
function App() {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    title: "Null Island",
    latitude: 0,
    longitude: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /*On first render, fetch list of locations from persistent storage (Airtable)*/
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);

      const options = {
        method: "GET",
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const locationsData = await resp.json();
        const fetchedLocations = locationsData.records.map((record) => {
          const location = {
            id: record.id,
            ...record.fields,
          };
          return location;
        });
        setLocations([...fetchedLocations]);
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      } finally {
        console.log("fetch complete");
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  /*Takes a latitude and longitude, then returns true if the coordinates are valid*/
  const verifyValidCoords = (latitude, longitude) => {
    if (
      latitude <= 90 &&
      latitude >= -90 &&
      longitude <= 180 &&
      longitude >= -180
    ) {
      setErrorMessage("");
      return true;
    } else if (
      (latitude > 90 || latitude < -90) &&
      (longitude > 180 || longitude < -180)
    ) {
      setErrorMessage("Latitude and longitude are out of range.");
      return false;
    } else if (latitude > 90 || latitude < -90) {
      setErrorMessage("Latitude is out of range.");
      return false;
    } else if (longitude > 180 || longitude < -180) {
      setErrorMessage("Longitude is out of range.");
      return false;
    }
  };

  /*Add a new location to the locations list and save the list to persistent storage (Airtable)*/
  const addLocation = async (title, latitude, longitude) => {
    const valid = verifyValidCoords(latitude, longitude);
    if (!valid) {
      return;
    }

    const newLocation = { id: Date.now(), title, latitude, longitude };
    const payload = {
      records: [
        {
          fields: {
            title: newLocation.title,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
          },
        },
      ],
    };

    console.log(payload);

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();

      const savedLocation = {
        id: records[0].id,
        title: records[0].fields.title,
        latitude: records[0].fields.latitude,
        longitude: records[0].fields.longitude,
      };

      setLocations([...locations, savedLocation]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }

    return 0;
  };

  /*Update a location inside the locations list and save the new list to persistent storage (Airtable)*/
  const updateLocation = async (editedLocation) => {
    const valid = verifyValidCoords(
      editedLocation.latitude,
      editedLocation.longitude
    );
    if (!valid) {
      return;
    }

    const originalLocation = locations.find(
      (location) => location.id === editedLocation.id
    );

    const updatedLocations = locations.map((location) =>
      location.id === editedLocation.id ? { ...editedLocation } : location
    );

    setLocations(updatedLocations);

    const payload = {
      records: [
        {
          id: editedLocation.id,
          fields: {
            title: editedLocation.title,
            latitude: editedLocation.latitude,
            longitude: editedLocation.longitude,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Edit failed...`);
      const revertedLocations = locations.map((location) =>
        location.id === originalLocation.id ? { ...originalLocation } : location
      );

      setLocations([...revertedLocations]);
    } finally {
      console.log("PATCH complete");
    }
  };

  /*Delete a location from the locations list and save the shortened list to persistent storage (Airtable)*/
  const deleteLocation = async (deletedLocation) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };

    try {
      const resp = await fetch(url + `/${deletedLocation.id}`, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const updatedLocations = locations.filter(
        (location) => location.id !== deletedLocation.id
      );
      setLocations(updatedLocations);
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Deletion failed...`);
    } finally {
      console.log("DELETE complete");
    }
  };

  /*Set new current location (validate first)*/
  const updateCurrentLocation = (title, latitude, longitude) => {
    const valid = verifyValidCoords(latitude, longitude);
    if (valid) {
      setErrorMessage("");
      console.log("Current Location Set");
      if (title) {
        setCurrentLocation({ title, latitude, longitude });
      } else {
        setCurrentLocation({ title: "New Location", latitude, longitude });
      }
    }
  };

  /*Translate a weather code from open-meteo into a written weather condition*/
  const translateCode = useCallback((weatherCode) => {
    let condition = "";

    switch (weatherCode) {
      case 0:
        condition = "Clear Sky";
        break;
      case 1:
        condition = "Mostly Clear Sky";
        break;
      case 2:
        condition = "Partly Cloudy";
        break;
      case 3:
        condition = "Overcast";
        break;
      case 45:
        condition = "Foggy";
        break;
      case 48:
        condition = "Foggy with Rime Fog";
        break;
      case 51:
        condition = "Light Drizzle";
        break;
      case 53:
        condition = "Moderate Drizzle";
        break;
      case 55:
        condition = "Dense Drizzle";
        break;
      case 56:
        condition = "Light Freezing Drizzle";
        break;
      case 57:
        condition = "Dense Freezing Drizzle";
        break;
      case 61:
        condition = "Light Rain";
        break;
      case 63:
        condition = "Moderate Rain";
        break;
      case 65:
        condition = "Heavy Rain";
        break;
      case 66:
        condition = "Light Freezing Rain";
        break;
      case 67:
        condition = "Heavy Freezing Rain";
        break;
      case 71:
        condition = "Light Snow";
        break;
      case 73:
        condition = "Moderate Snow";
        break;
      case 75:
        condition = "Heavy Snow";
        break;
      case 77:
        condition = "Snow Grains";
        break;
      case 80:
        condition = "Light Rain Showers";
        break;
      case 81:
        condition = "Moderate Rain Showers";
        break;
      case 82:
        condition = "Violent Rain Showers";
        break;
      case 85:
        condition = "Light Snow Showers";
        break;
      case 86:
        condition = "Heavy Snow Showers";
        break;
      case 95:
        condition = "Thunderstorm";
        break;
      case 96:
        condition = "Thunderstorm with Light Hail";
        break;
      case 99:
        condition = "Thunderstorm with Heavy Hail";
        break;
      default:
        return weatherCode;
    }
    return condition;
  }, []);

  return (
    <>
      <Navbar
        currentLocation={currentLocation}
        updateCurrentLocation={updateCurrentLocation}
        addLocation={addLocation}
      />
      <div className={styles.appBody}>
        <Routes>
          <Route
            path="/"
            element={
              <AppContext.Provider
                value={{
                  locations,
                  addLocation,
                  updateLocation,
                  deleteLocation,
                  translateCode,
                  updateCurrentLocation,
                  errorMessage,
                  setErrorMessage,
                }}
              >
                <HomePage
                  currentLocation={currentLocation}
                  translateCode={translateCode}
                  errorMessage={errorMessage}
                />
              </AppContext.Provider>
            }
          />
          <Route
            path="/locations"
            element={
              <AppContext.Provider
                value={{
                  locations,
                  addLocation,
                  updateLocation,
                  deleteLocation,
                  translateCode,
                  updateCurrentLocation,
                  errorMessage,
                  setErrorMessage,
                }}
              >
                <LocationsPage
                  locations={locations}
                  setLocations={setLocations}
                  isLoading={isLoading}
                  addLocation={addLocation}
                  updateLocation={updateLocation}
                  deleteLocation={deleteLocation}
                  errorMessage={errorMessage}
                />
              </AppContext.Provider>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
