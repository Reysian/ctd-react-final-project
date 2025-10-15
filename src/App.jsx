import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./shared/Navbar";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const initialLocations = [
      { id: 1, latitude: 52.52, longitude: 13.41 },
      { id: 2, latitude: 51.51, longitude: -0.13 },
      { id: 3, latitude: 40.71, longitude: -74.01 },
      { id: 4, latitude: 32.78, longitude: -96.8 },
    ];

    setLocations(initialLocations);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.appBody}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/locations"
            element={
              <LocationsPage
                locations={locations}
                setLocations={setLocations}
              />
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
