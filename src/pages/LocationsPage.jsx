function LocationsPage({ locations, setLocations }) {
  return (
    <>
      <h1>Saved Locations</h1>
      <p>Locations List</p>
      <ul>
        {locations.map(location => <li key={location.id}>{location.latitude}, {location.longitude}</li>)}
      </ul>
    </>
  );
}

export default LocationsPage;
