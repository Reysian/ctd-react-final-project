import LocationListItem from "./LocationListItem";
import { useState, useEffect } from "react";

function LocationList({ locations, setLocations }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Place Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Current Temperature</th>
          <th>Current Weather Condition</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <LocationListItem key={location.id} location={location} />
        ))}
      </tbody>
    </table>
  );
}

export default LocationList;
