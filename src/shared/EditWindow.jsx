import LocationForm from "./LocationForm";
import styles from "./EditWindow.module.css";

/* Adds/Edits locations in LocationsPage using a LocationForm */
function EditWindow({
  title,
  latitude,
  longitude,
  submitLocation,
  cancelEdit,
  children,
}) {
  const handleCancel = (event) => {
    event.preventDefault();
    cancelEdit();
  };
  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <h4>{children}</h4>
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
