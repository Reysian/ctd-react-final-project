import LocationForm from "./LocationForm";
import styles from "./EditWindow.module.css";

/* Adds/Edits locations in LocationsPage using a LocationForm */
function EditWindow({
  header,
  title,
  latitude,
  longitude,
  submitLocation,
  cancelEdit,
}) {
  const handleCancel = (event) => {
    event.preventDefault();
    cancelEdit();
  };
  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <h4>{header}</h4>
        <button onClick={(event) => handleCancel(event)}>X</button>
      </div>
      <div className={styles.formContainer}>
        <LocationForm
          title={title}
          latitude={latitude}
          longitude={longitude}
          submitLocation={submitLocation}
        />
      </div>
    </div>
  );
}

export default EditWindow;
