import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./features/Navbar";
import styles from "./App.module.css";
import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

export const AppContext = createContext(null);

function App() {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    title: "Null Island",
    latitude: 0,
    longitude: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        console.log(locationsData);
        const fetchedLocations = locationsData.records.map((record) => {
          const location = {
            id: record.id,
            ...record.fields,
          };
          console.log(location);
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

  const verifyValidCoords = (latitude, longitude) => {
    if (
      latitude <= 90 &&
      latitude >= -90 &&
      longitude <= 180 &&
      longitude >= -180
    ) {
      setErrorMessage("");
      return 0;
    } else if (latitude > 90 || latitude < -90) {
      setErrorMessage("Latitude is out of range.");
      return 1;
    } else if (longitude > 180 || longitude < -180) {
      setErrorMessage("Longitude is out of range.");
      return 2;
    }
  };

  const addLocation = async (title, latitude, longitude) => {
    const invalid = verifyValidCoords(latitude, longitude);
    if (invalid) {
      return(invalid);
    }

    const newLocation = { id: Date.now(), title, latitude, longitude };
    const payload = {
      records: [
        {
          fields: {
            title: newLocation.title,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
          }
        }
      ]
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

  const updateLocation = async (editedLocation) => {
    console.log(editedLocation);
    const originalLocation = locations.find((location) => location.id === editedLocation.id);

    const updatedLocations = locations.map((location) => 
      location.id === editedLocation.id ? {...editedLocation} : location
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
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
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
        location.id === originalLocation.id ? {...originalLocation} : location
      );
      
      setLocations([...revertedLocations]);
    } finally {
      console.log("PATCH complete");
    }
  };

  const handleUpdateCurrentLocation = (title, latitude, longitude) => {
    if (
      latitude <= 90 &&
      latitude >= -90 &&
      longitude <= 180 &&
      longitude >= -180
    ) {
      setErrorMessage("");
      if (title) {
        setCurrentLocation({ title, latitude, longitude });
      } else {
        setCurrentLocation({ title: "New Location", latitude, longitude });
      }
    } else if (longitude > 180 || longitude < -180) {
      setErrorMessage("Longitude is out of range.");
    } else if (latitude > 90 || latitude < -90) {
      setErrorMessage("Latitude is out of range.");
    }
  };

  const translateCode = (weatherCode) => {
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
  };

  return (
    <>
      <Navbar
        currentLocation={currentLocation}
        updateCurrentLocation={handleUpdateCurrentLocation}
        addLocation={addLocation}
      />
      <div className={styles.appBody}>
        {errorMessage && <p>{errorMessage}</p>}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                currentLocation={currentLocation}
                translateCode={translateCode}
              />
            }
          />
          <Route
            path="/locations"
            element={
              <AppContext.Provider value={{translateCode, handleUpdateCurrentLocation}}>
                <LocationsPage
                  locations={locations}
                  setLocations={setLocations}
                  isLoading={isLoading}
                  updateLocation={updateLocation}
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
