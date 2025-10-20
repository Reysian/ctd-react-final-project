import styles from "./ErrorWindow.module.css";
import { useContext } from "react";
import { AppContext } from "../App";

function ErrorWindow({ errorMessage }) {
  const { setErrorMessage } = useContext(AppContext);

  const handleCloseWindow = (event) => {
    event.preventDefault();
    setErrorMessage("");
  };

  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <h4>Error</h4>
        <button onClick={(event) => handleCloseWindow(event)}>X</button>
      </div>
      <div className={styles.formContainer}>{errorMessage}</div>
    </div>
  );
}

export default ErrorWindow;
