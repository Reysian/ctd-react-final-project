import LocationList from "../features/LocationList";

function LocationsPage({ locations, setLocations, isLoading }) {
  return (
    <>
      <h1>Saved Locations</h1>
      <p>Locations List</p>
      {isLoading ? (
        "Loading Locations..."
      ) : (
        <LocationList locations={locations} setLocations={setLocations} />
      )}
    </>
  );
}

export default LocationsPage;
