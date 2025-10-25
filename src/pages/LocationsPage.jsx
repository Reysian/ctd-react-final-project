import LocationList from "../features/LocationList/LocationList";
import EditWindow from "../shared/EditWindow";
import ErrorWindow from "../shared/ErrorWindow";
import { useState } from "react";

/* Page that displays a list of saved locations with current weather information */
function LocationsPage({
  locations,
  isLoading,
  updateLocation,
  addLocation,
  deleteLocation,
  errorMessage,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedLocation, setEditedLocation] = useState({});

  /* Opens edit window when editing a location */
  const openEditWindow = (location) => {
    if (!isEditing && !isAdding) {
      setEditedLocation({ ...location });
      setIsEditing(true);
    }
  };

  /* Opens add window when adding a location */
  const openAddWindow = () => {
    if (!isAdding && !isEditing) {
      setIsAdding(true);
    }
  };

  /*Updates edited location and saves it to persistent storage (Airtable)*/
  const submitEditedLocation = (title, latitude, longitude) => {
    const updated = { ...editedLocation, title, latitude, longitude };
    setEditedLocation();
    updateLocation(updated);
    setIsEditing(false);
  };

  /*Saves added location to persistent storage (Airtable)*/
  const submitAddedLocation = (title, latitude, longitude) => {
    addLocation(title, latitude, longitude);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    if (isAdding) {
      setIsAdding(false);
    }
    if (isEditing) {
      setIsEditing(false);
    }
  };

  return (
    <>
      <h1>Saved Locations</h1>
      {errorMessage && <ErrorWindow>{errorMessage}</ErrorWindow>}
      {isAdding && (
        <EditWindow
          submitLocation={submitAddedLocation}
          cancelEdit={cancelEdit}
        >
          Add Location
        </EditWindow>
      )}
      {isEditing && (
        <EditWindow
          title={editedLocation.title}
          latitude={editedLocation.latitude}
          longitude={editedLocation.longitude}
          submitLocation={submitEditedLocation}
          cancelEdit={cancelEdit}
        >
          Edit Location
        </EditWindow>
      )}
      {isLoading ? (
        "Loading Locations..."
      ) : (
        <LocationList
          locations={locations}
          addLocation={openAddWindow}
          editLocation={openEditWindow}
          deleteLocation={deleteLocation}
        />
      )}
    </>
  );
}

export default LocationsPage;
