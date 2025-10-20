import LocationListItem from "./LocationListItem";
import styles from "./LocationList.module.css";
import { useState, useEffect } from "react";

function LocationList({ locations, editLocation, addLocation, deleteLocation }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Place Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Current Temperature</th>
          <th>Current Weather Condition</th>
          <th className={styles.clickable} onClick={() => addLocation()}>Add</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <LocationListItem key={location.id} location={location} editLocation={editLocation} deleteLocation={deleteLocation}/>
        ))}
      </tbody>
    </table>
  );
}

export default LocationList;
