import LocationListItem from "./LocationListItem";
import { useState, useEffect } from "react";

function LocationList({ locations, setLocations }) {
    
  return (
    <ul>
      {locations.map((location) => (
        <LocationListItem key={location.id} location={location} />
      ))}
    </ul>
  );
}

export default LocationList;
