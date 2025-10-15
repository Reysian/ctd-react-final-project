import { Link } from "react-router";
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.title}>DreamWeather</Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/locations">Locations</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
