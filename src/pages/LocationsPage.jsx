import LocationList from "../features/LocationList/LocationList";
import LocationForm from "../shared/LocationForm";
import { useState } from "react";

function LocationsPage({ locations, setLocations, isLoading, updateLocation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState({});

  const handleOpenEditor = (location) => {
    if (!isEditing) {
      setEditedLocation({ ...location });
      setIsEditing(true);
    }
  };

  const handleSubmitEditedLocation = (newTitle, newLatitude, newLongitude) => {
    const updated = {...editedLocation, title: newTitle, latitude: Number(newLatitude), longitude: Number(newLongitude)};
    setEditedLocation();;
    updateLocation(updated);
    setIsEditing(false);
  };

  return (
    <>
      <h1>Saved Locations</h1>
      <p>Locations List</p>
      {isEditing && (
        <LocationForm
          title={editedLocation.title}
          latitude={editedLocation.latitude}
          longitude={editedLocation.longitude}
          submitLocation={handleSubmitEditedLocation}
        />
      )}
      {isLoading ? (
        "Loading Locations..."
      ) : (
        <LocationList
          locations={locations}
          setLocations={setLocations}
          editLocation={handleOpenEditor}
        />
      )}
    </>
  );
}

export default LocationsPage;
