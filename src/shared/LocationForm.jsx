import { useRef, useState } from "react";
import styles from "./LocationForm.module.css";

/* Controlled form component for entering coordinates and a place name */
function LocationForm({
  title = "",
  latitude = "",
  longitude = "",
  submitLocation,
}) {
  const titleInput = useRef(document.querySelector("#title"));
  const latitudeInput = useRef(document.querySelector("#lat"));
  const longitudeInput = useRef(document.querySelector("#lon"));

  const [workingTitle, setWorkingTitle] = useState(title);
  const [workingLatitude, setWorkingLatitude] = useState(latitude);
  const [workingLongitude, setWorkingLongitude] = useState(longitude);

  /* Send form input to submitLocation function in parent component (empty title defaults to "New Location") */
  const handleSubmit = (event) => {
    event.preventDefault();
    const validatedTitle = workingTitle ? workingTitle : "New Location";
    submitLocation(
      validatedTitle,
      Number(workingLatitude),
      Number(workingLongitude)
    );
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="title">Name:</label>
      <input
        id="title"
        ref={titleInput}
        type="text"
        placeholder="Place Name"
        value={workingTitle}
        onChange={(event) => setWorkingTitle(event.target.value)}
      ></input>
      <label htmlFor="lat"> Lat:</label>
      <input
        id="lat"
        ref={latitudeInput}
        type="text"
        placeholder="Latitude"
        value={workingLatitude}
        onChange={(event) => setWorkingLatitude(event.target.value)}
      ></input>
      <label htmlFor="lon"> Lon:</label>
      <input
        id="lon"
        ref={longitudeInput}
        type="text"
        placeholder="Longitude"
        value={workingLongitude}
        onChange={(event) => setWorkingLongitude(event.target.value)}
      ></input>
      <button onSubmit={(event) => handleSubmit(event)}>Submit</button>
    </form>
  );
}

export default LocationForm;
