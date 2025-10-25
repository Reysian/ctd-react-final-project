import styles from "./ErrorWindow.module.css";
import { useContext } from "react";
import AppContext from "../shared/AppContext";

function ErrorWindow({ children }) {
  const { setErrorMessage } = useContext(AppContext);

  /* Closes error window by clearing the error message */
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
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
}

export default ErrorWindow;
