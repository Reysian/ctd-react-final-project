import { useRef, useState } from "react";

function LocationForm({title = "", latitude = "", longitude = "", submitLocation}) {
  const titleInput = useRef(document.querySelector("#title"));
  const latitudeInput = useRef(document.querySelector("#lat"));
  const longitudeInput = useRef(document.querySelector("#lon"));

  const [workingTitle, setWorkingTitle] = useState(title);
  const [workingLatitude, setWorkingLatitude] = useState(latitude);
  const [workingLongitude, setWorkingLongitude] = useState(longitude);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitLocation(workingTitle, workingLatitude, workingLongitude);
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        id="title"
        ref={titleInput}
        type="text"
        placeholder="Place Name"
        value={workingTitle}
        onChange={(event) => setWorkingTitle(event.target.value)}
      ></input>
      <input
        id="lat"
        ref={latitudeInput}
        type="text"
        placeholder="Latitude"
        value={workingLatitude}
        onChange={(event) => setWorkingLatitude(event.target.value)}
      ></input>
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
