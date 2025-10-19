import LocationList from "../features/LocationList/LocationList";
import LocationForm from "../shared/LocationForm";
import EditWindow from "../shared/EditWindow";
import { useState } from "react";

function LocationsPage({ locations, setLocations, isLoading, updateLocation, addLocation, deleteLocation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedLocation, setEditedLocation] = useState({});


  const openEditWindow = (location) => {
    if (!isEditing && !isAdding) {
      setEditedLocation({ ...location });
      setIsEditing(true);
    }
  };

  const openAddWindow = () => {
    if (!isAdding && !isEditing) {
      setIsAdding(true);
    }
  }

  const submitEditedLocation = (title, latitude, longitude) => {
    const updated = {...editedLocation, title, latitude, longitude};
    setEditedLocation();;
    updateLocation(updated);
    setIsEditing(false);
  };

  const submitAddedLocation = (title, latitude, longitude) => {
    addLocation(title, latitude, longitude);
    setIsAdding(false);
  }

  const cancelEdit = () => {
    if (isAdding) {
      setIsAdding(false);
    }
    if (isEditing) {
      setIsEditing(false);
    }
  }

  return (
    <>
      <h1>Saved Locations</h1>
      <p>Locations List</p>
      {isAdding && (
        <EditWindow
          header='Add Location'
          submitLocation={submitAddedLocation}
          cancelEdit={cancelEdit}
        />
      )}
      {isEditing && (
        <EditWindow
          header='Edit Location'
          title={editedLocation.title}
          latitude={editedLocation.latitude}
          longitude={editedLocation.longitude}
          submitLocation={submitEditedLocation}
          cancelEdit={cancelEdit}
        />
      )}
      {isLoading ? (
        "Loading Locations..."
      ) : (
        <LocationList
          locations={locations}
          setLocations={setLocations}
          addLocation={openAddWindow}
          editLocation={openEditWindow}
          deleteLocation={deleteLocation}
        />
      )}
    </>
  );
}

export default LocationsPage;
