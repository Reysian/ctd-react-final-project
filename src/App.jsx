import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./shared/Navbar";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
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
                isLoading={isLoading}
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
